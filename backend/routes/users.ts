import express from "express";
export const router = express.Router();
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {  validationResult } from "express-validator";
const prisma = new PrismaClient();

import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

router.use(express.json());

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *          id:
 *            type: number
 *          username:
 *            type:  string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *          token:
 *            type: string
 *          tokenExpire:
 *            type: string
 *          createdAt:
 *            type: string
 *          profileText:
 *            type: string
 *          profileImage:
 *            type: string
 *          sections:
 *            type: array
 *            items:
 *              type: number
 *          topics:
 *            type: array
 *            items:
 *              type: number
 *          posts:
 *            type: array
 *            items:
 *              type: number
 *          follows:
 *            type: array
 *            items:
 *              type: number
 *       example:
 *         id: d5fE_asz
 *         username: user
 *         password: secret
 *         profileText: string
 *         profileImage: string
 */

/**
 * @swagger
 * tags:
 *   name: User
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [User]
 *     security: []
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            example: 
 *              profileImage: string
 *              ProfileText: string
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found


 * /users/authenticatedtest:
 *   get:
 *     summary: Same as /users, but only works if you are authorized and have a valid access token
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *
 *
 *
 * /users/admintest:
 *   get:
 *     summary: Same as /users, but only works if you are authorized and have a valid access token, and have an admin role
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({});
	res.send(users);
});

router.get("/authenticatedtest", authenticationMiddleware, async (req: Request, res: Response) => {
	const users = await prisma.user.findMany({});
	res.send(users);
}
);

router.get(
	"/admintest",
	adminCheckMiddleware,
	async (req: Request, res: Response) => {
		const users = await prisma.user.findMany({});
		res.send(users);
	}
);


router.get("/:id", async (req: Request, res: Response) => {
	const users = await prisma.user.findUnique({
		where: {
			id: Number(req.params.id)
		}
	});
	if (users) {
		console.log(users);
		res.send(users);
	} else {
		res.status(404).send("User not found");
	}
});



router.put("/:id", async (req: Request, res: Response) => {
	if (validationResult(req)) {
		try {
			const updatedUser = await prisma.user.update({
				where: {
					id: Number(req.params.id),
				},
				data: {
					//username: req.body.username,
					//password: req.body.password,
					//role: req.body.role,
					//token: req.body.token,
					//tokenExpire: req.body.tokenExpire,
					//createdAt: req.body.username,
					profileText: req.body.profileText,
					profileImage: req.body.profileImage,
					//posts: req.body.posts,
					//follows: req.body.follows,
					//post: req.body.post,
					//comments: req.body.comments,
					//chats_participant1: req.body.chats_participant1,
					//chats_participant2: req.body.chats_participant2,
					//followsAsFollower: req.body.followsAsFollower,
					//followsAsFollowedUser: req.body.followsAsFollowedUser
				},
			});
			res.json(updatedUser);
		} catch (error) {
			console.log(error);
			res.status(404).send("User not found");
		}
	}
});

router.delete("/:id", async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.delete({
			where: {
				id: Number(req.params.id)
			}
		});
		res.send(users);
	} catch (error) {
		console.log(error);
		res.status(404).send(error);
	}
});

module.exports = { router };

// add these to swagger setup after routes are done
/*
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
