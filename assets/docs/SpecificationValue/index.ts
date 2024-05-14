
 /**
 * @swagger
 * 
 * /vtex/specification-value/create-specification-value:
 *   post:
 *     tags: [Specification Value]
 *     summary: Cria novos valores de especificação para o FieldId especificado.
 *     description: Create Specification Value - Realiza um loop de requisições para a API Create specification value com os dados de FieldId e Name preenchidos na planilha createSpecificationsValues, os dados do corpo da requisição são todos inseridos dinamicamente. https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/specificationvalue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FieldId:
 *                 type: string
 *                 description: ID do Campo de especificação dentro da categoria.
 *                 example: "1274"
 *               Name:
 *                 type: string
 *                 description: Nome da especificação.
 *                 example: "Vermelho"
 *               IsActive: 
 *                 type: boolean
 *                 description: Habilite (true) ou desabilite (false) o valor da especificação.
 *                 example: "true"
 *     responses:
 *       200:
 *         description: Valor de especificação criado com sucesso.
 *       500:
 *         description: Falha ao criar o valor de especificação.
 * 
 */