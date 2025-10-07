export interface ICreateProduct {
  productName: string;
  brandId: string;
  sku: string;
  description?: string;
  organizationId?: string;
  quantity: number;
  price: number;
}
