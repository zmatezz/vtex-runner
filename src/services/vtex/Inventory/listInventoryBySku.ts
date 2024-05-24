import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function listInventoryBySku(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/listInventoryBySku.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedSkuInventory = [];
    const notRetrievedSkuInventory = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const skuId = item[0].toString();

        try {
          const response = await processRequest(
            `
          ${process.env.VTEX_URL_API}/api/logistics/pvt/inventory/skus/${skuId}
          `,
            "GET"
          );

          console.log(
            `Sucessful get Inventory for SKU ${skuId}: `,
            response.data
          );

          retriviedSkuInventory.push(...response.data.balance);
        } catch (error) {
          console.error(
            `Error to get Inventory for SKU ${skuId}:`,
            error.response.data
          );

          notRetrievedSkuInventory.push({
            SkuId: skuId,
            Error: error.response.data,
          });
        }
      })
    );

    if (retriviedSkuInventory.length > 0) {
      console.log(
        `${retriviedSkuInventory.length} Inventory retrieved successfully:`,
        retriviedSkuInventory
      );

      createSheet(
        "Skus Inventory",
        ["Warehouse Id", "Warehouse Name", "Total Quantity", "Reserved Quantity"],
        retriviedSkuInventory
      );
    }

    if (notRetrievedSkuInventory.length > 0) {
      console.error(
        `${notRetrievedSkuInventory.length} Inventory not retrieved:`,
        notRetrievedSkuInventory
      );

      createSheet(
        "Not Retrieved Skus Inventory",
        ["SkuId", "Error"],
        notRetrievedSkuInventory.map((item) => [item.skuId, item.error])
      );
    }

    res.status(200).json({ message: "SKUs Inventory retrivied Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Sku Inventory for SKUs" });
  }
}
