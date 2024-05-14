import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function getProductSpecificationsAndTheirInformationByProductID(
  req: Request,
  res: Response
) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFIle = `${process.env.ROOT_PATH_READ_FILES}/getProductSpecificationsAndTheirInformationByProductID.xlsx`;
    const itemsList = await listenerListExcel(pathFIle);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const retriviedProductSpecs = [];
    const notRetriviedProductSpecs = [];

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
              Id: item.Id,
              Name: item.Name,
              Values: value,
            }))
          );

          retriviedProductSpecs.push(...filterResponse);
        } catch (error) {
          console.error(
            `Error to get Specifications for Product ID ${productId}:`,
            error.message.data
          );
          notRetriviedProductSpecs.push(productId);
        }
      })
    );

    if (retriviedProductSpecs.length > 0) {
      console.log(
        `${retriviedProductSpecs.length} Products IDs specifications retrieved successfully:`,
        retriviedProductSpecs
      );

      createSheet(
        "Products IDs Specifications",
        ["Product ID", "ID", "Name", "Values"],
        retriviedProductSpecs
      );
    }

    if (notRetriviedProductSpecs.length > 0) {
      console.log(
        `${notRetriviedProductSpecs.length} Products IDs specifications not retrieved:`,
        notRetriviedProductSpecs
      );

      createSheet(
        "Not Retrieved Products IDs Specifications",
        ["Product ID"],
        notRetriviedProductSpecs.map((id: any) => ({ SkuId: id }))
      );
    }

    res.status(200).json({ message: "Products IDs retrieved Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error to get Specifications for Products IDs" });
  }
}
