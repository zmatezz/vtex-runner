/**
 * @swagger
 * /vtex/get-product-specification-by-product-id:
 *   post:
 *     tags: [Product Specification]
 *     summary: Recupera todas as especificações de um produto pelo ID do produto..
 *     description: GetProductSpecificationsByProductID - Realiza um loop de requisições para a API Get product specifications by product ID com os Product IDs preenchidos na planilha getProductSpecificationsByProductID, que de forma dinâmica são usados de parâmetros na URL. https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog_system/pvt/products/-productId-/specification
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  Products IDs retrieved Successfully
 *       500:
 *         description:  Error to get Specifications for Products IDs
 *
 * /vtex/get-product-specification-and-their-information-by-product-id:
 *   post:
 *     tags: [Product Specification]
 *     summary: Com os skus fornecidos na Url, notifica o marketplace que algo mudou em um Sku, realizando uma carga.
 *     description: GetProductSpecificationsAndTheirInformationByProductID - Realiza um loop de requisições para a API Get product specifications and their information by product ID utilizando os Product IDs fornecidos na URL como parâmetros. https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/product/-productId-/specification
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  Products IDs retrieved Successfully
 *       500:
 *         description:  Error to get Specifications for Products IDs
 *
 */
