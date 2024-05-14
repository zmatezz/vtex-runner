import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function createSpecificationsValues(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/createSpecificationsValues.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const createdSpecificationValues: number[] = [];
    const notCreatedSpecificationValues: number[] = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const fieldId = item[0];
        const name = item[1];

        if (!name) {
          console.error(`Name not found for FieldId: ${fieldId}`);

          notCreatedSpecificationValues.push(parseInt(fieldId));
          return;
        }

        const requestBody = {
          FieldId: parseInt(fieldId),
          Name: name,
          IsActive: true,
        };

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog/pvt/specificationvalue`,
            "POST",
            requestBody
          );

          console.log(
            `Sucessful created specification for FieldId ${fieldId}`,
            response.data
          );

          createdSpecificationValues.push(parseInt(fieldId));
        } catch (error) {
          console.error(
            "Erro na requisição para FieldId",
            fieldId,
            ":",
            error.response.data
          );

          console.error(
            `Error to create specification for FieldId: ${fieldId}`,
            error.response.data
          );

          notCreatedSpecificationValues.push(parseInt(fieldId));
        }
      })
    );

    if (createdSpecificationValues.length > 0) {
      console.log(
        `${createdSpecificationValues.length} Specifications created Sucessfully:`,
        createdSpecificationValues
      );

      createSheet(
        "Created Specifications Values",
        ["FieldId"],
        createdSpecificationValues.map((fieldId) => [fieldId])
      );
    }

    if (notCreatedSpecificationValues.length > 0) {
      console.error(
        `${notCreatedSpecificationValues.length} specifications not created:`,
        notCreatedSpecificationValues
      );

      createSheet(
        "Not Created Specifications Values",
        ["FieldId"],
        notCreatedSpecificationValues.map((fieldId) => [fieldId])
      );
    }

    res
      .status(200)
      .json({ message: "Specifications Values created Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to create Specifications Values" });
  }
}
