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

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== "teste@lawflow.ai") {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const passwordIsValid = await bcrypt.compare(password, "$2a$10$123");

  if (!passwordIsValid) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  const token = jwt.sign(
    { email },
    "lawflow_secret",
    { expiresIn: "1h" }
  );

  return res.json({ token });
});

export default router;
