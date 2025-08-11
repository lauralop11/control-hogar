import { BtnReturn, ContentFormCategory } from "@components";

export default function PageFormAdd() {
  return(
    <>
      <div className="absolute top-3 right-4">
        <BtnReturn/>
      </div>
      <section className="min-h-[60vh] max-w-[max-content] m-auto flex place-items-center">
        <article className="liquid p-5 max-h-[max-content]">
          <ContentFormCategory/>
        </article> 
      </section> 
    </> 
  ) 
}