import { AddCategory, Graph, InfoList } from "@components";

export default function App() {
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  return (
    <>
      <AddCategory/>
      <div className=" flex flex-col items-center justify-between w-full h-full">
        <h2 className="my-4 text-white text-2xl font-bold">{currentMonth}</h2>
        <Graph/>
        <InfoList/>
      </div>
    </>
  );
}
