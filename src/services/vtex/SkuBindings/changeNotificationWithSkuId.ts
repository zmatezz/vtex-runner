import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function changeNotificationWithSkuId(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/changeNotificationWithSkuId.xlsx`;

    const itemsList = await listenerListExcel(pathFile);

    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const notifiedSkus = [];
    const unnotifiedSkus = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const skuID = item[0];

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/sku-binding/pvt/skuseller/changenotification/${skuID}`,
            "POST"
          );

          console.log(`Notification sent sucessfully for SKU: ${skuID}`);
          notifiedSkus.push(skuID);
        } catch (error) {
          console.error(`Failed to notify SKU: ${skuID}`);
          unnotifiedSkus.push(skuID);
        }

        await new Promise((resolve) => setTimeout(resolve, ms));
      })
    );

    if (unnotifiedSkus.length > 0) {
      console.log(
        `${unnotifiedSkus.length} Skus that were not notified:`,
        unnotifiedSkus
      );

      createSheet(
        "SKUs Not Notified",
        ["SKU"],
        unnotifiedSkus.map((item) => [item])
      );
    }

    createSheet(
      "SKUs Notified Successfully",
      ["SKU"],
      notifiedSkus.map((item) => [item])
    );

    console.log(
      `${notifiedSkus.length} SKUs Notified Successfully:`,
      notifiedSkus
    );
    res.status(200).json({
      message: "SKUs Notified Successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Error sending notifications" });
  }
}
