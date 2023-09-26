import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import bcrypt from "bcrypt";
import { taoToken } from "../Config/jwtconfig.js";

const model = initModels(sequelize);

const signUp = async(req,res) => {
    try{
        let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
        let checkEmail = await model.nguoi_dung.findAll({
            where:{
                email
            }
        })
        if (checkEmail.length > 0) {
            res.send("Email đã tồn tại!");
            return;
        }
        let newData = {
            email,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            ho_ten,
            tuoi,
            anh_dai_dien
        };
        await model.nguoi_dung.create(newData);
        res.send("Đăng ký thành công!");
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Đã có lỗi trong quá trình xử lý");
    }

}

const login = async(req, res) => {
    try {
        let { email, mat_khau } = req.body;

        let checkEmail = await model.nguoi_dung.findOne({
            where: {
                email
            }
        });

        if (checkEmail){
            let checkPass = bcrypt.compareSync( mat_khau, checkEmail.mat_khau );
            if(checkPass == true){
                let token = taoToken(checkEmail);
                res.status(200).send(token);
            }
            else{
                res.status(400).send("Mật khẩu không đúng");
            }
        }
        else{
            res.status(400).send("Email không đúng");
        }
        } catch (error) {
            res.status(500).send("Đã có lỗi trong quá trình xử lý");
        }
}

const getUser = async (req, res) => {
    try {
        const data = await model.nguoi_dung.findAll();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi khi lấy dữ liệu hình ảnh");
    }
}

const updateUser = async (req, res) => {
    try {
        const { nguoi_dung_id } = req.params;
        const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

        const checkEmail = await model.nguoi_dung.findOne({
            where: {
                email
            }
        });

        if (checkEmail) {
            return res.status(400).send("Email đã tồn tại!");
        }

        await model.nguoi_dung.update(
            { email, mat_khau, ho_ten, tuoi, anh_dai_dien },
            {
                where: {
                    nguoi_dung_id
                }
            }
        );

        return res.status(200).send("Cập nhật thành công!");
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error);
        return res.status(500).send("Lỗi khi cập nhật thông tin người dùng");
    }
}

export{
    signUp, login, getUser, updateUser
}   