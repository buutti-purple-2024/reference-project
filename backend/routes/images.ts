import express from "express";
export const router = express.Router();
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {  validationResult } from "express-validator";
const prisma = new PrismaClient();
import multer from "multer";
const upload = multer({dest: "uploads/"});
const path = require("path");


import { authenticationMiddleware } from "../middleware/authenticationMiddleware";
import { adminCheckMiddleware } from "../middleware/adminCheckMiddleware";

router.get("/:id", (req,res) => {
	res.sendFile( `/uploads/${req.params.id}`, {root : "."});
});


module.exports = { router };