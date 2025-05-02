import { Router } from "express";
const router = Router();

import { UAParser } from "ua-parser-js";
import { APIResponse } from "../types";
import urlModel from "../models/url";
import analyticsModel from "../models/analytics";
import { genShortCode, rateLimit, getCountry } from "../utils";
import messages from "../messages.json";

router.post("/shorten", async (req, res) => {
  try {
    const forwardedIP = req.headers["x-forwarded-for"] as string;
    const ipAddress = forwardedIP
      ? forwardedIP.split(",")[0]
      : req.socket.remoteAddress || "Unknown";
    if (!ipAddress) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.ip,
      } as APIResponse);
      return;
    }

    const rateLimitResponse = rateLimit(ipAddress);
    if (rateLimitResponse && !rateLimitResponse.allowed) {
      res.status(429).json({
        success: false,
        message: rateLimitResponse.message,
      } as APIResponse);
      return;
    }

    const { originalUrl, days, password } = req.body;

    const urlPattern = /^(http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(originalUrl)) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.url,
      } as APIResponse);
      return;
    }
    if (days != null && (days < 1 || days > 365)) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.days,
      } as APIResponse);
      return;
    }
    if (password != "" && (password.length < 6 || password.length > 20)) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.password,
      } as APIResponse);
      return;
    }

    const shortCode = await genShortCode();

    await new urlModel({
      originalUrl,
      password,
      shortCode,
      expiresAt: new Date(Date.now() + (days ?? 7) * 86400000),
    }).save();

    res.status(200).json({
      success: true,
      message: messages.success.shorten,
      data: {
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/c/${shortCode}`,
        originalUrl,
        expiresAt: new Date(Date.now() + (days ?? 7) * 86400000).toISOString(),
      },
    } as APIResponse);
  } catch (error) {
    console.error("Error in POST shorten:", error);

    res.status(500).json({
      success: false,
      message: messages.error.server,
    } as APIResponse);
  }
});

router.get("/shorten", async (req, res) => {
  try {
    const shortCode = req.query.code as string;
    if (!shortCode) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.shortCode,
      } as APIResponse);
      return;
    }

    const findShortUrl = await urlModel.findOne({ shortCode });
    if (!findShortUrl) {
      res.status(404).json({
        success: false,
        message: messages.error.invalid.shortCode,
      } as APIResponse);
      return;
    }

    const password = req.query.password as string;
    if (findShortUrl.password) {
      if (!password) {
        res.status(401).json({
          success: false,
          message: messages.shorten.protected,
          data: {
            protected: true,
          },
        } as APIResponse);
        return;
      }
      if (findShortUrl.password !== password) {
        res.status(401).json({
          success: false,
          message: messages.shorten.incorrectPassword,
          data: {
            protected: true,
          },
        } as APIResponse);
        return;
      }
    }

    const forwardedIP = req.headers["x-forwarded-for"] as string;
    const ipAddress = forwardedIP
      ? forwardedIP.split(",")[0]
      : req.socket.remoteAddress || "Unknown";
    if (!ipAddress) {
      res.status(400).json({
        success: false,
        message: messages.error.invalid.ip,
      } as APIResponse);
      return;
    }

    const parser = new UAParser(req.headers["user-agent"] || "Unknown");
    const country = await getCountry(ipAddress as string);

    await new analyticsModel({
      shortCode: findShortUrl.shortCode,
      ipAddress,
      country,
      browser: parser.getBrowser().name || "Unknown",
      os: parser.getOS().name || "Unknown",
      device: parser.getDevice().type || "Unknown",
      referrer: req.headers.referer || "Unknown",
    }).save();

    res.status(200).json({
      success: true,
      message: messages.success.retrieved,
      data: {
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/c/${findShortUrl.shortCode}`,
        originalUrl: findShortUrl.originalUrl,
        expiresAt: findShortUrl.expiresAt,
      },
    } as APIResponse);
  } catch (error) {
    console.error("Error in GET shorten:", error);

    res.status(500).json({
      success: false,
      message: messages.error.server,
    } as APIResponse);
  }
});

export default router;
