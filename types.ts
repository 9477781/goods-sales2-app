export enum ProductStatus {
  SoldOut = 'SOLD OUT',
  InStock = '販売中',
  BeforeSale = '販売前',
}

export interface Store {
  name: string;
  status: {
    [productName: string]: ProductStatus;
  };
}

export interface InventoryData {
  products: string[];
  stores: Store[];
  lastUpdated: string;
  backUrl?: string;
}