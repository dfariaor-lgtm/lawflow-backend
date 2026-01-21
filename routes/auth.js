import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/**
 * REGISTRO (fake, só para teste)
 */
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  return res.status(201).json({
    message: "Usuário registrado com sucesso",
    user: {
      email
    }
  });
});

/**
 * LOGIN (FUNCIONAL, SEM BANCO)
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // credenciais fixas para teste
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
