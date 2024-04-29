import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const adminCheckMiddleware = async (req:Request,res:Response,next:NextFunction) => {
	const authenticationHeader = req.headers["authorization"];
	if (authenticationHeader == null) return res.status(401).send();
	const token = authenticationHeader.split(" ")[1];
	if (process.env.ACCESS_TOKEN_SECRET) 
		try {
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
			console.log(decoded);
			const isAdmin = await prisma.user.findUnique({
				where: {
					username: decoded.name
				}
			});
			if (isAdmin) {
				if (isAdmin.role == "admin") {
					console.log(isAdmin.role);
					next();
				}
        else {
          res.json(403).send();
        }
			}
      else {
        res.json(403).send();
      }
		} catch (error) {
			//console.log(error);
			res.status(403).send();
		}
};


