const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const sessions = {}; // temporary memory

app.post('/webhook', async (req, res) => {
  const { phone, message } = req.body;

  if (!sessions[phone]) {
    sessions[phone] = { step: 1 };
    return sendMessage(phone, "👋 Hello! What's your name?");
  }

  const session = sessions[phone];

  if (session.step === 1) {
    session.name = message;
    session.step = 2;
    return sendMessage(phone, `Nice to meet you, ${message}! What's your email?`);
  }

  if (session.step === 2) {
    session.email = message;
    delete sessions[phone]; // Reset session
    return sendMessage(phone, `✅ Thanks, ${session.name}! We've saved your info and sent you a welcome email.`);
  }

  res.sendStatus(200);
});

function sendMessage(phone, text) {
  // Replace with actual Youseller send message endpoint
  return axios.post('https://youseller.com.br/api/send-message', {
    phone,
    message: text
  });
}

app.listen(3000, () => console.log('Bot is running'));