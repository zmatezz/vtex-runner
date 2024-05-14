import { Request, Response } from "express";
import { createSpecificationsValues } from "../../services/vtex/SpecificationValue/createSpecificationsValues";

class SpecificationValueControllers {
  async createSpecificationsValues(req: Request, res: Response) {
    try {
      await createSpecificationsValues(req, res);
    } catch (error) {
      console.error("Erro para criar as especificações:", error);
      res.status(500).json({ error: "Erro para criar as especificações" });
    }
  }
}
export default new SpecificationValueControllers();
