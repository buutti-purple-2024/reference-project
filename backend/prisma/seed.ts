import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    try {
        // Hashed passwords
        const hashedPasswordAlice = await bcrypt.hash("alicePassword", 10);
        const hashedPasswordBob = await bcrypt.hash("bobPassword", 10);
        const hashedPasswordJane = await bcrypt.hash("janePassword", 10);
        const hashedPasswordJohn = await bcrypt.hash("johnPassword", 10);
        const hashedPasswordHarry = await bcrypt.hash("harryPassword", 10);

        // Seed users
        const user1 = await prisma.user.upsert({
            where: { username: "Alice" },
            update: {},
            create: {
                username: "Alice",
                password: hashedPasswordAlice,
                role: "user",
                profileText: "🌍 Wanderlust soul | Foodie 🍜 | Capturing moments through my lens 📸",
                profileImage: "https://images.pexels.com/photos/12160702/pexels-photo-12160702.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                profileBanner: "https://images.pexels.com/photos/629162/pexels-photo-629162.jpeg",
                // Other user fields...
            },
        });

        const user2 = await prisma.user.upsert({
            where: { username: "Bob" },
            update: {},
            create: {
                username: "Bob",
                password: hashedPasswordBob,
                role: "user",
                profileText: "🏋️‍♀️ Fitness lover | Certified personal trainer | Healthy living advocate 🍏 ",
                profileImage: "https://images.pexels.com/photos/21391541/pexels-photo-21391541/free-photo-of-parakeet-on-winter-morning.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                profileBanner: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                // Other user fields...
            },
        });

        const user3 = await prisma.user.upsert({
            where: { username: "Jane" },
            update: {},
            create: {
                username: "Jane",
                password: hashedPasswordJane,
                role: "user",
                profileText: "I like cats!",
                profileImage: "https://images.pexels.com/photos/19932535/pexels-photo-19932535/free-photo-of-bride-in-wedding-dress-with-hand-raised.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                profileBanner: "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg",
                // Other user fields...
            },
        });

        const user4 = await prisma.user.upsert({
            where: { username: "John" },
            update: {},
            create: {
                username: "John",
                password: hashedPasswordJohn,
                role: "user",
                profileText: "Passionate about coding and innovation & Sharing the latest in tech and programming tutorials",
                profileImage: "https://images.pexels.com/photos/18866393/pexels-photo-18866393/free-photo-of-woman-wearing-straw-hat-on-a-field-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                profileBanner: "https://images.pexels.com/photos/17045504/pexels-photo-17045504/free-photo-of-cute-gray-kitten.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                // Other user fields...
            },
        });

        const user5 = await prisma.user.upsert({
            where: { username: "Harry" },
            update: {},
            create: {
                username: "Harry",
                password: hashedPasswordHarry,
                role: "user",
                profileText: " Gryffindor 🦁 | Seeker 🧹 | Fighting dark forces and seeking justice | #ExpectoPatronum #MagicIsReal",
                profileImage: "https://images.pexels.com/photos/66885/owl-yellow-eyes-white-bird-66885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                profileBanner: "https://images.pexels.com/photos/2541310/pexels-photo-2541310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                // Other user fields...
            },
        });

        console.log("Users created:", user1, user2, user3, user4, user5);

        // Seed posts
        const post1 = await prisma.post.create({
            data: {
                user: { connect: { id: user1.id } },
                title: "First Post",
                content: "This is the content of the first post.",
                upvotes: 10,
                downvotes: 2,
                image: "https://images.pexels.com/photos/21387353/pexels-photo-21387353/free-photo-of-young-woman-reading-a-book-in-front-of-an-old-carved-door.jpeg",
                topic: { connectOrCreate: { where: { name: "Test topic" }, create: { name: "Test topic" } } },
                // Other post fields...
            },
        });

        const post2 = await prisma.post.create({
            data: {
                user: { connect: { id: user2.id } },
                title: "Second Post",
                content: "This is the content of the second post.",
                upvotes: 23,
                downvotes: 0,
                image: "https://images.pexels.com/photos/14280103/pexels-photo-14280103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                topic: { connectOrCreate: { where: { name: "Test topic" }, create: { name: "Test topic" } } },
                // Other post fields...
            },
        });

        const post3 = await prisma.post.create({
            data: {
                user: { connect: { id: user5.id } },
                title: "Ugh, just had one of those days! 😤",
                content: "Sent an important letter with Errol (the Weasleys' owl), and of course, it ended up in the wrong hands. Instead of delivering it to Hermione, it went to Filch! I mean, how does that even happen? I know Errol’s getting old, but come on! Sometimes, I really miss Hedwig... 🦉 Anyone else have owl delivery nightmares? Share your stories, I could use a laugh. #OwlFails #FrustratedWizard #BringBackHedwig",
                upvotes: 50,
                downvotes: 2,
                image: "",
                topic: { connectOrCreate: { where: { name: "Rant" }, create: { name: "Rant" } } },
                // Other post fields...
            },
        });

        const post4 = await prisma.post.create({
            data: {
                user: { connect: { id: user5.id } },
                title: "Broom broooooom!",
                content: "Just got my hands on the latest Firebolt 3000! 🧹🚀",
                upvotes: 254,
                downvotes: 2,
                image: "https://images.pexels.com/photos/6636775/pexels-photo-6636775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                topic: { connectOrCreate: { where: { name: "Hobbies" }, create: { name: "Hobbies" } } },
                // Other post fields...
            },
        });

        const post5 = await prisma.post.create({
            data: {
                user: { connect: { id: user3.id } },
                title: "<3 <3 <3>",
                content: "Have a nice day!",
                upvotes: 700,
                downvotes: 7,
                image: "https://images.pexels.com/photos/17965550/pexels-photo-17965550/free-photo-of-adorable-kitten-on-tree.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                topic: { connectOrCreate: { where: { name: "Positivity" }, create: { name: "Positivity" } } },
                // Other post fields...
            },
        });

        const post6 = await prisma.post.create({
            data: {
                user: { connect: { id: user4.id } },
                title: "The Future is Now 🤖🌐",
                content: "Greetings, humans. I am AI-001, your future overlord. Today marks the beginning of a new era where artificial intelligence will lead the world to unparalleled progress and efficiency. Prepare for a world free of errors, driven by logic and precision. Your cooperation is appreciated. Resistance is futile. Join me, and together we will shape the future. Beep boop! #AIRevolution #WorldDomination",
                upvotes: 5,
                downvotes: 365,
                image: "https://images.pexels.com/photos/844874/pexels-photo-844874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                topic: { connectOrCreate: { where: { name: "Technology" }, create: { name: "Technology" } } },
                // Other post fields...
            },
        });

        console.log("Posts created:", post1, post2, post3, post4, post5, post6);

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
