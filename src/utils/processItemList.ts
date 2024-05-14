import { processRequest } from "./processRequest";
import { ConflictedSkus } from "../types/conflictedSkus";

export async function processItemList(
  itemsList: any[],
  requestUrl: string,
  requestMethod: string,
  ms: number
): Promise<[number[], ConflictedSkus[]]> {
  const associatedSkusWithoutConflicts: number[] = [];
  const conflictedSkus: ConflictedSkus[] = [];

  await Promise.all(
    itemsList.map(async (item) => {
      const skuId = item[0].toString();
      const fieldId = item[1];
      const fieldValueId = item[2];

      const requestBody = {
        FieldId: parseInt(fieldId),
        FieldValueId: parseInt(fieldValueId),
      };

      try {
        await processRequest(
          requestUrl.replace("{skuId}", skuId),
          requestMethod,
          requestBody
        );
        associatedSkusWithoutConflicts.push(parseInt(skuId));
      } catch (error) {
        console.error(
          `Conflict to associate the SKU ${skuId}:`,
          error.response.data
        );

        conflictedSkus.push({
          skuId,
          fieldId: parseInt(fieldId),
          fieldValueId: parseInt(fieldValueId),
          message: error.response.data,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, ms));
    })
  );

  return [associatedSkusWithoutConflicts, conflictedSkus];
}
