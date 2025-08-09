export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number; // from 1 to 5
  comment: string;
  date: string;
  approved: boolean;
}
