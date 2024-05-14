import { Request, Response } from "express";
import { getPriceBySkuId } from "../../services/vtex/PricesAndFixedPrices/getPriceBySkuId";
import { getFixedPrices } from "../../services/vtex/PricesAndFixedPrices/getFixedPrices";

class PriceAndFixedPricesControllers {
  async getPriceBySkuId(req: Request, res: Response) {
    try {
      await getPriceBySkuId(req, res);
    } catch (error) {
      console.error("Error to get Sku Prices", error);
      res.status(500).json({ error: "Error to get Sku Prices" });
    }
  }

  async getFixedPrices(req: Request, res: Response) {
    try {
      await getFixedPrices(req, res);
    } catch (error) {
      console.error("Error to get Sku Prices", error);
      res.status(500).json({ error: "Error to get Sku Prices" });
    }
  }
}
export default new PriceAndFixedPricesControllers();
