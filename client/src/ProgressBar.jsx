import React from 'react'

export default function ProgressBar({steps, stepNumber, setStepNumber, }) {
      // move steps back
      const handleBack = () => {
        if(stepNumber === 0) return;
        setStepNumber(prev => prev-=1);
      }
    
      // move steps forward
      const handleForward = () => {
        if(stepNumber === 4) return;
        setStepNumber(prev => prev+=1);
      }
      
  return (
    <div className="flex w-full items-center justify-center gap-5 text-4xl text-green-500">
    <span className={`mt-2 text-2xl cursor-pointer hover:text-white ${!stepNumber && "invisible"}`} onClick={handleBack}>←</span>
    {steps.map((step, i) => {
      if(i === stepNumber) return (<span className="text-2xl translate-y-0.5">⬟</span>)
      else return (<span>⬠</span>)
    })}
    <span className={`mt-2 text-2xl cursor-pointer hover:text-white ${stepNumber === 4 && "invisible"}`} onClick={handleForward}>→</span>
  </div>
  )
}
