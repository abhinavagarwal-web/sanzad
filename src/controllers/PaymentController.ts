import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { db } from "../db/db";// Ensure your Drizzle DB config is imported
import { payments } from "../db/schema"; // Import your payments table schema

export const PaymentIniciate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, orderId, customerEmail, customerPhone } = req.body;

        const merchantId = process.env.CCAVENUE_MERCHANT_ID!;
        const accessCode = process.env.CCAVENUE_ACCESS_CODE!;
        const workingKey = process.env.CCAVENUE_WORKING_KEY!;
        const redirectUrl = process.env.CCAVENUE_REDIRECT_URL!;
        const cancelUrl = process.env.CCAVENUE_CANCEL_URL!;

        // Payment data
        const data = `merchant_id=${merchantId}&order_id=${orderId}&currency=INR&amount=${amount}&redirect_url=${redirectUrl}&cancel_url=${cancelUrl}&billing_email=${customerEmail}&billing_tel=${customerPhone}`;
        
        // Generate a random IV (16 bytes)
        const iv = crypto.randomBytes(16);

        // AES-128-CBC encryption
        const cipher = crypto.createCipheriv("aes-128-cbc", Buffer.from(workingKey, "utf8"), iv);
        let encryptedData = cipher.update(data, "utf8", "hex");
        encryptedData += cipher.final("hex");

        // Save payment initiation details in the database
        await db.insert(payments).values({
            orderId,
            amount,
            customerEmail,
            customerPhone,
            status: "Pending",
        });

        res.json({
            success: true,
            paymentUrl: `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=${encryptedData}&access_code=${accessCode}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Payment initiation failed", error });
    }
};

export const PaymentStatusUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { encResp } = req.body;
      const workingKey = process.env.CCAVENUE_WORKING_KEY!;
      
      // Extract IV (first 16 bytes from encResp)
      const iv = Buffer.alloc(16, 0); // Default IV if not provided
      const decipher = crypto.createDecipheriv("aes-128-cbc", Buffer.from(workingKey, "utf8"), iv);
      
      let decryptedData = decipher.update(encResp, "hex", "utf8");
      decryptedData += decipher.final("utf8");

      // Parse response
      const params = new URLSearchParams(decryptedData);
      const orderId = params.get("order_id");
      const status = params.get("order_status");

      if (!orderId) {
          return res.status(400).json({ success: false, message: "Invalid response data" });
      }

      // Update payment status in the database
      await db.update(payments)
          .set({ status: status === "Success" ? "Success" : "Failed" })
          .where(payments.orderId.equals(orderId));

      res.json({ success: true, message: "Payment status updated", status });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Webhook processing failed", error });
  }
};

