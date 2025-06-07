# WhatsApp CRM Bot

This bot connects WhatsApp (via Youseller) to Perfex CRM and Selzy to collect user data and store leads.

## 🛠 Installation

```bash
git clone https://github.com/youruser/whatsapp-crm-bot
cd whatsapp-crm-bot
npm install
```

## ⚙️ Environment Variables

Create a `.env` file:

```
PERFEX_API_KEY=your_perfex_api_key
SELZY_API_KEY=your_selzy_api_key
```

## 🚀 Running the bot

```bash
node index.js
```

## 🌐 Set Webhook

Use your deployed URL and paste it into Youseller webhook settings:

```
https://your-app-url.com/webhook
```

## ✅ Flow

1. User messages your WhatsApp
2. Bot asks for name → then email
3. Sends data to Perfex CRM and Selzy
