
import GetGastos from "../api/getGastos/page";

export default function MainHome() {
  return (
    <div >
      <h2>Main</h2>
      <div className="text-expenses">
        <GetGastos/>
      </div>
        
    </div>
  );
}