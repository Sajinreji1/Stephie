
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    let body = req.body;

    // Handle string request bodies
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const date = body?.date;

    if (
      !date ||
      typeof date !== "string" ||
      date.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error("Missing Telegram environment variables");

      return res.status(500).json({
        success: false,
        message: "Telegram configuration is missing",
      });
    }

    const message =
      `💜 Stephie confirmed the coffee date!\n\n` +
      `📅 Selected date: ${date}\n\n` +
      `☕ Time to plan your coffee date!`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      console.error("Telegram API rejected request:", {
        status: telegramResponse.status,
        description: result.description,
      });

      return res.status(502).json({
        success: false,
        message: "Telegram notification failed",
      });
    }

    console.log("Telegram notification sent successfully");

    return res.status(200).json({
      success: true,
      message: "Notification sent!",
    });

  } catch (error) {
    console.error("NOTIFY FUNCTION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Notification server error",
      error: error.message,
    });
  }
}
