import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { ConflictedSkus } from "../../../types/conflictedSkus";
import { processRequest } from "../../../utils/processRequest";

export async function autoAssociateSkuSpecifications(
  req: Request,
  res: Response
) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/autoAssociateSkuSpecifications.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = parseInt(params.get("ms")) || 1000;
    const [associatedSkusWithoutConflicts, conflictedSkus] =
      await processItemsList(itemsList, ms);
    handleResults(associatedSkusWithoutConflicts, conflictedSkus);
    res.status(200).json({ message: "SKUs associated Successfully" });
  } catch (error) {
    console.error("Error associating SKUs:", error);
    res.status(500).json({ error: "Error associating SKUs" });
  }
}

async function processItemsList(
  itemsList: any[],
  ms: number
): Promise<[number[], ConflictedSkus[]]> {
  const associatedSkusWithoutConflicts: number[] = [];
  const conflictedSkus: ConflictedSkus[] = [];

  await Promise.all(
    itemsList.map(async (item) => {
      const [skuId, fieldId, fieldValueId] = item.map((value: any) =>
        typeof value === "number" ? value.toString() : value
      );
      const requestBody = {
        FieldId: parseInt(fieldId),
        FieldValueId: parseInt(fieldValueId),
      };

      try {
        await processSkuAssociation(skuId, requestBody);
        associatedSkusWithoutConflicts.push(parseInt(skuId));
      } catch (error) {
        console.error(
          `Conflict to associate the SKU: ${skuId}`,
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

async function processSkuAssociation(skuId: string, requestBody: any) {
  const response = await processRequest(
    `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/specification`,
    "POST",
    requestBody
  );
  console.log(`Sucessful association for SKU: ${skuId}`);
}

function handleResults(
  associatedSkusWithoutConflicts: number[],
  conflictedSkus: ConflictedSkus[]
) {
  if (associatedSkusWithoutConflicts.length > 0) {
    console.log(
      `${associatedSkusWithoutConflicts.length} SKUs associated Successfully:`,
      associatedSkusWithoutConflicts
    );
    createSheet(
      "Associated Skus Without Conflicts",
      ["SKU"],
      associatedSkusWithoutConflicts.map((item) => [item])
    );
  }

  if (conflictedSkus.length > 0) {
    console.log(
      `${conflictedSkus.length} SKUs with conflicts:`,
      conflictedSkus
    );
    createSheet(
      "Skus with conflicts",
      ["SKU", "FieldId", "FieldValueId", "Message"],
      conflictedSkus.map((item) => [
        item.skuId,
        item.fieldId,
        item.fieldValueId,
        item.message,
      ])
    );
    handleConflitedSkus(conflictedSkus);
  }
}

async function handleConflitedSkus(conflictedSkus: ConflictedSkus[]) {
  const invalidSkus: ConflictedSkus[] = [];
  const resolvedSkus = await Promise.all(
    conflictedSkus.map(async (sku) => {
      try {
        return await getSkuIdFromSpecification(sku);
      } catch (error) {
        invalidSkus.push(sku);
        return null;
      }
    })
  );

  const skusToUpdate = resolvedSkus.filter((sku) => sku !== null);

  if (invalidSkus.length > 0) {
    createSheet(
      "Invalid Skus",
      ["SKU", "FieldId", "FieldValueId", "Message"],
      invalidSkus.map((item) => [
        item.skuId,
        item.fieldId,
        item.fieldValueId,
        item.message,
      ])
    );
  }

  await updateSkusWithIds(skusToUpdate, conflictedSkus);
}

async function getSkuIdFromSpecification(sku: ConflictedSkus): Promise<{
  skuId: string;
  id: number;
  fieldValueId: number;
  fieldId: number;
}> {
  const { skuId, fieldId, fieldValueId } = sku;

  const response = await processRequest(
    `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${skuId}/specification`,
    "GET"
  );
  console.log(`Successful GET request for SKU: ${skuId}`);

  const spec = response.data.find((spec: any) => spec.FieldId === fieldId);
  if (spec) {
    return {
      skuId: sku.skuId,
      id: spec.Id,
      fieldValueId: spec.FieldValueId,
      fieldId,
    };
  } else {
    throw new Error(
      `SKU ${skuId} does not have a specification with FieldId ${fieldId}`
    );
  }
}

async function updateSkusWithIds(
  skuDetails: {
    skuId: string;
    id: number;
    fieldValueId: number;
    fieldId: number;
  }[],
  initialValues: ConflictedSkus[]
) {
  const updateRequests = skuDetails.map((sku, index) => {
    const initialValue = initialValues[index];
    const requestBody = {
      Id: sku.id,
      FieldId: initialValue.fieldId,
      FieldValueId: initialValue.fieldValueId,
      SkuId: sku.skuId,
    };
    return processRequest(
      `${process.env.VTEX_URL_API}/api/catalog/pvt/stockkeepingunit/${sku.skuId}/specification`,
      "PUT",
      requestBody
    );
  });

  const responses = await Promise.all(updateRequests);
  const resolvedConflicts = responses.map((response, index) => {
    const skuId = skuDetails[index].skuId;
    console.log(`Sucessful update specification for SKU: ${skuId}`);
    return skuId;
  });

  if (resolvedConflicts.length > 0) {
    createSheet(
      "Resolved conflicts and associated",
      ["SKU"],
      resolvedConflicts.map((sku) => [sku])
    );
  }
}
