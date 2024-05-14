/**
 * @swagger
 * /vtex/sku-specification/get-sku-specifications:
 *   get:
 *     tags: [Sku Specification]
 *     summary: Recupera informações sobre as especificações de um SKU.
 *     description: Get SKU Specifications - Realiza um loop de requisições para a API Get SKU specifications com o sku passado na Url, que é passado de forma dinâmica com os skus preenchidos na planilha getSkuSpecifications. Os logs das requisições são gravados em duas planilhas "Skus Specifications" e "Not Retrieved Skus Specifications" | https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/stockkeepingunit/-skuId-/specification
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
*         description: SKUs specifications retrieved Successfully 
 *       500:
 *         description: Error to get Specifications for SKUs
 * 
 * /vtex/sku-specification/associate-sku-specifications:
 *   post:
 *     tags: [Sku Specification]
 *     summary: Associa uma especificação criada a um SKU.
 *     description: Associate SKU Specification - Realiza um loop de requisições para a API Associate SKU specification com os dados de Sku, FieldId e FieldValueId preenchidos na planilha associateSkuSpecifications, os dados do corpo da requisição são todos inseridos dinamicamente. Os logs das requisições são gravados em duas planilhas "Associated Skus" e "Skus with conflicts" | https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/stockkeepingunit/-skuId-/specification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Sku:
 *                 type: Number
 *                 description: Sku ID do produto.
 *                 example: "2096629"
 *               FieldId:
 *                 type: Number
 *                 description: ID do Campo de especificação dentro da categoria.
 *                 example: "1316"
 *               FieldValueId: 
 *                 type: Number
 *                 description: ID do valor da especificação dentro do FieldId.
 *                 example: "31985"
 *     responses:
 *       200:
 *         description: SKUs associated Successfully
 *       500:
 *         description: Error associating SKUs.
 * 
 * /vtex/sku-specification/update-sku-specifications:
 *   put:
 *     tags: [Sku Specification]
 *     summary: Atualiza uma especificação já gravada por outra em um SKU. Este endpoint atualiza apenas o FieldValueId.
 *     description: Update SKU specification - Realiza um loop de requisições para a API Update SKU specification com os dados de Sku, Id(Obtido na rota de Get SKU Specifications), FieldId e FieldValueId preenchidos na planilha updateSkuSpecifications, os dados do corpo da requisição são todos inseridos dinamicamente. Os logs das requisições são gravados em duas planilhas "Updated Skus Specifications" e "Skus not updated" | https://developers.vtex.com/docs/api-reference/catalog-api#put-/api/catalog/pvt/stockkeepingunit/-skuId-/specification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Sku: 
 *                 type: Number
 *                 description: Sku ID do produto.
 *                 example: "26105"
 *               Id:
 *                 type: Number
 *                 description: ID do Sku obtido na rota de Get Sku Specifications dentro da categoria.
 *                 example: "92213"
 *               FieldId:
 *                 type: Number
 *                 description: ID do Campo de especificação dentro da categoria.
 *                 example: "1193"
 *               FieldValueId: 
 *                 type: Number
 *                 description: ID do valor da especificação dentro do FieldId.
 *                 example: "38042"
 *     responses:
 *       200:
 *         description: Successful specification update
 *       500:
 *         description: Error when updating specifications
 * 
 * /vtex/sku-specification/auto-associate-sku-specifications:
 *   post:
 *     tags: [Sku Specification]
 *     summary: Realiza todas operações necessárias para atualizar um SKU já gravado automaticamente.
 *     description: Auto Associate Sku Specifications - Ao tentar atualizar um SKU com uma especificação já gravada, é necessário dar um GET nesse Sku usando a Get Sku Specifications, para pegar um Id único que é usado na rota de Update Sku Specifications e essa rota já lida com Skus conflitantes de forma automaticamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Sku:
 *                 type: Number
 *                 description: Sku ID do produto.
 *                 example: "2013254"
 *               FieldId:
 *                 type: Number
 *                 description: ID do Campo de especificação dentro da categoria.
 *                 example: "1474"
 *               FieldValueId: 
 *                 type: Number
 *                 description: ID do valor da especificação dentro do FieldId.
 *                 example: "40030"
 *     responses:
 *       200:
 *         description: SKUs associated Successfully.
 *       500:
 *         description: Error associating SKUs.
 */