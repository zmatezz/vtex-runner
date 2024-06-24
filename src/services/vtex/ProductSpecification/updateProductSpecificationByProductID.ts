import { Request, Response } from "express";
import { listenerListExcel } from "../../../utils/listenerListExcel";
import { createSheet } from "../../../utils/createSheet";
import { moduleController } from "../../../controllers/ModuleController";
import { processRequest } from "../../../utils/processRequest";

export async function updateProductSpecificationByProductID(
  req: Request,
  res: Response
) {
  try {
    const { params } = moduleController().searchParams(req, res);
    const pathFile = `${process.env.ROOT_PATH_READ_FILES}/updateProductSpecificationByProductID.xlsx`;
    const itemsList = await listenerListExcel(pathFile);
    const ms = params.get("ms") ? parseInt(params.get("ms")) : 1000;

    const updatedSpecs = [];
    const notUpdatedSpecs = [];

    await Promise.all(
      itemsList.map(async (item: any) => {
        const productId = item[0].toString();

        const requestBody = [
          {
            Value: ["Ativar"],
            Id: 1491,
            Name: "Ativa ajuda de cor de pintura"
          }
        ];

        try {
          const response = await processRequest(
            `${process.env.VTEX_URL_API}/api/catalog_system/pvt/products/${productId}/specification`,
            "POST",
            requestBody
          );

          console.log(
            `Successful update Specifications for Product ID ${productId}:`,
            response.data
          );

          updatedSpecs.push(productId);
        } catch (error) {
          console.error(
            `Error to update Specifications for Product ID ${productId}:`,
            error.message.data
          );
          notUpdatedSpecs.push(productId);
        }
      })
    );

    if (updatedSpecs.length > 0) {
      console.log(
        `${updatedSpecs.length} Products IDs specifications updated successfully:`,
        updatedSpecs
      );

      createSheet(
        "Products IDs Specifications Updated Successfully",
        ["Product ID"],
        updatedSpecs.map(id => ({ "Product ID": id }))
      );
    }

    if (notUpdatedSpecs.length > 0) {
      console.log(
        `${notUpdatedSpecs.length} Products IDs specifications not updated:`,
        notUpdatedSpecs
      );

      createSheet(
        "Not Updated Products IDs Specifications",
        ["Product ID"],
        notUpdatedSpecs.map(id => ({ "Product ID": id }))
      );
    }

    res.status(200).json({ message: "Products IDs updated Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error to update Specifications for Products IDs" });
  }
}
