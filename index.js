const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const sessions = {}; // temporary memory

app.post("/webhook", async (req, res) => {
  const { phone, message } = req.body;

  if (!sessions[phone]) {
    sessions[phone] = { step: 1 };
    res.sendStatus(200);
    // return sendMessage(phone, "Hello! What's your name?");
  }

  const session = sessions[phone];

  if (session.step === 1) {
    session.name = message;
    session.step = 2;
    return sendMessage(
      phone,
      `Nice to meet you, ${message}! What's your email?`
    );
  }

  if (session.step === 2) {
    session.email = message;

    try {
      // Send to Perfex CRM
      await axios.post(
        "https://crm.casadoimportador.com.br/api/leads",
        {
          name: session.name,
          email: session.email,
          source: "WhatsApp",
        },
        {
          headers: { "Authorization": `Bearer ce2a9212e017a7f5ada536a8b2b6d29d1749276621` },
        }
      );

      // Send to Selzy
      await axios.post("https://api.selzy.com/en/api/subscribers", {
        email: session.email,
        name: session.name,
        api_key: "6u8gzqxm7r5whgii5t897mu7x9ppga5zdmaypeqy",
      });

      await sendMessage(
        phone,
        `Thanks, ${session.name}! We've saved your info and sent you a welcome email`
      );
    } catch (error) {
      console.error(
        "Error during API calls:",
        error.response?.data || error.message
      );
      await sendMessage(
        phone,
        "Oops! Something went wrong. Please try again later."
      );
    }

    delete sessions[phone]; //  Reset session
  }

  res.sendStatus(200);
});

function sendMessage(phone, text) {
  // Replace with actual Youseller send message endpoint
  return axios.post("https://youseller.com.br/api/send-message", {
    phone,
    message: text,
  });
}

app.listen(3000, () => console.log("Bot is running on port 3000!"));