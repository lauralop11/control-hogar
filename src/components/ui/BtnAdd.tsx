import Link from 'next/link';

export default function BtnAdd ({props} : {props?: {name?: string, link?: string}}) {

  return (
    <Link href={props?.link || "#"} className="button md:hover:scale-105 flex justify-center items-center">
      <span>{props?.name}</span>
    </Link>
  )
}