import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RxCaretDown, RxCross2 } from 'react-icons/rx';


export type Option = {
    title: string
}

type Props = {
    options: Option[] | undefined,
    onChange?: (state: Option[]) => void   
}

function Select({options, onChange}: Props) {

    const [listOpen, setListOpen] = useState<boolean>(true)

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    const containerRef = useRef<HTMLDivElement>(null);
    


    const SelectOption = (opt: Option) => {

        if(selectedOptions.find(existing => existing.title === opt.title)){
            return;
        }

        setSelectedOptions([...selectedOptions, opt])

    }

    const DeselectOption = (opt: Option) => {

        setSelectedOptions(selectedOptions.filter(existing => existing.title != opt.title))

        

    }


    const availableOptions = useMemo(()=>options?.filter((opt) => !selectedOptions.includes(opt)),[selectedOptions])
    // const availableOptions = options?.filter((opt) => !selectedOptions.includes(opt))


    const toogleListOpen = () => {

        console.log("Tooglelistopen before condition")

        console.log("Tooglelistopen available options length ", availableOptions)


        if(availableOptions && availableOptions.length>0){
            console.log("Tooglelistopen")
            setListOpen(lo=> !lo)
        } 
            
    }


    useEffect(()=>{

        onChange?.(selectedOptions)
        
        if (availableOptions && availableOptions.length <=0) setListOpen(false)
        


    },[selectedOptions])
    

    //This bit is just to display the ability to add keyboard accessibility
    useEffect(()=>{

        const keydownHandler = (e: KeyboardEvent)=>{

            if(e.target !== containerRef.current) return;

            switch(e.code){
                case 'Space':
                    toogleListOpen();
            }
        }
        
        containerRef.current?.addEventListener("keydown", keydownHandler)

        return ()=>{
            
            containerRef.current?.removeEventListener("keydown", keydownHandler)

        }


    },[])


  return (
    <div className='relative h-full border-2 border-gray-200 focus:border-gray-200  outline-gray-200 rounded-md p-2' ref={containerRef} tabIndex={0} onBlur={()=>setListOpen(false)}>
        <div className='min-h-[50px] flex gap-2 items-center h-full justify-end'>
            <div className='flex flex-wrap gap-2 w-full'>
                {
                    selectedOptions?.map((opt,i) => 
                    {return(<button key={opt.title} className="selected-opt" onClick={()=>DeselectOption(opt)}>{opt.title} <RxCross2/></button>)})
                }
            </div>
            <div className='w-[2px] self-stretch bg-gray-300 rounded-full'></div>
            <div>
                <RxCaretDown className='w-[24px] h-[24px] text-gray-500 hover:text-gray-800 cursor-pointer' onClick={toogleListOpen}/>
            </div>
        </div>
        {listOpen && 
        <div className='absolute w-full left-0 top-[calc(100%+1rem)] border border-gray-200 rounded-md min-h-[32px]'>
            <ul>
                {
                    options && 
                    options.length > 0 ?
                    availableOptions?.map((opt,i) => 
                    {return(<li key={opt.title} className="w-full p-2 border-b border-gray-200 hover:bg-blue-200 cursor-pointer" onClick={()=>SelectOption(opt)}>{opt.title}</li>)}) : <></>
                }
            </ul>
        </div>}
    </div>
  )
}

export default Select