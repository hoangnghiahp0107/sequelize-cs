import express from "express";
import { getSearchID, getImg, getDetail ,getSaveImage, getSaveUser, getImgUser, deleteImg } from "../Controllers/imageController.js";
const imageRoutes = express.Router();

imageRoutes.get("/get-image", getImg);
imageRoutes.get("/get-image-by-id/:ten_hinh", getSearchID);
imageRoutes.get("/get-details/:hinh_id", getDetail);
imageRoutes.get("/get-save-image/:hinh_id", getSaveImage);
imageRoutes.get("/get-save-user/:nguoi_dung_id", getSaveUser);
imageRoutes.get("/get-image-by-user/:nguoi_dung_id", getImgUser);
imageRoutes.delete("/delete-img/:hinh_id", deleteImg);

export default imageRoutes