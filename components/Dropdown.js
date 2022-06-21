import React, {useEffect, useState, useRef} from 'react'
const Dropdown=({options,selected, onSelectedChange})=>{
    const [open, setOpen]=useState(false)
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
            <div
                key={option.value}
                onClick={()=>onSelectedChange(option)}
            >
                {option.label}
            </div>
        )
    })

    return (
        <div ref={ref}>
            <div onClick={()=>{setOpen(!open)}} className={`ui selection dropdown ${open?'visible active':''}`}>
                <div>{selected.label}</div>
                <div className={`menu ${open? 'visible transition':''}`}>{renderedOptions}</div>
            </div>
        </div>
    )
}

export default Dropdown