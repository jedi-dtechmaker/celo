export const ORDER_STATUSES = [
  'pending',
  'negotiating',
  'accepted',
  'escrow_funded',
  'preparing',
  'shipped',
  'delivered',
  'completed',
  'cancelled',
  'disputed',
  'refunded',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];
