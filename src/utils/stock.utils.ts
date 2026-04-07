/**
 * Low stock threshold: 20% of total stock, floored to at least 1.
 * e.g. stock=100 → low if <=20, stock=10 → low if <=2, stock=3 → low if <=1
 */
export const getLowStockThreshold = (stock: number): number =>
  Math.max(1, Math.floor(stock * 0.2));

export const getStockColorClass = (
  outOfStock: boolean,
  atCapacity: boolean,
  lowStock: boolean,
): string => {
  if (outOfStock || atCapacity) return "text-red-400";
  if (lowStock) return "text-amber-500";
  return "text-emerald-500";
};

export const getStockLabel = (
  outOfStock: boolean,
  atCapacity: boolean,
  lowStock: boolean,
  stock: number,
  cartQty: number = 0,
): string => {
  if (outOfStock || atCapacity) return "Out of stock";
  if (stock === 0) return "Out of stock";
  const remaining = stock - cartQty;
  if (remaining <= 0) return "Out of stock";
  if (lowStock) return `Only ${remaining} left`;
  return `${remaining} in stock`;
};

export const getCartButtonLabel = (
  outOfStock: boolean,
  atCapacity: boolean,
  overStock: boolean,
): string => {
  if (outOfStock || atCapacity) return "Out of Stock";
  if (overStock) return "Not Enough Stock";
  return "Add to Cart";
};
