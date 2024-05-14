import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processItemList } from "../../../utils/processItemList";

export async function associateSkuSpecifications(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/associateSkuSpecifications.xlsx`;

    const itemsList = await listenerListExcel(pathFile);
    const ms = parseInt(params.get("ms")) || 1000;

    const requestUrl = `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/{skuId}/specification`;
    const requestMethod = "POST";

    const [associatedSkus, conflictedSkus] =
      await processItemList(itemsList, requestUrl, requestMethod, ms);

    if (conflictedSkus.length > 0) {
      console.log(
        `${conflictedSkus.length} Skus with conflicts:`,
        conflictedSkus
      );
      createSheet(
        "Skus with conflicts",
        ["SKU", "FieldId", "FieldValueId", "Mensagem de Conflito"],
        conflictedSkus.map((item) => [
          item.skuId,
          item.fieldId,
          item.fieldValueId,
          item.message,
        ])
      );
    }

    if (associatedSkus.length > 0) {
      console.log(
        `${associatedSkus.length} SKUs associated Successfully:`,
        associatedSkus
      );

      createSheet(
        "Associated Skus",
        ["SKU"],
        associatedSkus.map((item) => [item])
      );
    }

    res.status(200).json({ message: "SKUs associated Successfully" });
  } catch (error) {
    console.error("Error associating SKUs:", error);
    res.status(500).json({ error: "Error associating SKUs" });
  }
}
