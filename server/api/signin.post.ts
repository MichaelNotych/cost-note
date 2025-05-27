import bcrypt from "bcrypt";
import { User } from "../models/user.model";

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
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw createError({
			status: 401,
			message: "Invalid email or password",
		});
	}

	// create session
	const session = await setUserSession(event, {
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
	});

	console.log(session);

	return { success: true };
});
