import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function getCategoryById(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/getCategoryById.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedCategories = [];
    const notRetrievedCategories = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const categoryId = item[0].toString();

        try {
          const response = await processRequest(
            `
          ${process.env.VTEX_URL_API}/api/catalog/pvt/category/${categoryId}
          `,
            "GET"
          );

          console.log(`Sucessful get general information about a category: ${categoryId}: `, response.data);

          const filterResponse = {
            Id: response.data.Id,
            Name: response.data.Name,
            FatherCategoryId: response.data.FatherCategoryId,
            IsActive: response.data.IsActive,
            HasChildren: response.data.HasChildren,
          };

          retriviedCategories.push(filterResponse);

        } catch (error) {
          console.error(
            `Error to get general information about a category: ${categoryId}:`,
            error.response.data
          );

          notRetrievedCategories.push({
            categoryId: categoryId,
            Error: error.response.data,
          });
        }
      })
    );

    if (retriviedCategories.length > 0) {
      console.log(
        `${retriviedCategories.length} categories retrieved successfully:`,
        retriviedCategories
      );

      createSheet(
        "Categories General Information",
        ["Id", "Name", "FatherCategoryId", "IsActive", "HasChildren"],
        retriviedCategories
      );
    }

    if (notRetrievedCategories.length > 0) {
      console.error(
        `${notRetrievedCategories.length} categories not retrieved:`,
        notRetrievedCategories
      );

      createSheet(
        "Not Retrieved Categories General Information",
        ["categoryId", "Error"],
        notRetrievedCategories.map((item) => [item.categoryId, item.error])
      );
    }

    res.status(200).json({ message: "Categories general information retrivied Sucessfully" });
  } catch (error) {
    res.status(500).json({ error: "Error to get general information about categories IDs" });
  }
}
