const { Client, GatewayIntentBits } = require("discord.js");
const cheerio = require("cheerio");
require("dotenv").config();

// Use environment variable instead
const token = process.env.DISCORD_BOT_TOKEN;

// Specify the intents your bot needs
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent, // Add this if you need to read message content
  ],
});

const CHANNEL_ID = "935663223674396725";

let lastMessageState = null; // To keep track of the "no appointments available" message state

async function checkAppointment() {
  try {
    const response = await fetch(
      "https://appointment.bmeia.gv.at/?fromSpecificInfo=True",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "en-US,en;q=0.9,ar-US;q=0.8,ar;q=0.7,de;q=0.6",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua":
            '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          cookie:
            "AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=wwy4u5vk1nb1wd40gxxzobpl",
          Referer: "https://appointment.bmeia.gv.at/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: "Language=en&Office=KAIRO&CalendarId=44279679&PersonCount=1&Command=Next",
        method: "POST",
      }
    );

    const html = await response.text();
    const $ = cheerio.load(html);
    const text = $.text();

    // Check for the "no appointments available" message
    const noAppointmentsMessage =
      "For your selection there are unfortunately no appointments available";

    if (text.includes(noAppointmentsMessage)) {
      // If the message is found and it was not in the last response, alert on Discord
      console.log("no appointment available !");
      if (lastMessageState !== "no-appointments") {
        lastMessageState = "no-appointments";
        const channel = await client.channels.fetch(CHANNEL_ID);
        channel.send("🚨 **No appointments available**");
      }
    } else {
      // If the message is not found and we haven't already alerted about available appointments
      if (lastMessageState !== "appointments-available") {
        lastMessageState = "appointments-available";
        const channel = await client.channels.fetch(CHANNEL_ID);
        channel.send(
          "🚨 **Appointments are available!** [Book now](https://appointment.bmeia.gv.at/)"
        );
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
  setInterval(checkAppointment, 1 * 60 * 1000); // every 3 minutes
  checkAppointment(); // run immediately on start
});

client.login(token);
