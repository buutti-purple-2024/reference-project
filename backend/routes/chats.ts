import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - user1_id
 *         - user2_id
 *       properties:
 *         chat_id:
 *           type: number
 *         user1_id:
 *           type: number
 *         user2_id:
 *           type: number
 *         created_at:
 *           type: string
 *       example:
 *         chat_id: 1
 *         user1_id: 1
 *         user2_id: 2
 *         created_at: 2024-05-03T09:32:32.787Z
 */

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: API endpoints for managing chats
 */

/**
 * @swagger
 * /chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       201:
 *         description: The created chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
	try {
		const { user1_id, user2_id } = req.body;

		// Check if user1_id is equal to user2_id
		if (user1_id === user2_id) {
			return res.status(400).json({ error: "A user cannot start a chat with themselves" });
		}

		const existingChat = await prisma.chat.findFirst({
			where: {
				OR: [
					{ user1_id, user2_id },
					{ user1_id: user2_id, user2_id: user1_id },
				],
			},
		});

		if (existingChat) {
			return res.status(400).json({ error: "A chat between these users already exists" });
		}

		const newChat = await prisma.chat.create({
			data: {
				user1_id,
				user2_id,
			},
		});

		res.status(201).json(newChat);
	} catch (error) {
		console.error("Error creating chat:", error);
		res.status(500).json({ error: "Unable to create chat" });
	}
});



/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: A list of chats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 */
router.get("/", async (req, res) => {
	try {
		const chats = await prisma.chat.findMany();
		res.status(200).json(chats);
	} catch (error) {
		console.error("Error fetching chats:", error);
		res.status(500).json({ error: "Unable to fetch chats" });
	}
});

/**
 * @swagger
 * /chats/{chatId}:
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the chat to delete
 *     responses:
 *       200:
 *         description: The deleted chat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chat not found
 */
router.delete("/:chatId", async (req, res) => {
	try {
		const chatId = parseInt(req.params.chatId);
      
		// Delete associated messages first
		await prisma.message.deleteMany({
			where: {
				chat_id: chatId,
			},
		});

		// Then delete the chat
		const deletedChat = await prisma.chat.delete({
			where: {
				chat_id: chatId,
			},
		});
		res.status(200).json(deletedChat);
	} catch (error) {
		console.error("Error deleting chat:", error);
		res.status(404).json({ error: "Chat not found" });
	}
});
  

module.exports = { router };
