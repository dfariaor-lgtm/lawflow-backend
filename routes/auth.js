import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Dados obrigatórios" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return res.status(201).json({
    message: "Usuário registrado com sucesso",
    user: {
      email,
      password: hashedPassword
    }
  });
});

// LOGIN (TEMPORÁRIO – SEM BANCO)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== "teste@lawflow.ai" || password !== "123456") {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }

  const token = jwt.sign(
    { email },
    "lawflow_secret",
    { expiresIn: "1h" }
  );

  return res.json({ token });
});

export default router;
