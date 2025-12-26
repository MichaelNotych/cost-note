import { User } from "../../models/User";

export default defineEventHandler(async (event) => {
   // get data from body
	const { email, password } = await readBody(event);

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
	const newUser = await User.create({ email, password: hashedPassword });

	// create session
	const session = await setUserSession(event, {
		user: {
			id: newUser._id.toString(),
			email: newUser.email,
		},
	});

	console.log(session);

	return { success: true };
})
