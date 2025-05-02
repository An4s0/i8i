import urlModel from "../models/url";

function generateRandomString(length: number) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function genShortCode() {
  let randomShortUrl;
  let existingShortUrl;
  do {
    randomShortUrl = generateRandomString(5);
    existingShortUrl = await urlModel.findOne({ shortUrl: randomShortUrl });
  } while (existingShortUrl);

  return randomShortUrl;
}
