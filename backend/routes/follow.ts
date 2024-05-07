import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const router = express.Router();

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       required:
 *         - follower_id
 *         - followed_user_id
 *       properties:
 *         follow_id:
 *           type: number
 *         follower_id:
 *           type: number
 *         followed_user_id:
 *           type: number
 *         created_at:
 *           type: string
 *       example:
 *         follow_id: 1
 *         follower_id: 1
 *         followed_user_id: 2
 *         created_at: 2024-05-03T09:32:32.787Z
 */

/**
 * @swagger
 * tags:
 *   name: Follow
 *   description: API endpoints for managing follows
 */

/**
 * @swagger
 * /follows:
 *   post:
 *     summary: Create a new follow
 *     tags: [Follow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Follow'
 *     responses:
 *       201:
 *         description: The created follow
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req, res) => {
  try {
    const { follower_id, followed_user_id } = req.body;
    const newFollow = await prisma.follow.create({
      data: {
        follower_id,
        followed_user_id,
      },
    });
    res.status(201).json(newFollow);
  } catch (error) {
    console.error('Error creating follow:', error);
    res.status(500).json({ error: 'Unable to create follow' });
  }
});

/**
 * @swagger
 * /follows:
 *   get:
 *     summary: Get all follows
 *     tags: [Follow]
 *     responses:
 *       200:
 *         description: A list of follows
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
 */
router.get('/', async (req, res) => {
  try {
    const follows = await prisma.follow.findMany();
    res.status(200).json(follows);
  } catch (error) {
    console.error('Error fetching follows:', error);
    res.status(500).json({ error: 'Unable to fetch follows' });
  }
});

/**
 * @swagger
 * /follows/userFollows/{userId}:
 *   get:
 *     summary: Get follows by user ID (followers)
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: A list of follows for the specified user (followers)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Follow'
 *       500:
 *         description: Internal server error
 */
router.get('/userFollows/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userFollowers = await prisma.follow.findMany({
        where: {
          followed_user_id: userId,
        },
      });
      res.status(200).json(userFollowers);
    } catch (error) {
      console.error('Error fetching user followers:', error);
      res.status(500).json({ error: 'Unable to fetch user followers' });
    }
  });
  
  /**
   * @swagger
   * /follows/userFollowing/{userId}:
   *   get:
   *     summary: Get follows by user ID (following)
   *     tags: [Follow]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID of the user
   *     responses:
   *       200:
   *         description: A list of follows for the specified user (following)
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Follow'
   *       500:
   *         description: Internal server error
   */
  router.get('/userFollowing/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userFollowing = await prisma.follow.findMany({
        where: {
          follower_id: userId,
        },
      });
      res.status(200).json(userFollowing);
    } catch (error) {
      console.error('Error fetching user following:', error);
      res.status(500).json({ error: 'Unable to fetch user following' });
    }
  });

module.exports = { router };
