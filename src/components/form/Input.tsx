interface Props {
  type: string,
  name: string,
  placeholder?: string,
  children: string,
}

export function Input ({type, name, placeholder, children}: Props) {
  return (
    <label className="input">
      <span className="label">{children} </span>
      <input type={type} placeholder={placeholder} name={name}/>
    </label>
  )
} 
