/**
 * @swagger
 * /vtex/sku-files/get-sku-files:
 *   post:
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
 */
