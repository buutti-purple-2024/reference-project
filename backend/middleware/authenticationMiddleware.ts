import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authenticationMiddleware = (req:Request,res:Response,next:NextFunction) => {
	const authenticationHeader = req.headers["authorization"];
	if (authenticationHeader == null) return res.status(401).send();
	const token = authenticationHeader.split(" ")[1];
	if (process.env.ACCESS_TOKEN_SECRET) jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
		if (err) return res.status(403).send();
		//req.user = user;
		next();
	});
};