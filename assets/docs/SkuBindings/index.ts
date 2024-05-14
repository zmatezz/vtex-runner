/**
 * @swagger
 * /vtex/sku-bindings/change-notification-with-sku-id:
 *   post:
 *     tags: [Sku Bindings]
 *     summary: Notifica o marketplace que algo mudou no Sku, realizando uma carga.
 *     description: changeNotificationWithSkuId - Realiza um loop de requisições para a API Change notification with SKU ID com os Skus preenchidos na planilha changeNotificationWithSkuId, que de forma dinâmica são usados de parâmetros na URL. https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog_system/pvt/skuseller/changenotification/-skuId-
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Notified Successfully
 *       500:
 *         description:  Error sending notifications
 *
 * /vtex/sku-bindings/change-notification-with-sku-id-from-url?sku=2674253,2655334,2655380,2655381&ms=1000:
 *   post:
 *     tags: [Sku Bindings]
 *     summary: Com os skus fornecidos na Url, notifica o marketplace que algo mudou em um Sku, realizando uma carga.
 *     description: changeNotificationWithSkuId - Realiza um loop de requisições para a API Change notification with SKU ID utilizando os SKUs fornecidos na URL como parâmetros. https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog_system/pvt/skuseller/changenotification/-skuId-
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  SKUs Notified Successfully
 *       500:
 *         description:  Error sending notifications
 *
 */
