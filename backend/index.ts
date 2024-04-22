import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cors from "cors";

import { router as usersRouter } from "./routes/users";
import { router as authenticationRouter } from "./routes/authentication";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const prisma = new PrismaClient();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Purple",
			version: "1.0.0",
			description: "",
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					in: "header",
					name: "Authorization",
					description: "Bearer token to access these api endpoints",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
		servers: [{ url: "http://localhost:3001" }],
	},
	apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/users", usersRouter);
app.use("/auth", authenticationRouter);

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

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
