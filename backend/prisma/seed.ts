import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	try {
		// Hashed passwords
		const hashedPasswordAlice = await bcrypt.hash("alicePassword", 10);
		const hashedPasswordBob = await bcrypt.hash("bobPassword", 10);

		// Seed users
		const user1 = await prisma.user.upsert({
			where: { username: "alice" },
			update: {},
			create: {
				username: "alice",
				password: hashedPasswordAlice,
				role: "user",
				// Other user fields...
			},
		});

		const user2 = await prisma.user.upsert({
			where: { username: "bob" },
			update: {},
			create: {
				username: "bob",
				password: hashedPasswordBob,
				role: "user",
				// Other user fields...
			},
		});

		console.log("Users created:", user1, user2);

		// Seed posts
		const post1 = await prisma.post.create({
			data: {
				user: { connect: { id: user1.id } },
				title: "First Post",
				content: "This is the content of the first post.",
				// Other post fields...
			},
		});

		const post2 = await prisma.post.create({
			data: {
				user: { connect: { id: user2.id } },
				title: "Second Post",
				content: "This is the content of the second post.",
				// Other post fields...
			},
		});

		console.log("Posts created:", post1, post2);

		// Seed comments
		const comment1 = await prisma.comment.create({
			data: {
				user: { connect: { id: user1.id } },
				post: { connect: { post_id: post1.post_id } },
				content: "Comment on the first post by Alice.",
				// Other comment fields...
			},
		});

		const comment2 = await prisma.comment.create({
			data: {
				user: { connect: { id: user2.id } },
				post: { connect: { post_id: post2.post_id } },
				content: "Comment on the second post by Bob.",
				// Other comment fields...
			},
		});

		console.log("Comments created:", comment1, comment2);

		// Seed follows
		const follow = await prisma.follow.create({
			data: {
				follower: { connect: { id: user1.id } },
				followedUser: { connect: { id: user2.id } },
				// Other follow fields...
			},
		});

		console.log("Follow created:", follow);
	} catch (error) {
		console.error("Error seeding database:", error);
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error("Unhandled error during seeding:", error);
	process.exit(1);
});
