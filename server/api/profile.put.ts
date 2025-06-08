import { User } from "../models/user.model";

export default defineEventHandler(async (event) => {
	const { user } = await requireUserSession(event);
	const { name, email } = await readBody(event);

	const userObject = await User.findById(user.id);

	if (!userObject) {
		throw createError({
			status: 404,
			message: "User not found",
		});
	}

	if (name) {
		userObject.name = name;
	}

	if (email) {
		userObject.email = email;
	}

	await userObject.save();
	await setUserSession(event, {
		user: {
			id: userObject._id,
			name: userObject.name,
			email: userObject.email,
		},
	});

	return {
		name: userObject.name,
		email: userObject.email,
	};
});