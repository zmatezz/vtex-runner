import { Request, Response } from "express";
import { changeNotificationWithSkuId } from "../../services/vtex/SkuBindings/changeNotificationWithSkuId";
import { changeNotificationWithSkuIdFromURL } from "../../services/vtex/SkuBindings/changeNotificationWithSkuIdFromURL";

class SkuBindingsControllers {
  async changeNotificationWithSkuId(req: Request, res: Response) {
    try {
      await changeNotificationWithSkuId(req, res);
    } catch (error) {
      console.error("Erro para enviar as cargas de Sku:", error);
      res.status(500).json({ error: "Erro para enviar as cargas de Sku" });
    }
  }

  async changeNotificationWithSkuIdFromURL(req: Request, res: Response) {
    try {
      await changeNotificationWithSkuIdFromURL(req, res);
    } catch (error) {
      console.error("Erro para enviar as cargas de Sku:", error);
      res.status(500).json({ error: "Erro para enviar as cargas de Sku" });
    }
  }
}
export default new SkuBindingsControllers();
