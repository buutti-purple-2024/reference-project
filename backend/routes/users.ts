import express from "express";
export const router = express.Router();
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {authenticationMiddleware} from "../middleware/authenticationMiddleware";

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
 */

router.get("/",  async (req: Request, res: Response) => {
	const users = await prisma.users.findMany({});
	res.send(users);
});

router.get("/authenticatedtest",  authenticationMiddleware, async (req: Request, res: Response) => {
	const users = await prisma.users.findMany({});
	res.send(users);
});

module.exports = {router};

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
 *            $ref: '#/components/schemas/User'
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
*/