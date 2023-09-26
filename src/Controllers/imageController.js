import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";

const model = initModels(sequelize);

const getImg = async (req, res) => {
    try {
        const data = await model.hinh_anh.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi lấy dữ liệu hình ảnh");
    }
}

const getSearchID = async(req, res) => {
    const {ten_hinh} = req.params;
    const data = await model.hinh_anh.findAll({
         where:{
            ten_hinh: ten_hinh
        }
     });
    res.send(data);
}

const getDetail = async(req, res) => {
    const {hinh_id} = req.params;
    const data = await model.hinh_anh.findAll({
        where: {
            hinh_id: hinh_id
        },
        include:["nguoi_dung"]
    })
    res.send(data);
}

const getSaveImage = async (req, res) => {
    try {
        const { hinh_id } = req.params;
        const data = await model.luu_anh.findOne({
            where: {
                hinh_id: hinh_id
            }
        });
        if (data) {
            res.send("Ảnh đã được lưu" );
        } else {
            res.send("Ảnh chưa được lưu");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Lỗi khi kiểm tra ảnh đã được lưu hay chưa.");
    }
}

const getSaveUser = async(req, res) => {
    try {
        const {nguoi_dung_id} = req.params;
        const data = await model.luu_anh.findAll({
            where: {
                nguoi_dung_id: nguoi_dung_id
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lí.");
    }
}

const getImgUser = async(req, res) => {
    try {
        const {nguoi_dung_id} = req.params;
        const data = await model.hinh_anh.findAll({
            where:{
                nguoi_dung_id: nguoi_dung_id
            }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lí.");
    }
}

const deleteImg = async (req, res) => {
    try {
        const { hinh_id } = req.params;
        
        // Xóa các bản ghi con trong bảng binh_luan trước
        await model.binh_luan.destroy({
            where: {
                hinh_id: hinh_id
            }
        });

        // Xóa các bản ghi con trong luu_anh 
        await model.luu_anh.destroy({
            where:{
                hinh_id: hinh_id
            }
        })

        // Sau đó xóa bản ghi trong bảng hinh_anh
        await model.hinh_anh.destroy({
            where: {
                hinh_id: hinh_id
            }
        });

        res.send("Xóa ảnh thành công");
    } catch (error) {
        console.log("Lỗi xóa ảnh:", error);
        res.status(500).send("Đã xảy ra lỗi trong quá trình xử lí.");
    }
}



export {getSearchID, getImg, getDetail, getSaveImage, getSaveUser, getImgUser, deleteImg}