import { Request, Response } from "express";
import { createSheet } from "../../../utils/createSheet";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { processRequest } from "../../../utils/processRequest";
import { moduleController } from "../../../controllers/ModuleController";

export async function getPriceBySkuId(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/getPriceBySkuId.xlsx`;
    const itemList = await listenerListExcel(pathFile);
    const ms = parseInt(params.get("ms")) || 1000;

    const retrievedSkusPrices: any[] = [];
    const notRetrievedPriceSkus: number[] = [];
    const tradePolicysIds = [1, 4, 7, 9];

    await Promise.all(
      itemList.map(async (item) => {
        const skuId = item[0].toString();

        try {
          const response = await processRequest(
            `https://api.vtex.com/${process.env.ACCOUNT_NAME}/pricing/prices/${skuId}`,
            "GET"
          );

          const newFixedPriced = response.data.fixedPrices
            .filter((sku: any) =>
              tradePolicysIds.includes(parseInt(sku.tradePolicyId))
            )
            .map((sku: any) => ({
              Sku: response.data.itemId,
              listPrice: response.data.listPrice,
              costPrice: response.data.costPrice,
              basePrice: response.data.basePrice,
              tradePolicyId: sku.tradePolicyId,
              value: sku.value,
              valueFormatted: `R$ ${sku.value}`,
              tpListPrice: sku.listPrice,
              tpListPriceFormatted: `R$ ${sku.listPrice}`,
            }));

          retrievedSkusPrices.push(...newFixedPriced);
        } catch (error) {
          console.log(
            `Error to get Prices for SKU: ${skuId}`,
            error.response.data
          );
          notRetrievedPriceSkus.push(skuId);
        }
      })
    );
    if (retrievedSkusPrices.length > 0) {
      console.log(
        `${retrievedSkusPrices.length} Prices retrivied Sucessfully:`,
        retrievedSkusPrices
      );

      createSheet(
        "Sku Prices retrivied",
        [
          "Sku",
          "List Price",
          "Cost Price",
          "Base Price",
          "TradePolicyId",
          "Value",
          "Value Formatted",
          "Trade Policy ListPrice",
          "Trade PolicyList Price Formatted",
        ],
        retrievedSkusPrices
      );
    }

    if (notRetrievedPriceSkus.length > 0) {
        console.log(
            `${notRetrievedPriceSkus.length} Prices not retrivied:`,
            retrievedSkusPrices
          );

      createSheet(
        "Sku Prices not retrivied",
        ["Sku"],
        notRetrievedPriceSkus.map((item) => [item])
      );
    }

    res.status(200).json({ message: "SKUs Prices retrivied Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Sku Prices for SKUs" });
  }
}
