const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  // We'll fill this in soon, promise!
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODEyMjBiMGExODY1NGM1ZDBhYTc0NjBmOGU3MWFmYmI2ZjJlODRjMjZhMTNlMTg5YTkyMzJiZmZlNmQ3YWFhMDE0Y2VhYTgwNGUxZTE5NGEiLCJpYXQiOjE3NDkzMDUxNzYuMjI5NDQ4LCJuYmYiOjE3NDkzMDUxNzYuMjI5NDUyLCJleHAiOjQ5MDQ5Nzg3NzYuMjI1MjQ1LCJzdWIiOiIxNTcyMjAyIiwic2NvcGVzIjpbXX0.lFc9mBuUfDBMJ-Vj102nS7E6FfHLxRaCy3Iva9WXlUm1um6aY7Z9clgJfFsxNC3urCi3a5c6706Hg03zPfPdKYR1J4o3Blh4ggL84gZK3NfoPscNLW-t3aQ_X9yBabV7VIpfkYQwCdcRTc46LYN_o-wtwByLNaa9';
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});