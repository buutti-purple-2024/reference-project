import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";

export const router = express.Router();
const prisma = new PrismaClient();

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         topic_id:
 *           type: number
 *         name:
 *           type: string
 *         created_at:
 *           type: string
 *       example:
 *         topic_id: 1
 *         name: General Discussion
 *         created_at: 2024-04-10T12:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Topic
 *   description: API endpoints for managing topics
 */

/**
 * @swagger
 * /topics:
 *   get:
 *     summary: Get all topics
 *     tags: [Topic]
 *     responses:
 *       200:
 *         description: A list of topics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
router.get("/", async (req: Request, res: Response) => {
	try {
		const topics = await prisma.topic.findMany();
		res.send(topics);
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

/**
 * @swagger
 * /topics/{id}:
 *   get:
 *     summary: Get a topic by ID
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the topic to get
 *     responses:
 *       200:
 *         description: A single topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 */
router.get("/:id", async (req: Request, res: Response) => {
	try {
		const topic = await prisma.topic.findUnique({
			where: { topic_id: Number(req.params.id) },
		});
		if (topic) {
			res.send(topic);
		} else {
			res.status(404).send("Topic not found");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

/**
 * @swagger
 * /topics:
 *   post:
 *     summary: Create a new topic
 *     tags: [Topic]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       200:
 *         description: The created topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newTopic = await prisma.topic.create({
			data: {
				name: req.body.name,
			},
		});
		res.json(newTopic);
	} catch (error) {
		console.log(error);
		res.status(500).send("Internal server error");
	}
});

/**
 * @swagger
 * /topics/{id}:
 *   put:
 *     summary: Update a topic by ID
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the topic to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Topic'
 *     responses:
 *       200:
 *         description: The updated topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 */
router.put("/:id", async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const updatedTopic = await prisma.topic.update({
			where: { topic_id: Number(req.params.id) },
			data: { name: req.body.name },
		});
		res.json(updatedTopic);
	} catch (error) {
		console.log(error);
		res.status(404).send("Topic not found");
	}
});

/**
 * @swagger
 * /topics/{id}:
 *   delete:
 *     summary: Delete a topic by ID
 *     tags: [Topic]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the topic to delete
 *     responses:
 *       200:
 *         description: The deleted topic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const deletedTopic = await prisma.topic.delete({
			where: { topic_id: Number(req.params.id) },
		});
		res.send(deletedTopic);
	} catch (error) {
		console.log(error);
		res.status(404).send("Topic not found");
	}
});

export { router as topicsRouter };
