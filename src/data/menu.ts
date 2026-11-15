export type Product = {
  id: number;
  name: string;
  price: number;
};

export const menu: Product[] = [
  { id: 1, name: "Panino cotoletta", price: 3.5 },
  { id: 2, name: "Pizza", price: 2.5 },
  { id: 3, name: "Succo di frutta", price: 3.5 },
  { id: 4, name: "Acqua", price: 1 },
  { id: 5, name: "Cornetto", price: 1.5 },
];