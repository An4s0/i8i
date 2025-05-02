import { Router } from "express";
const router = Router();

import { APIResponse } from "../types";
import urlModel from "../models/url";
import analyticsModel from "../models/analytics";
import { rateLimit } from "../utils";
import messages from "../messages.json";

router.get("/analytics", async (req, res) => {
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

    const analytics = await analyticsModel.find({ shortCode });

    res.status(200).json({
      success: true,
      message: messages.success.analytics,
      data: {
        originalUrl: findShortUrl.originalUrl,
        shortCode: findShortUrl.shortCode,
        analytics,
      },
    } as APIResponse);
  } catch (error) {
    console.error("Error in GET analytics:", error);

    res.status(500).json({
      success: false,
      message: messages.error.server,
    } as APIResponse);
  }
});
export default router;
