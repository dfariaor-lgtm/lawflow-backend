import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rota base (health check)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "LawFlow AI backend rodando 🚀"
  });
});

// rotas de autenticação
app.use("/auth", authRoutes);

// porta dinâmica do Render
const PORT = process.env.PORT || 3000;

// start do servidor
app.listen(PORT, () => {
  console.log(`✅ Backend LawFlow AI rodando na porta ${PORT}`);
});
