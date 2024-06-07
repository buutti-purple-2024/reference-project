import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       example:
 *         username: string
 *         password: string
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 * /auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 * /auth/token:
 *   post:
 *     summary: Get a new access token if your refresh token is valid.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               username: string
 *               token: string
 *             example: 
 *               username: username you used to log in
 *               token: insert your REFRESH token here (you can get it by logging in)
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       401:
 *         description: Some server error
 */



router.post("/register", async (req, res) => {
	/*
	if (req.body.username == null || req.body.password == null) {
		res.status(500).send();
	}
	*/
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const userExists = await prisma.user.findFirst({
			where: {
				username: req.body.username,
			},
		});

		if (userExists != null) {
			return res.status(400).send("This username already exists");
		}

		const prismaUser = await prisma.user.create({
			data: {
				username: req.body.username,
				password: hashedPassword,
				role: "user",
				profileText: "profile text",
				profileImage: "url to profile image",
			},
		});
		console.log(`Created a new user: ${req.body.username} `);
		res.status(200).send(prismaUser);
	} catch (error) {
		res.status(500).send();
	}
});

router.post("/login", async (req, res) => {
	const prismaUser = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});
	if (prismaUser == null) {
		return res.status(400).send("Cannot find user");
	}
	try {
		if (await bcrypt.compare(req.body.password, prismaUser.password)) {
			console.log("prismauser", prismaUser)
			const user = {name: req.body.username, id: prismaUser.id, role: prismaUser.role};
			if (process.env.ACCESS_TOKEN_SECRET) {
				//const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
				const accessToken = generateAccessToken(user);
				const refreshToken = await generateRefreshToken(user);
				res.cookie("accesstoken", accessToken, { maxAge: 24 * 60 * 60 * 1000,  httpOnly: false});
				res.cookie("refreshtoken", refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
				res.cookie("username", req.body.username, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
				res.cookie("username", prismaUser.role, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
				res.json({accessToken: accessToken, refreshToken: refreshToken});
			}
			else {
				console.log("Access token is not defined");
			}
		} else {
			res.send("Incorrect password");
		}
	} catch (error) {
		res.json(error);
	}
});

const generateAccessToken = (user : {name : string, id: number, role: string} ) => {
	if(process.env.ACCESS_TOKEN_SECRET) return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
};

const generateRefreshToken = async (user : {name: string, id: number, role: string}) => {
	if (!process.env.REFRESH_TOKEN_SECRET) {console.log("missing REFRESH_TOKEN_SECRET"); return;}
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	//const prismaUser = await prisma.users.findUnique({where: {username: user}});

	const tokenExpires = new Date(new Date());
	tokenExpires.setHours(tokenExpires.getHours() + 1);
	tokenExpires.toISOString();
	

	try {
		const prismaUser = await prisma.user.update({
			where: {
				username : user.name
			},
			data: {
				token : refreshToken,
				tokenExpire : tokenExpires
			}
		});
		return prismaUser.token;
	} catch (error) {
		console.log(error);
	}

	
};

router.post("/token", async (req,res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) {
		return res.sendStatus(403);
	}
	
	try {
		const prismaUser = await prisma.user.findUnique({
			where: {
				username : req.body.username
			}
		});
		if (prismaUser && prismaUser.tokenExpire) {
			if (new Date() < prismaUser.tokenExpire) {
				const user = {name: req.body.username};
				const accessToken = generateAccessToken(user);
				res.json({accessToken: accessToken});
			}
			else {
				return res.status(403).send("Your token has expired, please login to get a new token");

			}

		} else {
			return res.status(403).send("Invalid token, please login to get a new token");
		}

	} catch (error) {
		console.log(error);
	}

});