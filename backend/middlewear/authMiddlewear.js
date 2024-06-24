import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization || req.cookies.token;
    console.log("token hai kya bhai", token);
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    // console.log("token",token)
    const decode = jwt.verify(token, process.env.ACCESS_KEY_TOKEN);
    console.log(decode);
    req.userId = decode.id;
    next();
  } catch (error) {
    res.send({
      status: false,
      message: "Invalid Token",
      msg: error.message,
    });
  }
};
