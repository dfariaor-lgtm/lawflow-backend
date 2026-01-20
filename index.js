const express = require("express");
const cors = require("cors");

const app = express();

// 🔥 CORS LIBERADO (ESSENCIAL)
app.use(cors());
app.use(express.json());

// ROTA TESTE
app.get("/", (req, res) => {
  res.send("LawFlow Backend Online 🚀");
});

// ROTA DE TESTE DE CONEXÃO
app.get("/test", (req, res) => {
  res.json({ success: true, message: "Conexão OK com backend" });
});

// ROTA LOGIN
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (email && senha) {
    return res.json({ success: true });
  }

  return res.status(400).json({ success: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
