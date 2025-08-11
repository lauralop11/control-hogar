import { ContentFormCard, BtnReturn} from "@components/index";

export default function pageAddCard() {
  return (
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <section className="min-h-[60vh] max-w-[max-content] m-auto flex place-items-center">
        <article className="liquid p-5 max-h-[max-content]">
          <ContentFormCard/>
        </article> 
      </section> 
    </>
  );
}
