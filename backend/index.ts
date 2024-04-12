import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
const app = express();
app.use(express.json());

const PORT = 3001;
const prisma = new PrismaClient();



async function main() {
	// Variables for testing
	const username = "TestUser";
	const password = "password";
	const role = "user";
	const sections = 0;
	const topics = 0;
	const posts = 2;
	const follows = 6;

	// Check if a user with the given username already exists
	const existingUser = await prisma.users.findFirst({
		where: {
			username: username,
		},
	});

	if (existingUser) {
		console.log(`
    User with username '${username}' already exists.
    `);

		// Fetch all users and their data
		const allUsers = await fetchAllUsers();
		console.log("All users:", allUsers);

		// Exit the function or handle the scenario accordingly
		return;
	}

	// Create a new user only if no user with the given username exists
	await prisma.users.create({
		data: {
			username: username,
			password: password,
			role: role,
			sections: sections,
			topics: topics,
			posts: posts,
			follows: follows,
		},
	});

	console.log(`
  User with username '${username}' created successfully.
  `);

	// Fetch all users and their data
	const allUsers = await fetchAllUsers();
	console.log("All users:", allUsers);
}

// Function to fetch all users and their data
async function fetchAllUsers() {
	return await prisma.users.findMany();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

// ROUTES

app.get("/users", async (req, res) => {
	const users = await prisma.users.findMany({});
	res.send(users);
});

app.post("/register", async (req, res) => {
	/*
	if (req.body.username == null || req.body.password == null) {
		res.status(500).send();
	}
	*/
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const userExists = await prisma.users.findFirst({
			where: {
				username: req.body.username,
			},
		});

		if (userExists != null) {
			return res.status(400).send("This username already exists");
		}

		const prismaUser = await prisma.users.create({
			data: {
				username: req.body.username,
				password: hashedPassword,
				role: "user",
				profileText: "profile text",
				profileImage: "url to profile image",
			},
		});
		console.log(`Created a new user: ${req.body.username} `);
		res.status(200).send(prismaUser);
	} catch (error) {
		res.status(500).send();
	}
});

app.post("/login", async (req, res) => {
	// auth user
	const user = await prisma.users.findUnique({
		where: {
			username: req.body.username,
		},
	});
	if (user == null) {
		return res.status(400).send("Cannot find user");
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send("Login succesful");
		} else {
			res.send("Incorrect password");
		}
	} catch (error) {
		res.json(error);
	}
});

app.listen(PORT, () => {
	console.log(`server running on port ${8000}`);
});
