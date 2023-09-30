import express from "express";
import { getSearchID, getImg, getDetail ,getSaveImage, getSaveUser, getImgUser, deleteImg } from "../Controllers/imageController.js";
import { checkToken } from "../Config/jwtconfig.js";
import multer from "multer";
import compress_images from "compress-images";
const imageRoutes = express.Router();

imageRoutes.get("/get-image", checkToken, getImg);
imageRoutes.get("/get-image-by-name/:ten_hinh", checkToken, getSearchID);
imageRoutes.get("/get-details/:hinh_id", checkToken, getDetail);
imageRoutes.get("/get-save-image/:hinh_id", checkToken,getSaveImage);
imageRoutes.get("/get-save-image-by-user/:nguoi_dung_id", checkToken, getSaveUser);
imageRoutes.get("/get-image-by-user/:nguoi_dung_id", checkToken ,getImgUser);
imageRoutes.delete("/delete-img/:hinh_id", checkToken, deleteImg);

const storage = multer.diskStorage({
    destination: process.cwd() + "/public/img",
    filename: (req, file, callback) => {
        let date = new Date();
        let newName = date.getTime();
        callback(null, newName + "_" + file.originalname);
    } 
})

const upload = multer({storage});

imageRoutes.post("/upload", checkToken ,upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Vui lòng chọn một tệp để tải lên.");
        }
        
        let file = req.file;  
         await compress_images(`${process.cwd()}/public/img/${file.filename}`, 
         `./public/file/`, 
        { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "25"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
            function (error, completed, statistic) {
                console.log("-------------");
                console.log(error);
                console.log(completed);
                console.log(statistic);
                console.log("-------------");
            }
        );
        
        return res.status(200).send("Tải lên thành công!");
    } catch (error) {
        console.error("Lỗi khi tải lên hình ảnh:", error);
        return res.status(500).send("Lỗi khi tải lên hình ảnh");
    }
});

export default imageRoutes