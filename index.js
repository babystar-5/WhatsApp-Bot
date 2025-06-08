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
          headers: {
            Authorization: `Bearer ce2a9212e017a7f5ada536a8b2b6d29d1749276621`,
          },
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
  return axios.post(
    "https://whatsapp-bot-nfsl.onrender.com/webhook",
    {
      phone,
      message: text,
    },
    {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMDM0ZGIwOWJlOTVmMjA5MjhmYjg0Zjg1NDI3NDIwNjk1NDNkYWFlMThiYWFlNDZmYWFlZGZiNjFmMjM0YTNkNzY2MDU1ZTllN2QyMjE5MWEiLCJpYXQiOjE3NDkzMDcyOTIuMTc4ODA2LCJuYmYiOjE3NDkzMDcyOTIuMTc4ODA4LCJleHAiOjQ5MDQ5ODA4OTIuMTc1NDk2LCJzdWIiOiIxNTcyMjAyIiwic2NvcGVzIjpbXX0.kWrLkAgY0RLJ7YIL_Qq3QJv2PM66xqu4k-sdiImFWOSEGn61GLqWKr5pGALQBf_-WnWUMFs2SDVwoOOzK6ViyonQrImHBcVIXyL42p6oBmrEMaTzObJA9f2kbQxRD6joB7h5hlNFHGqqNqJ5zdWmHDTcVcP2tKSTZWnLWSaz7dOMBTtFP3mO2gCphyAB6zTiKUJ-J6O_dqOT6ql7mkw05CCDt9BS0d219EjK-cItwHhC8HOl1O9jyOIZDmBNc7M-vRdKTkK_aJKiJlkh2MK_sOuin9zFpWI2rlGMkahnU60MaJplhQykAAueog__DY1RPvUyGi3jFj9k4s_gKFObEjg8OY9oq7gccw7Cm4VzmmNM3z3CrVLquC2Tb5FIpPj7JVw4miAi0CqlAhfc39hbq_hxxVa9PcTPwe6ZZb9cPJfNc2peSEnQlALAfDTH1w8dje6QbWwJJo_SdPW3klsbqg_DPouUySkB1M_kv0CikI2VKjsNM0NdABqz93E6FddLn_3gzodoIzZLVJj0F6btY1NlmcoYKAnh5fGPKfRgo2MJIi53Pwzu8vqv3ya-YJftY0tPtd47uodqxkfcQGpdbvdGs92mJxYUlUNpIWCO1if6OSPd6tO7yH9SY3WU00Mc3wjEcJ2pASHjGUuGkFd9qAe-mqZhHapX7icqMNL7XY4`,

        "Content-Type": "application/json",
      },
    }
  );
}

app.listen(3000, () => console.log("Bot is running on port 3000!"));
