import { Request, Response } from "express";
import { listInventoryBySku } from "../../services/vtex/Inventory/listInventoryBySku";

class InventoryControllers {
  async listInventoryBySku(req: Request, res: Response) {
    try {
      await listInventoryBySku(req, res);
    } catch (error) {
      console.error("Error to get Inventory for SKUs", error);
      res.status(500).json({ error: "Error to get Inventory for SKUs" });
    }
  }
}
export default new InventoryControllers();
