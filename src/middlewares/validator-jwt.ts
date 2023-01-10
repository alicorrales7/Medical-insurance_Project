import jwt from "jsonwebtoken";

export const valitor = (req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not exist a token in the request" });
  }

  try {
    req.uid = jwt.verify(token, "PUTO");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is invalid" });
  }
};
