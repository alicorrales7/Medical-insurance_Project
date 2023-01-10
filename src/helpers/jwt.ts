import jwt from "jsonwebtoken";

export const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(payload, "PUTO", { expiresIn: "12h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("Not cant generate token");
      } else {
        resolve(token);
      }
    });
  });
};
