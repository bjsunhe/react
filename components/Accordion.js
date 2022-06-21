import React, {useState} from 'react'

const Accordion=({items})=>{
    const [activeIndex,setActiveIndex]=useState(null)

    const onTitleClick=(index)=>setActiveIndex(index)
    const renderedItems=items.map((item,index)=>{
        index===activeIndex?'active':''
        
        return (
            <React.Fragment key={item.title}>
                    <h1 className={`title ${active}`} onClick={()=>onTitleClick(index)}>{item.title}</h1>
                    <p className={`content ${active}`}>{item.content}</p>

            </React.Fragment>
        )
    })
    return (
        <div>
            {renderedItems}
        </div>
    )
}

export default Accordion