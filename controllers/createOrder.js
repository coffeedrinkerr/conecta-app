const { CLIENT_ID, APP_SECRET } = process.env;

const baseUrl = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com"
};

async function generateAccessToken() {
  const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${baseUrl.sandbox}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error generating access token: ${errorMessage}`);
  }

  const data = await response.json();
  return data.access_token;
}

module.exports = async (req, res) => {
  try {
    const { price, description } = req.body;
    const accessToken = await generateAccessToken();
    const url = `${baseUrl.sandbox}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: price.toFixed(2),
            },
            description: description,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error creating PayPal order: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('PayPal order created successfully:', data);
    return res.json(data);
  } catch (error) {
    console.error('Error creating PayPal order:', error.message);
    return res.status(500).json({ error: error.message });
  }
};
