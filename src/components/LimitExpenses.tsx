interface Props {
  total: number;
  category: string;
}

export default function LimitExpenses ({ total, category }: Props) {
 return (
  <span className = 
  {`${category === "mercado" && total > 400 ? "text-red-600 font-bold" : category === "carro" && total > 150 ? "text-red-600 font-bold" : "text-green-600 font-bold"}`}>{total}
  </span>
 )

}