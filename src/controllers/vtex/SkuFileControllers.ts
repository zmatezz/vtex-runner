import { Request, Response } from "express";
import { getSkuFiles } from "../../services/vtex/SkuFile/getSkuFiles";
import { createSkuFiles } from "../../services/vtex/SkuFile/createSkuFiles";

class SkuFileControllers {
  async getSkuFiles(req: Request, res: Response) {
    try {
      await getSkuFiles(req, res);
    } catch (error) {
      console.error("Error to get Sku Files for SKUs", error);
      res.status(500).json({ error: "Error to get Sku Files for SKUs" });
    }
  }

  async createSkuFiles(req: Request, res: Response) {
    try {
      await createSkuFiles(req, res);
    } catch (error) {
      console.error("Error to create Sku Files for SKUs", error);
      res.status(500).json({ error: "Error to create Sku Files for SKUs" });
    }
  }
}
export default new SkuFileControllers();
