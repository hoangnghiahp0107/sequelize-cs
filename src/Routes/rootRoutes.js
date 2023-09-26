import express from 'express';
import userRoutes from './userRoutes.js';
import imageRoutes from './imageRoutes.js';
import commentRoutes from './commentRoutes.js';
const rootRouter = express.Router();

// Đối tượng user
rootRouter.use("/user", [userRoutes]);

// Đối tượng image
rootRouter.use("/image", [imageRoutes]);

// Đối tượng comment
rootRouter.use("/comment", [commentRoutes]);

export default rootRouter;
