import AddCategory from "@components/home/AddCategory";
import Graph from '@components/home/Graph';
import InfoList from '@components/home/InfoList';

export default function App() {
  const currentMonth = new Date().toLocaleString('en', { month: 'long' });
  return (
    <>
      <AddCategory/>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <h2 className="text-red-700 text-2xl font-extrabold m-3">{currentMonth}</h2>
        <Graph/>
        <InfoList/>
      </div>
    </>
  );
}
