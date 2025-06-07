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
  const VERIFY_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiODEyMjBiMGExODY1NGM1ZDBhYTc0NjBmOGU3MWFmYmI2ZjJlODRjMjZhMTNlMTg5YTkyMzJiZmZlNmQ3YWFhMDE0Y2VhYTgwNGUxZTE5NGEiLCJpYXQiOjE3NDkzMDUxNzYuMjI5NDQ4LCJuYmYiOjE3NDkzMDUxNzYuMjI5NDUyLCJleHAiOjQ5MDQ5Nzg3NzYuMjI1MjQ1LCJzdWIiOiIxNTcyMjAyIiwic2NvcGVzIjpbXX0.lFc9mBuUfDBMJ-Vj102nS7E6FfHLxRaCy3Iva9WXlUm1um6aY7Z9clgJfFsxNC3urCi3a5c6706Hg03zPfPdKYR1J4o3Blh4ggL84gZK3NfoPscNLW-t3aQ_X9yBabV7VIpfkYQwCdcRTc46LYN_o-wtwByLNaa9xKxjvA-yHSu447ZsjOeFn5kGLtGV9kfYmPaMj7FPQovNpDRR2wcKvfOIhsa_ke5-yBVtY3dRchpTi1Vdkw2ipGYJQVET_h9EjD4BORzKV36r9mG5bJsLulWUQxUkRGBHU8LpfZMKKMOA4vgsffSpaE48cHOOw5mpOV1E-nxetCe54r6fSIT4_QdCOaY_nUnExrJZG0OTrVx_qmGxEEGErJ3SOMAzirmb5EKQ4kpWiDwIL37LGpjxubXoPuL2EVEnwrN2I6ZklIimu0Vl4PxjTZ4wfyDpPHSCm7R6_7ayMC2jamVmGGt6WrcOVyO793RBunOjFephqRoJLHe50KsSdv_feTCnPpsvmhVACiQd0E8RO1fKaT7YU3O6HkJX1JQqgR1x_u_duRBxEnOaFInueuxoW6FYdn5G-fQULtb9rZQKBkuGEYzeH0OAdM5E0n1sJFAgXE_QAIM-nM0uKhs9utDP_Lv_vEJ1X9K6gur2KpKx0wi1D3XMBsOYhaLr-gN5WZZncpyY1Uc';
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});