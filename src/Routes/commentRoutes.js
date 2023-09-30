import express from "express";
import { getCommentID, comment } from "../Controllers/commentController.js";
import { checkToken } from "../Config/jwtconfig.js";

const commentRoutes = express.Router();

commentRoutes.get("/get-comment/:hinh_id", checkToken ,getCommentID);
commentRoutes.post("/write-comment", checkToken,comment);


export default commentRoutes;