import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const generateAccessToken = (user : {name : string} ) => {
	if(process.env.ACCESS_TOKEN_SECRET) return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
};

export const authenticationMiddleware = async (req:Request,res:Response,next:NextFunction) => {
	const accessToken = req.cookies.accesstoken;
	//console.log("auth middleware", accessToken)
	//if (accessToken == null) return res.status(401).send();
	const token = accessToken; //authenticationHeader.split(" ")[1];
	//console.log(token)
	if (process.env.ACCESS_TOKEN_SECRET) {
		try {
			//console.log("trying to decode")
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			//console.log("decoding succesful");
			/*res.cookie("token", token, {
				httpOnly: true
			});*/
			req.user = decoded.name
			next();
		} catch (error) {
			if (req.cookies.refreshtoken) {
				//console.log("access token decoding failed, checking refresh token validity")
				try {
					const user = await prisma.user.findFirst({
						where: {
							token : req.cookies.refreshtoken
						}
					});
					if (user) {
						const newAccessToken = generateAccessToken( {name: user.username});
						//console.log(newAccessToken)
						res.cookie("accesstoken", newAccessToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: false});
						//console.log("new access token generated");
						req.user = user.username;
						next();
					}
				}	
				catch (error) {
					//console.log("error1");
					res.status(401).send();
				}
			}
			else {
				//console.log("error2");
				res.status(401).send();	
			}
		}
	}
};
