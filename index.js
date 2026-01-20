// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// carrega variáveis de ambiente
dotenv.config();

const app = express();

// middlewares básicos
app.use(cors());
app.use(express.json());

// porta dinâmica (Render exige isso)
const PORT = process.env.PORT || 3000;

// rota de health check (IMPORTANTE pro Render)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend Flowback rodando 🚀"
  });
});

// exemplo de rota de API
app.get("/api/status", (req, res) => {
  res.json({
    backend: "online",
    env: process.env.NODE_ENV || "development"
  });
});

// start do servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
