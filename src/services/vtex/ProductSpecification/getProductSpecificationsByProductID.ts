import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function getProductSpecificationsByProductID(
  req: Request,
  res: Response
) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFIle = `${process.env.ROOT_PATH_READ_FILES}/getProductSpecificationsByProductID.xlsx`;
    const itemsList = await listenerListExcel(pathFIle);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedSpecs = [];
    const notRetrievedSpecs = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const productId = item[0].toString();

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog_system/pvt/products/${productId}/specification`,
            "GET"
          );

          console.log(
            `Sucessful get Specifications for Product ID ${productId}: `,
            response.data
          );

          const filterResponse = response.data.flatMap((item: any) =>
            item.Value.map((value: any) => ({
              ProductID: productId,
              Name: item.Name,
              Id: item.Id,
              Value: value,
            }))
          );

          retriviedSpecs.push(...filterResponse);
        } catch (error) {
          console.error(
            `Error to get Specifications for Product ID ${productId}:`,
            error.message.data
          );
          notRetrievedSpecs.push(productId);
        }
      })
    );

    if (retriviedSpecs.length > 0) {
      console.log(
        `${retriviedSpecs.length} Products IDs specifications retrieved successfully:`,
        retriviedSpecs
      );

      createSheet(
        "Products IDs Specifications",
        ["Product ID", "Name", "ID", "Values"],
        retriviedSpecs
      );
    }

    if (notRetrievedSpecs.length > 0) {
      console.log(
        `${notRetrievedSpecs.length} Products IDs specifications not retrieved:`,
        notRetrievedSpecs
      );

      createSheet(
        "Not Retrieved Products IDs Specifications",
        ["Product ID"],
        notRetrievedSpecs.map((id: any) => ({ SkuId: id }))
      );
    }

    res.status(200).json({ message: "Products IDs retrieved Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error to get Specifications for Products IDs" });
  }
}
