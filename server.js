const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('LawFlow API rodando 🚀');
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // login fake por enquanto (vamos melhorar depois)
  if (email && password) {
    return res.json({ token: 'token-fake-123' });
  }

  res.status(400).json({ error: 'Dados inválidos' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});

// redeploy
