import React, {useState, useEffect, useRef} from 'react'

const Dropdown=({options,selected,onSelectedChange})=>{

    const [open,setOpen]=useState(false)
    const ref=useRef()

    useEffect(()=>{
        const onBodyClick=(event)=>{
            if(ref.current.contains(event.target)){
                return
            }
            setOpen(false)
        }
        document.body.addEventListener('click',onBodyClick)
        return ()=>{
            document.body.removeEventListener('click',onBodyClick)
        }
    },[])

    const renderedOptions=options.map(option=>{
        if(option.value===selected.value){
            return null
        }

        return (
            <div onClick={()=>onSelectedChange(option)}>
                {option.label}
            </div>
        )
    })
    return (
        <div ref={ref}>
            <div onClick={()=>setOpen(!open)}>{selected.label}</div>
            {renderedOptions}
        </div>
    )
}

export default Dropdown