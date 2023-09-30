import express from "express";
import { signUp,login, getUser, updateUser } from "../Controllers/userController.js";
import { checkToken } from "../Config/jwtconfig.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/login", login);
userRoutes.get("/get-user", checkToken, getUser);
userRoutes.put("/update/:nguoi_dung_id",checkToken, updateUser);



export default userRoutes