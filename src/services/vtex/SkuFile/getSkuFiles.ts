import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function getSkuFiles(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/getSkuFiles.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedSkuFiles = [];
    const notRetrievedSkuFiles = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const skuId = item[0].toString();

        try {
          const response = await processRequest(
            `
          ${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/file
          `,
            "GET"
          );

          console.log(`Sucessful get Files for SKU ${skuId}: `, response.data);

          const filterResponse = response.data.map((sku: any) => ({
            Id: sku.Id,
            ArchiveId: sku.ArchiveId,
            SkuId: sku.SkuId,
            Name: sku.Name,
            Url: `https://${process.env.ACCOUNT_NAME}.vteximg.com.br/arquivos/ids/${sku.ArchiveId}-450-450/${sku.Name}.jpg`,
          }));

          retriviedSkuFiles.push(...filterResponse);
        } catch (error) {
          console.error(
            `Error to get Files for SKU ${skuId}:`,
            error.response.data
          );

          notRetrievedSkuFiles.push({
            SkuId: skuId,
            Error: error.response.data,
          });
        }
      })
    );

    if (retriviedSkuFiles.length > 0) {
      console.log(
        `${retriviedSkuFiles.length} files retrieved successfully:`,
        retriviedSkuFiles
      );

      createSheet(
        "Skus Files",
        ["Id", "ArchiveId", "SkuId", "Name", "Url"],
        retriviedSkuFiles
      );
    }

    if (notRetrievedSkuFiles.length > 0) {
      console.error(
        `${notRetrievedSkuFiles.length} files not retrieved:`,
        notRetrievedSkuFiles
      );

      createSheet(
        "Not Retrieved Skus Files",
        ["SkuId", "Error"],
        notRetrievedSkuFiles.map((item) => [item.skuId, item.error])
      );
    }

    res.status(200).json({ message: "SKUs Files retrivied Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Sku Files for SKUs" });
  }
}
