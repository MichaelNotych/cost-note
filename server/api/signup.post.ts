import { User } from "../models/user.model";

export default defineEventHandler(async (event) => {
	// get data from body
	const { name, email, password } = await readBody(event);

	// try to find user in database
	const user = await User.findOne({ email });

	// if user found, throw error
	if (user) {
		throw createError({
			status: 400,
			message: "Email already taken",
		});
	}

	// hash password
	const hashedPassword = await hashPassword(password);

	// create user
	const newUser = await User.create({ name, email, password: hashedPassword });

	// create session
	const session = await setUserSession(event, {
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		},
	});

	console.log(session);

	return { success: true };
});