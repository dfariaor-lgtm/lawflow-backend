const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🔥 CRIAR TABELA AUTOMATICAMENTE
async function criarTabela() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("Tabela users pronta");
}

criarTabela();

app.get("/", (req, res) => {
  res.send("LawFlow Backend Online 🚀");
});

// REGISTRO
app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: "Usuário já existe" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ success: false });
  }

  const user = result.rows[0];
  const valid = await bcrypt.compare(senha, user.password);

  if (!valid) {
    return res.status(401).json({ success: false });
  }

  const token = jwt.sign({ id: user.id }, "lawflow_secret");

  res.json({ success: true, token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
