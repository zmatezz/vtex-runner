import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function updateCategory(req: Request, res: Response) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/updateCategory.xlsx`;

    const itemsList = await listenerListExcel(pathFile);
    const conflictedCategories: { categoryId: string; message: string }[] = [];
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const updatedCategories = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const categoryId = item[0].toString();
        const name = item[1];
        const fatherCategoryId = item[2] ? item[2].toString() : null;
        const boolean = false; // or true

        const requestBody = {
          Id: categoryId,
          Name: name,
          FatherCategoryId: fatherCategoryId,
          IsActive: boolean, 
          ShowInStoreFront: boolean,
          ShowBrandFilter: boolean,
          ActiveStoreFrontLink: boolean,
        };

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog/pvt/category/${categoryId}`,
            "PUT",
            requestBody
          );

          console.log(
            `Successful update for Category: ${categoryId}:`,
            response.data
          );

          updatedCategories.push({ Category: categoryId });
        } catch (error) {
          console.log(`
          Error when updating Category: ${categoryId}: ${error.response.data}
          `);

          conflictedCategories.push({
            categoryId,
            message: error.response.data,
          });

          await new Promise((resolve) => setTimeout(resolve, ms));
        }
      })
    );

    if (updatedCategories.length > 0) {
      console.log(
        `${updatedCategories.length} Categories updated:`,
        updatedCategories
      );

      createSheet(
        "Updated Categories",
        ["Category"],
        updatedCategories
      );
    }

    if (conflictedCategories.length > 0) {
      console.log(
        `${conflictedCategories.length} Categories not updated:`,
        conflictedCategories
      );
      createSheet(
        "Categories not updated",
        ["Category", "Error"],
        conflictedCategories.map((item) => ({ Category: item.categoryId, Error: item.message }))
      );
    }

    res.status(200).json({ message: "Successful categories update" });
  } catch (error) {
    res.status(500).json({ error: "Error when updating categories" });
  }
}
