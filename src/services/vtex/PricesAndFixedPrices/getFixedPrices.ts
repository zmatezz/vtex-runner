import { Request, Response } from "express";
import { createSheet } from "../../../utils/createSheet";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { processRequest } from "../../../utils/processRequest";
import { moduleController } from "../../../controllers/ModuleController";

export async function getFixedPrices(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/getPriceBySkuId.xlsx`;
    const itemList = await listenerListExcel(pathFile);
    const ms = parseInt(params.get("ms")) || 1000;

    const retrievedSkusFixedPrices: any[] = [];
    const notRetrievedSkusFixedPrices: number[] = [];
    const tradePolicysIds = [1, 4, 7, 9];

    await Promise.all(
      itemList.map(async (item) => {
        const skuId = item[0].toString();

        try {
          const response = await processRequest(
            `https://api.vtex.com/${process.env.ACCOUNT_NAME}/pricing/prices/${skuId}/fixed`,
            "GET"
          );

          const newFixedPriced = response.data
            .filter((sku: any) =>
              tradePolicysIds.includes(parseInt(sku.tradePolicyId))
            )
            .map((sku: any) => ({
              sku: item[0],
              tradePolicysId: sku.tradePolicyId,
              value: sku.value,
              valueFormatted: `R$ ${sku.value}`,
              listPrice: sku.listPrice,
              listPriceFormatted: `R$ ${sku.listPrice}`,
            }));

          retrievedSkusFixedPrices.push(...newFixedPriced);
        } catch (error) {
          console.log(
            `Error to get Prices for SKU: ${skuId}`,
            error.response.data
          );
          notRetrievedSkusFixedPrices.push(skuId);
        }
      })
    );
    if (retrievedSkusFixedPrices.length > 0) {
      console.log(
        `${retrievedSkusFixedPrices.length} Fixed Prices retrivied Sucessfully:`,
        retrievedSkusFixedPrices
      );

      createSheet(
        "Sku Fixed Prices retrivied",
        [
          "SKU",
          "Trade Policy ID",
          "Value",
          "Value Formatted",
          "ListPrice",
          "ListPrice Formatted",
        ],
        retrievedSkusFixedPrices
      );
    }

    if (notRetrievedSkusFixedPrices.length > 0) {
      console.log(
        `${notRetrievedSkusFixedPrices.length} Fixed Prices not retrivied:`,
        retrievedSkusFixedPrices
      );

      createSheet(
        "Sku Fixed Prices not retrivied",
        ["Sku"],
        notRetrievedSkusFixedPrices.map((item) => [item])
      );
    }

    res
      .status(200)
      .json({ message: "SKUs Fixed Prices retrivied Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get Sku Fixed Prices for SKUs" });
  }
}
