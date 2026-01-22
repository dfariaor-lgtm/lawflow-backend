import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================
// REGISTER
// ============================
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      email,
      hashedPassword,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// ============================
// LOGIN
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios",
      });
    }

    // MOCK TEMPORÁRIO
    const hashedPassword = await bcrypt.hash("12345", 10);

    const passwordMatch = await bcrypt.compare(
      password,
      hashedPassword
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Senha incorreta",
      });
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// ============================
// ROTA PROTEGIDA
// ============================
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Rota protegida funcionando ✅",
    user: req.user,
  });
});

export default router;
