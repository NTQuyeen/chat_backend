const express = require("express");
const cors = require("cors");

const { initializeApp, cert } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");

const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./flutter-chat-app-15cae-firebase-adminsdk-fbsvc-c485788b9e.json");

initializeApp({
  credential: cert(serviceAccount),
  
});
const db = getFirestore();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-notification", async (req, res) => {
  try {
    const { senderId, title, body } = req.body;

    if (!senderId || !title || !body) {
      return res.status(400).json({
        success: false,
        error: "Missing senderId/title/body",
      });
    }

    const usersSnapshot = await db.collection("users").get();

    let sent = 0;

    for (const doc of usersSnapshot.docs) {
      if (doc.id === senderId) continue;

      const token = doc.data().fcmToken;

      if (!token) continue;

      try {
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

        sent++;
      } catch (err) {
        console.error(`Lỗi gửi tới ${doc.id}:`, err.message);
      }
    }

    res.json({
      success: true,
      sent,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});