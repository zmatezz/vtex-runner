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
      console.error("Erro ao obter as especificações do SKUs:", error);
      res
        .status(500)
        .json({ error: "Erro ao obter as especificações do SKUs" });
    }
  }

  async associateSkuSpecifications(req: Request, res: Response) {
    try {
      await associateSkuSpecifications(req, res);
    } catch (error) {
      console.error("Erro ao associar as especificações do SKUs:", error);
      res
        .status(500)
        .json({ error: "Erro ao associar as especificações do SKUs" });
    }
  }

  async updateSkuSpecifications(req: Request, res: Response) {
    try {
      await updateSkuSpecifications(req, res);
    } catch (error) {
      console.error("Erro ao atualizar as especificações do SKUs:", error);
      res
        .status(500)
        .json({ error: "Erro ao atualizar as especificações do SKUs" });
    }
  }

  async autoAssociateSkuSpecifications(req: Request, res: Response) {
    try {
      await autoAssociateSkuSpecifications(req, res);
    } catch (error) {
      console.error(
        "Erro ao realizar o processo de associação das especificações:",
        error
      );
      res
        .status(500)
        .json({
          error: "Erro ao realizar o processo de associação das especificações",
        });
    }
  }
}

export default new SkuSpecificationsControllers();
