import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    try {
        let { token } = req.headers;
        console.log(verifyToken(token))
        if (verifyToken(token)) {
            next();
        }
    } catch (error) {
        res.status(403).send(`Không có quyền truy cập`);
    }
};

const taoToken = (data) => {
    return jwt.sign({ data }, "HOANGNGHIA", { expiresIn: "5m" });
};

const verifyToken = (token) => {
    return jwt.verify(token, "HOANGNGHIA");
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

export { checkToken, taoToken, verifyToken, decodeToken }; 