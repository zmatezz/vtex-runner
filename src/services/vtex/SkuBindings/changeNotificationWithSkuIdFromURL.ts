import { Request, Response } from "express";
import { createSheet } from "../../../utils/createSheet";
import { processRequest } from "../../../utils/processRequest";

export async function changeNotificationWithSkuIdFromURL(
  req: Request,
  res: Response
) {
  const notifiedSkus: number[] = [];
  const unnotifiedSkus = [];
  const params = new URLSearchParams();

  try {
    for (const sku in req.query) {
      params.append(sku, req.query[sku].toString());
    }
    const skuQuery = params.get("sku");
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    await Promise.all(
      skuQuery.split(",").map(async (skuId) => {
        if (skuId.length > 0) {
          try {
            const response = await processRequest(
              `${process.env.VTEX_URL_API}/api/sku-binding/pvt/skuseller/changenotification/${skuId}`,
              "POST"
            );

            console.log(`Notification sent sucessfully for SKU: ${skuId}`);
            notifiedSkus.push(parseInt(skuId));
          } catch (error) {
            console.error(`Failed to notify SKU: ${skuId}`);
            unnotifiedSkus.push(parseInt(skuId));
          }

          await new Promise((resolve) => setTimeout(resolve, ms));
        }
      })
    );

    if (unnotifiedSkus.length > 0) {
      console.log(
        `${unnotifiedSkus.length} Skus that were not notified:`,
        unnotifiedSkus
      );

      createSheet(
        "SKUs from URL Not Notified",
        ["SKU"],
        unnotifiedSkus.map((skuId) => [skuId])
      );
    }

    createSheet(
      "SKUs Notified Successfully",
      ["SKU"],
      notifiedSkus.map((skuId) => [skuId])
    );

    console.log(
      `${notifiedSkus.length} Skus notified Sucessfully:`,
      notifiedSkus
    );

    res.status(200).json({
      message: "Skus notified Sucessfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error sending notifications" });
  }
}
