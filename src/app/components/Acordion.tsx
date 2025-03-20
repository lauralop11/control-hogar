import React from 'react';

type AcordeonProps = {
 
  Component1: React.ElementType;
  Component2: React.ElementType;
}

export default function Acordeon({Component1, Component2}: AcordeonProps) {
  return(
    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title font-semibold">
        <Component1 />
      </div> 
      <div className="collapse-content text-sm font-light">
        <Component2/>
      </div> 
    </div>
)
 }