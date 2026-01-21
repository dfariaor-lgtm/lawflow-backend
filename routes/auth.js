import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return res.json({
    message: "Usuário registrado",
    email,
    passwordHash: hashedPassword
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const fakePasswordHash = await bcrypt.hash("123456", 10);
  const isValid = await bcrypt.compare(password, fakePasswordHash);

  if (!isValid) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { email },
    "lawflow_secret",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

export default router;
