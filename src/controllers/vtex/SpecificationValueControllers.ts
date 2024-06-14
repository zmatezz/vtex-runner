import { Request, Response } from "express";
import { createSpecificationsValues } from "../../services/vtex/SpecificationValue/createSpecificationsValues";

class SpecificationValueControllers {
  async createSpecificationsValues(req: Request, res: Response) {
    try {
      await createSpecificationsValues(req, res);
    } catch (error) {
      console.error("Error to create specifications:", error);
      res.status(500).json({ error: "Error to create specifications" });
    }
  }
}
export default new SpecificationValueControllers();
