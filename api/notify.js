
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    let body = req.body;

    console.log("BODY TYPE:", typeof body);
    console.log("BODY VALUE:", body);

    if (Buffer.isBuffer(body)) {
      body = body.toString("utf8");
    }

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Request body is not valid JSON",
          receivedBody: body.slice(0, 200),
        });
      }
    }

    if (!body || typeof body !== "object") {
      return res.status(400).json({
        success: false,
        message: "Request body is missing or invalid",
        bodyType: typeof body,
      });
    }

    const date = body.date;

    if (!date || typeof date !== "string") {
      return res.status(400).json({
        success: false,
        message: "Date is missing",
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({
        success: false,
        message: "Telegram environment variables are missing",
      });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text:
            `💜 Stephie confirmed the coffee date!\n\n` +
            `📅 Selected date: ${date}\n\n` +
            `☕ Time to plan your coffee date!`,
        }),
      }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      console.error("Telegram API error:", result.description);

      return res.status(502).json({
        success: false,
        message: "Telegram notification failed",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification sent!",
    });

  } catch (error) {
    console.error("NOTIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
