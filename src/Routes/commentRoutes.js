import express from "express";
import { getCommentID, comment } from "../Controllers/commentController.js";

const commentRoutes = express.Router();

commentRoutes.get("/get-comment/:hinh_id", getCommentID);
commentRoutes.post("/write-comment", comment);


export default commentRoutes;