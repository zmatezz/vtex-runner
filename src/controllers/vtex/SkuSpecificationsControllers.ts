import { Request, Response } from "express";
import { getSkuSpecifications } from "../../services/vtex/SkuSpecifications/getSkuSpecifications";
import { associateSkuSpecifications } from "../../services/vtex/SkuSpecifications/associateSkuSpecifications";
import { updateSkuSpecifications } from "../../services/vtex/SkuSpecifications/updateSkuSpecifications";
import { autoAssociateSkuSpecifications } from "../../services/vtex/SkuSpecifications/autoAssociateSkuSpecifications";

class SkuSpecificationsControllers {
  async getSkuSpecifications(req: Request, res: Response) {
    try {
      await getSkuSpecifications(req, res);
    } catch (error) {
      console.error("Error when getting SKUs specifications:", error);
      res.status(500).json({ error: "Error when getting SKUs specifications" });
    }
  }

  async associateSkuSpecifications(req: Request, res: Response) {
    try {
      await associateSkuSpecifications(req, res);
    } catch (error) {
      console.error("Error when associating SKUs specifications:", error);
      res
        .status(500)
        .json({ error: "Error when associating SKUs specifications" });
    }
  }

  async updateSkuSpecifications(req: Request, res: Response) {
    try {
      await updateSkuSpecifications(req, res);
    } catch (error) {
      console.error("Error updating SKU specifications:", error);
      res.status(500).json({ error: "Error updating SKU specifications" });
    }
  }

  async autoAssociateSkuSpecifications(req: Request, res: Response) {
    try {
      await autoAssociateSkuSpecifications(req, res);
    } catch (error) {
      console.error(
        "Error when performing the specification association process:",
        error
      );
      res.status(500).json({
        error: "Error when performing the specification association process",
      });
    }
  }
}

export default new SkuSpecificationsControllers();
