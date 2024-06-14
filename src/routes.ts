import { Router } from "express";

import PriceAndFixedPricesControllers from "./controllers/vtex/PriceAndFixedPricesControllers";
import SkuFilesControllers from "./controllers/vtex/SkuFileControllers";
import SkuBindingsControllers from "./controllers/vtex/SkuBindingsControllers";
import SpecificationValueControllers from "./controllers/vtex/SpecificationValueControllers";
import SkuSpecificationsControllers from "./controllers/vtex/SkuSpecificationsControllers";
import ProductSpecification from "./controllers/vtex/ProductSpecificationControllers";
import Inventory from "./controllers/vtex/InventoryControllers";
import Category from "./controllers/vtex/CategoryControllers";

const router = Router();

//Rotas para Category
router.get("/vtex/category/get-category-by-id", Category.getCategoryById);
router.put("/vtex/category/update-category", Category.updateCategory);

//Rotas para Inventory
router.get(
  "/vtex/inventory/list-inventory-by-sku",
  Inventory.listInventoryBySku
);

//Rotas para Products Specification
router.get(
  "/vtex/get-product-specification-by-product-id",
  ProductSpecification.getProductSpecificationsByProductID
);
router.get(
  "/vtex/get-product-specification-and-their-information-by-product-id",
  ProductSpecification.getProductSpecificationsAndTheirInformationByProductID
);

// Rotas para Prices and Fixed Prices
router.get(
  "/vtex/prices-and-fixed-prices/get-price-by-sku-id",
  PriceAndFixedPricesControllers.getPriceBySkuId
);
router.get(
  "/vtex/prices-and-fixed-prices/get-fixed-prices",
  PriceAndFixedPricesControllers.getFixedPrices
);

// Rotas para SKU Files
router.get("/vtex/sku-files/get-sku-images", SkuFilesControllers.getSkuImages);
router.get("/vtex/sku-files/get-sku-images-from-url", SkuFilesControllers.getSkuImagesFromURL);
router.get("/vtex/sku-files/get-sku-files", SkuFilesControllers.getSkuFiles);
router.post(
  "/vtex/sku-files/create-sku-files",
  SkuFilesControllers.createSkuFiles
);

// Rotas para SKU Bindings
router.post(
  "/vtex/sku-bindings/change-notification-with-sku-id",
  SkuBindingsControllers.changeNotificationWithSkuId
);
router.post(
  "/vtex/sku-bindings/change-notification-with-sku-id-from-url",
  SkuBindingsControllers.changeNotificationWithSkuIdFromURL
);

// Rotas para Specification Values
router.post(
  "/vtex/specification-value/create-specification-value",
  SpecificationValueControllers.createSpecificationsValues
);

// Rotas para Sku Specification
router.get(
  "/vtex/sku-specification/get-sku-specifications",
  SkuSpecificationsControllers.getSkuSpecifications
);
router.post(
  "/vtex/sku-specification/associate-sku-specifications",
  SkuSpecificationsControllers.associateSkuSpecifications
);
router.put(
  "/vtex/sku-specification/update-sku-specifications",
  SkuSpecificationsControllers.updateSkuSpecifications
);
router.post(
  "/vtex/sku-specification/auto-associate-sku-specifications",
  SkuSpecificationsControllers.autoAssociateSkuSpecifications
);

export { router };
