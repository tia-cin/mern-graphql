import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const generateSecretKey = () => crypto.randomBytes(32).toString("hex");

const secret = generateSecretKey();

const generateToken = (payload) =>
  jwt.sign(payload, secret, { expiresIn: "5h" });

const verifyToken = (token) => jwt.verify(token, secret);

const hashPwd = async (pwd) => await bcrypt.hash(pwd, 10);

const comparePwds = async (pwd, hashedPwd) =>
  await bcrypt.compare(pwd, hashedPwd);

export { generateToken, verifyToken, hashPwd, comparePwds };
