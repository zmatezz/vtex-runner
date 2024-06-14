import { Request, Response } from "express";
import { createSheet } from "../../../utils/createSheet";
import { processRequest } from "../../../utils/processRequest";

export async function getSkuImagesFromURL(req: Request, res: Response) {
  const retriviedSkuImages: { [skuId: string]: string[] } = {};
  const notRetrievedSkuImages = [];
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
              `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/file`,
              "GET"
            );

            console.log(
              `Successful get Images for SKU ${skuId}: `,
              response.data
            );
            retriviedSkuImages[skuId] = response.data.map(
              (sku: any) =>
                `https://${process.env.ACCOUNT_NAME}.vteximg.com.br/arquivos/ids/${sku.ArchiveId}-450-450/${sku.Name}.jpg`
            );
          } catch (error) {
            console.error(
              `Error to get Images for SKU ${skuId}:`,
              error.response.data
            );

            notRetrievedSkuImages.push({
              SkuId: skuId,
              Error: error.response.data,
            });
          }

          await new Promise((r) => setTimeout(r, ms));
        }
      })
    );
    const headers = ["SkuId"];
    const maxImages = Math.max(
      ...Object.values(retriviedSkuImages).map((urls) => urls.length)
    );
    for (let i = 1; i <= maxImages; i++) {
      headers.push(`Url ${i}`);
    }

    const sheetData = Object.entries(retriviedSkuImages).map(
      ([skuId, urls]) => {
        return [skuId, ...urls];
      }
    );

    if (sheetData.length > 0) {
      console.log(
        `${sheetData.length} SKUs with Images retrieved successfully:`,
        sheetData
      );

      createSheet("Skus Images", headers, sheetData);
    }

    if (notRetrievedSkuImages.length > 0) {
      console.error(
        `${notRetrievedSkuImages.length} SKUs not retrieved:`,
        notRetrievedSkuImages
      );

      createSheet(
        "Not Retrieved Skus Images",
        ["SkuId", "Error"],
        notRetrievedSkuImages.map((item) => [item.SkuId, item.Error])
      );
    }

    res.status(200).json({ message: "SKUs Images retrieved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Sku Images for SKUs" });
  }
}
