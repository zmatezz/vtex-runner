/**
 * @swagger
 * /vtex/sku-files/get-sku-files:
 *   get:
 *     tags: [Sku Files]
 *     summary: Recupera informações gerais sobre todos os arquivos do SKU.
 *     description: getSkuFiles - Realiza um loop de requisições para a API Get SKU files com os Skus preenchidos na planilha getSkuFiles, que de forma dinâmica são usados de parâmetros na URL. Os logs das requisições são gravados em duas planilhas "Skus Files" e "Not Retrieved Skus Files" | https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/stockkeepingunit/-skuId-/file
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Files retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Files for SKUs
 *
 * /vtex/sku-files/get-sku-images:
 *   get:
 *     tags: [Sku Files]
 *     summary: Recupera todas as imagens de cada SKU da planilha getSkuImages.
 *     description: getSkuImages - Realiza um loop de requisições para a API Get SKU files com os Skus preenchidos na planilha getSkuImages, que de forma dinâmica são usados de parâmetros na URL. Os logs das requisições são gravados em duas planilhas "Skus Files" e "Not Retrieved Skus Images" | https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/stockkeepingunit/-skuId-/file
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Files retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Files for SKUs
 * 
 * /vtex/sku-files/get-sku-images-from-url?sku=2707627,2707631,2707605&ms=1000:
 *   get:
 *     tags: [Sku Files]
 *     summary: Recupera todas as imagens de cada SKU.
 *     description: getSkuImagesFromURL - Realiza um loop de requisições para a API Get SKU files com os Skus preenchidos na URL, que de forma dinâmica são usados de parâmetros na URL da requisição para VTEX. Os logs das requisições são gravados em duas planilhas "Skus Files" e "Not Retrieved Skus Images" | https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/stockkeepingunit/-skuId-/file
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Files retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Files for SKUs
 * 
 * 
 * /vtex/sku-files/create-sku-files:
 *   post:
 *     tags: [Sku Files]
 *     summary: Cria uma nova imagem para um SKU com base em seu URL ou no corpo de uma solicitação de dados.
 *     description: getSkuFiles - Realiza um loop de requisições para a API Create SKU file com os Skus preenchidos na planilha createSkuFiles, que de forma dinâmica são usados de parâmetros na URL e no Body da requisição. Os logs das requisições são gravados em duas planilhas "Created Sku Files" e "Not Created Sku Files" | https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/stockkeepingunit/-skuId-/file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IsMain:
 *                 type: boolean
 *                 description: Imagem principal.
 *                 example: "false"
 *               Label:
 *                 type: string
 *                 description: Label da imagem.
 *                 example: "Bege"
 *               Name:
 *                 type: string
 *                 description: Nome da imagem.
 *                 example: "Bege"
 *               Text:
 *                 type: string
 *                 description: Texto da imagem.
 *                 example: "Bege"
 *               Url:
 *                 type: string
 *                 description: Link da imagem para ser enviada para o SKU.
 *                 example: "https://account.vtexassets.com/arquivos/ids/nome-da-imagem&width=800&height=1067&aspect=true"
 *     responses:
 *       200:
 *         description:  SKUs Files Created retrivied Sucessfully
 *       500:
 *         description:  Error to Create SKU file for SKUs
 *
 */
