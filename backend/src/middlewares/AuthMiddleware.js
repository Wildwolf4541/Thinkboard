import jwt from "jsonwebtoken"
import UserM from "../models/UserModel.js";

const AuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_TOKEN);

    req.user = await UserM.findOne({ _id }).select("_id");

    next(); // 🔥 LET REQUEST CONTINUE
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default AuthMiddleware