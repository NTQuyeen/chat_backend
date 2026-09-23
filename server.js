const express = require("express");
const cors = require("cors");

const { initializeApp, cert } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

const serviceAccount = require("./flutter-chat-app-15cae-firebase-adminsdk-fbsvc-c485788b9e.json");

initializeApp({
  credential: cert(serviceAccount),
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-notification", async (req, res) => {
  try {
    const { token, title, body } = req.body;

    await getMessaging().send({
      token,
      notification: {
        title,
        body,
      },
      android: {
        priority: "high",
      },
      data: {
        click_action: "FLUTTER_NOTIFICATION_CLICK",
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server chạy tại http://localhost:3000");
});