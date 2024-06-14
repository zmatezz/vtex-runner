import { Request, Response } from "express";
import { getCategoryById } from "../../services/vtex/Category/getCategoryById";
import { updateCategory } from "../../services/vtex/Category/updateCategory";

class CategoryControllers {
  async getCategoryById(req: Request, res: Response) {
    try {
      await getCategoryById(req, res);
    } catch (error) {
      console.error("Error to general information about categories", error);
      res.status(500).json({ error: "Error to general information about categories" });
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      await updateCategory(req, res);
    } catch (error) {
      console.error("Error to general information about categories", error);
      res.status(500).json({ error: "Error to general information about categories" });
    }
  }
}
export default new CategoryControllers();
