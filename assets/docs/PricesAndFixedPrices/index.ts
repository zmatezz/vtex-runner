/**
 * @swagger
 * /vtex/prices-and-fixed-prices/get-price-by-sku-id:
 *   get:
 *     tags: [Prices and Fixed Prices]
 *     summary: Recupera todos dados de preços de acordo com um ID de SKU específico.
 *     description: Get Price By Sku ID - Realiza um loop de requisições para a API Get price by SKU ID com os Skus preenchidos na planilha getPriceBySkuId, que de forma dinâmica são usados de parâmetros na URL. Os logs das requisições são gravados em duas planilhas "Sku Prices retrivied" e "Sku Prices not retrivied" | https://developers.vtex.com/docs/api-reference/pricing-api#get-/pricing/prices/-itemId-
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Prices retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Prices for SKUs
 *
 * /vtex/prices-and-fixed-prices/get-fixed-prices:
 *   get:
 *     tags: [Prices and Fixed Prices]
 *     summary: Recupera o preço fixo do SKU para cada Trade Policy.
 *     description: Get Fixed Prices - Realiza um loop de requisições para a API Get fixed prices com os Skus preenchidos na planilha getPriceBySkuId, que de forma dinâmica são usados de parâmetros na URL. Os logs das requisições são gravados em duas planilhas "Sku Fixed Prices retrivied" e "Sku Fixed Prices not retrivied" | https://developers.vtex.com/docs/api-reference/pricing-api#get-/pricing/prices/-itemId-/fixed
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Fixed Prices retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Fixed Prices for SKUs
 *
 */
