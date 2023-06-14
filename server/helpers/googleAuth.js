const { OAuth2Client } = require("google-auth-library");

class GoogleAuth {
  static async verifyCredentials(credential) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  }

  static async verifyToken(token) {
    const client = new OAuth2Client();
    client.setCredentials({ access_token: token });
    const response = await client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });
    return response.data;
  }
}

module.exports = GoogleAuth;
