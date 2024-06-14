/**
 * @swagger
 * /vtex/category/update-category:
 *   put:
 *     tags: [Inventory]
 *     summary: Atualiza uma categoria existente.
 *     description: updateCategory - Realiza um loop de requisições para a API Update category com os IDs de categoria preenchidos na planilha updateCategory, que de forma dinâmica são usados de parâmetros na URL e no Body. Os logs das requisições são gravados em duas planilhas "Updated Categories" e "Categories not updated" | https://developers.vtex.com/docs/api-reference/catalog-api#put-/api/catalog/pvt/category/-categoryId-
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description:  Successful categories update
 *       500:
 *         description:  Error when updating categories
 *
 */
