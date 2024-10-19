const router = require("express").Router();
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51QBa6TALC4WTpx2Tx4Q0dFshYYBe5DBlZKv47RQQnRUy3oKHSqxxilbRZDCySegfyrsL1xTJz5lOwfwv8ft9MnlW00LDmWOEPx"
);

//CREATE
router.post("/create-payment-intent", verify, async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
