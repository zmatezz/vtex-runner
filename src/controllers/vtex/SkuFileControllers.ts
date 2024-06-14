import { Request, Response } from "express";
import { getSkuFiles } from "../../services/vtex/SkuFile/getSkuFiles";
import { getSkuImages } from "../../services/vtex/SkuFile/getSkuImages";
import { getSkuImagesFromURL } from "../../services/vtex/SkuFile/getSkuImagesFromURL";
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

  async getSkuImages(req: Request, res: Response) {
    try {
      await getSkuImages(req, res);
    } catch (error) {
      console.error("Error to get Sku Images for SKUs", error);
      res.status(500).json({ error: "Error to get Sku Images for SKUs" });
    }
  }

  async getSkuImagesFromURL(req: Request, res: Response) {
    try {
      await getSkuImagesFromURL(req, res);
    } catch (error) {
      console.error("Error to get Sku Images from URL for SKUs", error);
      res
        .status(500)
        .json({ error: "Error to get Sku Images from URL for SKUs" });
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
