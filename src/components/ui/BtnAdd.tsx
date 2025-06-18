import Link from 'next/link';

export default function BtnAdd ({props} : {props?: {name?: string, link?: string, color?: string}}) {

  return (
    <Link href={props?.link || "#"} className={`${props?.color} text-white text-sm h-20 w-[30%] md:hover:scale-105 rounded-md flex flex-col-reverse justify-center items-center`}>
      <span className="text-center">{props?.name}</span>
    </Link>
  )
}