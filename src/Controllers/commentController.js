import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";

const model = initModels(sequelize);

const getCommentID = async(req, res) => {
    const {hinh_id} = req.params;
    const data = await model.binh_luan.findAll({
         where:{
            hinh_id: hinh_id
        }
     });
    res.send(data);
}

const comment = async(req, res) => {
    try {
        const {nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung} = req.body;
        const newData = {
            nguoi_dung_id,
            hinh_id,
            ngay_binh_luan,
            noi_dung
        };
        await model.binh_luan.create(newData);
        res.send("Bình luận thành công!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }
}

export {getCommentID, comment}