export type Ritiro = "ricreazione" | "pranzo";
export type Pagamento = "contanti" | "carta";

export type Checkout = {
  nome: string;
  classe: string;
  ritiro: Ritiro;
  pagamento: Pagamento;
  note: string;
};