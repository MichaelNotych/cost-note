import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
	// get data from body
	const { email, password } = await readBody(event);

	// try to find user in database
	const user = await User.findOne({ email });

	// if no user found, throw error
	if (!user) {
		throw createError({
			status: 401,
			message: "Invalid email or password",
		});
	}

	// compare password
	const isPasswordValid = await verifyPassword(user.password, password);

	if (!isPasswordValid) {
		throw createError({
			status: 401,
			message: "Invalid email or password",
		});
	}

	// create session
	const session = await setUserSession(event, {
		user: {
			id: user._id.toString(),
			email: user.email,
		},
	});

	console.log(session);

	return { success: true };
});
