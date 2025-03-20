
import TotalCostco from "../api/totalCostco/page";
import TotalMercado from "../api/totalMercado/page";

export default function MainHome() {
  return (
    <div >
      <h2>Main</h2>
      <TotalCostco />
      <TotalMercado />
    </div>
  );
}