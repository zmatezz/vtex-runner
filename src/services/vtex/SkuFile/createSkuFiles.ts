import { Request, Response } from "express";
import { moduleController } from "../../../controllers/ModuleController";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { processRequest } from "../../../utils/processRequest";
import { createSheet } from "../../../utils/createSheet";

export async function createSkuFiles(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/createSkuFiles.xlsx`;
    const itemList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const createdSkuFiles = [];
    const notCreatedSkuFiles = [];

    await Promise.all(
      itemList.map(async (item) => {
        const skuId = item[0].toString();
        const name = item[1];
        const url = item[2];

        console.log(skuId, name, url);

        const requestBody = {
          IsMain: false,
          Label: name,
          Name: name,
          Text: name,
          Url: url,
        };

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/file`,
            "POST",
            requestBody
          );

          console.log(
            `Sucessful create Files for SKU ${skuId}: `,
            response.data
          );
          createdSkuFiles.push(skuId);
        } catch (error) {
          console.error(
            `Error to create Files for SKU ${skuId}:`,
            error.response.data
          );

          notCreatedSkuFiles.push({
            skuId: skuId,
            error: error.response.data,
          });
        }
      })
    );

    if (createdSkuFiles.length > 0) {
      console.log(
        `${createdSkuFiles.length} Sku files created successfully:`,
        createdSkuFiles
      );

      createSheet(
        "Created Sku Files",
        ["SKU"],
        createdSkuFiles.map((item) => [item])
      );
    }

    if (notCreatedSkuFiles.length > 0) {
      console.error(
        `${notCreatedSkuFiles.length} Sku files not created successfully:`,
        notCreatedSkuFiles
      );

      createSheet(
        "Not Created Sku Files",
        ["SKU", "Error"],
        notCreatedSkuFiles.map((item) => [item.skuId, item.error])
      );
    }

    res.status(200).json({ message: "Successful specification update" });
  } catch (error) {
    res.status(500).json({ error: "Error when updating specifications" });
  }
}
