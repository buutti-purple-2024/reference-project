import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - chat_id
 *         - sender_id
 *         - content
 *       properties:
 *         message_id:
 *           type: number
 *         chat_id:
 *           type: number
 *         sender_id:
 *           type: number
 *         content:
 *           type: string
 *         created_at:
 *           type: string
 *       example:
 *         message_id: 1
 *         chat_id: 1
 *         sender_id: 1
 *         content: Hello!
 *         created_at: 2024-05-03T09:32:32.787Z
 */

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: API endpoints for managing messages
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: The created message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const { chat_id, sender_id, content } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        chat_id,
        sender_id,
        content,
      },
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Unable to create message' });
  }
});

/**
 * @swagger
 * /messages/{chatId}:
 *   get:
 *     summary: Get messages by chat ID
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: chatId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the chat
 *     responses:
 *       200:
 *         description: A list of messages for the specified chat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: Internal server error
 */
router.get('/:chatId', async (req, res) => {
  try {
    const chatId = parseInt(req.params.chatId);
    const messages = await prisma.message.findMany({
      where: {
        chat_id: chatId,
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Unable to fetch messages' });
  }
});

module.exports = { router };
