import express from "express";
export const router = express.Router();
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { validationResult } from "express-validator";
const prisma = new PrismaClient();

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - user_id
 *       properties:
 *          post_id:
 *            type: number
 *          title:
 *            type: string
 *          content:
 *            type: string
 *          user_id:
 *            type: number
 *          created_at:
 *            type: string
 *          upvotes:
 *            type: number
 *          downvotes:
 *            type: number
 *       example:
 *         post_id: 1
 *         title: My First Post
 *         content: This is the content of my first post.
 *         user_id: 1
 *         created_at: 2024-04-10T12:00:00Z
 *         upvotes: 0
 *         downvotes: 0
 */

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true
      }
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to get
 *     responses:
 *       200:
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        post_id: Number(req.params.id)
      }
    });
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
    // Use validationResult middleware here to check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          user_id: req.body.user_id // Assuming user_id is provided in the request body
        }
      });
      res.json(newPost);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });
  

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.put("/:id", async (req: Request, res: Response) => {
  if (validationResult(req)) {
    try {
      const updatedPost = await prisma.post.update({
        where: {
          post_id: Number(req.params.id)
        },
        data: req.body
      });
      res.json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(404).send("Post not found");
    }
  } else {
    res.status(400).send("Invalid request body");
  }
});

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Post]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to delete
 *     responses:
 *       200:
 *         description: The deleted post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        post_id: Number(req.params.id)
      }
    });
    res.send(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(404).send("Post not found");
  }
});

module.exports = { router };