/**
 * @swagger
 * /vtex/inventory/list-inventory-by-sku:
 *   get:
 *     tags: [Inventory]
 *     summary: Recupera as informações de estoque do SKU para cada Warehouse.
 *     description: getSkuFiles - Realiza um loop de requisições para a API List inventory by SKU com os Skus preenchidos na planilha listInventoryBySku, que de forma dinâmica são usados de parâmetros na URL. Os logs das requisições são gravados em duas planilhas "Skus Inventory" e "Not Retrieved Skus Inventory" | https://developers.vtex.com/docs/api-reference/logistics-api#get-/api/logistics/pvt/inventory/skus/-skuId-
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Inventory retrivied Sucessfully
 *       500:
 *         description:  Error to get Sku Inventory for SKUs
 *
 */
