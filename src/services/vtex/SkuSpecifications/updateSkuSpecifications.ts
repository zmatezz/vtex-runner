import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function updateSkuSpecifications(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/updateSkuSpecifications.xlsx`;

    const itemsList = await listenerListExcel(pathFile);
    const conflictedSkus: { skuId: string; message: string }[] = [];
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const updatedSkus = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const skuId = item[0].toString();
        const id = item[1];
        const fieldId = item[2];
        const fieldValueId = item[3];

        const requestBody = {
          Id: parseInt(id),
          FieldId: parseInt(fieldId),
          FieldValueId: parseInt(fieldValueId),
        };

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/specification`,
            "PUT",
            requestBody
          );

          console.log(
            `Successful specification update for SKU: ${skuId}:`, response.data
          );

          updatedSkus.push(skuId);
        } catch (error) {
          console.log(`
          Error when updating specification for SKU: ${skuId}: ${error.response.data}
          `);

          conflictedSkus.push({ skuId, message: error.response.data });
          3;
        }

        await new Promise((resolve) => setTimeout(resolve, ms));
      })
    );

    if (updatedSkus.length > 0) {
      console.log(
        `${updatedSkus.length} SKUs specifications updated:`,
        updatedSkus
      );

      createSheet(
        "Updated Skus Specifications",
        ["SKU"],
        itemsList.map((item) => [item[0]])
      );
    }

    if (conflictedSkus.length > 0) {
      console.log(`${conflictedSkus.length} Skus not updated:`, conflictedSkus);
      createSheet(
        "Skus not updated",
        ["SKU", "Mensagem de Conflito"],
        conflictedSkus.map((item) => [item.skuId, item.message])
      );
    }

    res.status(200).json({ message: "Successful specification update" });
  } catch (error) {
    res.status(500).json({ error: "Error when updating specifications" });
  }
}
