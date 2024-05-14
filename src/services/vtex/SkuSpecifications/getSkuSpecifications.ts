import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function getSkuSpecifications(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFIle = `${process.env.ROOT_PATH_READ_FILES}/getSkuSpecifications.xlsx`;
    const itemsList = await listenerListExcel(pathFIle);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedSpecs = [];
    const notRetrievedSpecs = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const skuId = item[0].toString();

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/specification`,
            "GET"
          );

          console.log(
            `Sucessful get Specifications for SKU ${skuId}: `,
            response.data
          );

          retriviedSpecs.push(...response.data);
        } catch (error) {
          console.error(
            `Error to get Specifications for SKU ${skuId}:`,
            error.message.data
          );
          notRetrievedSpecs.push(skuId);
        }
      })
    );

    if (retriviedSpecs.length > 0) {
      console.log(
        `${retriviedSpecs.length} SKUs specifications retrieved successfully:`,
        retriviedSpecs
      );

      createSheet(
        "Skus Specifications",
        ["Id", "SkuId", "FieldId", "FieldValueId", "Text"],
        retriviedSpecs
      );
    }

    if (notRetrievedSpecs.length > 0) {
      console.log(
        `${notRetrievedSpecs.length} SKUs specifications not retrieved:`,
        notRetrievedSpecs
      );

      createSheet(
        "Not Retrieved Skus Specifications",
        ["SkuId"],
        notRetrievedSpecs
      );
    }

    res
      .status(200)
      .json({ message: "SKUs specifications retrieved Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Specifications for SKUs" });
  }
}
