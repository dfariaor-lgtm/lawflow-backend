const express = require('express')

const app = express()
const PORT = process.env.PORT || 10000

app.get('/', (req, res) => {
  res.json({
    status: 'Backend online 🚀',
    message: 'LawFlow AI backend funcionando'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
