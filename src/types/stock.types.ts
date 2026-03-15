export interface StockItem {
  id: string;
  product_id: string;
  quantity: number;
  updated_at: string;
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string | null;
  };
}

export interface StockStats {
  totalStock: number;
  outOfStock: number;
  lowStock: number;
}

export interface StockMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StockResponse {
  stock: StockItem[];
  stats: StockStats;
  meta: StockMeta;
}

export interface UpdateStockPayload {
  quantity: number;
}
