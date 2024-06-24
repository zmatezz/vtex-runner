import { Request, Response } from "express";
import { getProductSpecificationsByProductID } from "../../services/vtex/ProductSpecification/getProductSpecificationsByProductID";
import { getProductSpecificationsAndTheirInformationByProductID } from "../../services/vtex/ProductSpecification/getProductSpecificationsAndTheirInformationByProductID";
import { updateProductSpecificationByProductID } from "../../services/vtex/ProductSpecification/updateProductSpecificationByProductID";

class ProductSpecificationControllers {
  async getProductSpecificationsByProductID(req: Request, res: Response) {
    try {
      await getProductSpecificationsByProductID(req, res);
    } catch (error) {
      console.error("Error to get Specifications for Products IDs", error);
      res
        .status(500)
        .json({ error: "Error to get Specifications for Products IDs" });
    }
  }

  async getProductSpecificationsAndTheirInformationByProductID(
    req: Request,
    res: Response
  ) {
    try {
      await getProductSpecificationsAndTheirInformationByProductID(req, res);
    } catch (error) {
      console.error(
        "Error to get Specifications and their Information for Products IDs",
        error
      );
      res
        .status(500)
        .json({
          error:
            "Error to get Specifications and their Information for for Products IDs",
        });
    }
  }

  async updateProductSpecificationByProductID(req: Request, res: Response) {
    try {
      await updateProductSpecificationByProductID(req, res);
    } catch (error) {
      console.error("Error to update Product Specification", error);
      res
        .status(500)
        .json({ error: "Error to update Product Specification" });
    }
  }
}
export default new ProductSpecificationControllers();
