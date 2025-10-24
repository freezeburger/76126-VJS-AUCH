
import type { ProductDTO } from "../dto/ProductDTO";
import type { ENDPOINTS } from "../types/pattern.type";
import { CrudAbstract } from "./crud.abstract";

class ProductService extends CrudAbstract<ProductDTO>{
    API:ENDPOINTS = '/products'
}

export const productService = new ProductService();
