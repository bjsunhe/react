import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search=()=>{

    const [term,setTerm]=useState('programming')
    const [debouncedTerm, setDebouncedTerm]=useState(term)
    const [results,setResults]=useState([])

    useEffect(()=>{
        const timerId=setTimeout(()=>{
            setDebouncedTerm(term)
        },500)
        return ()=>{
            clearTimeout(timerId)
        }
    },[term])

    useEffect(()=>{
        const search=async ()=>{
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:debouncedTerm
                }
            })

            setResults(data.query.search)
        }
        search()
        
    },[debouncedTerm])

    const renderedResults=results.map(result=>{
        return (
            <div className="item" key={result.pageid}>
                <div className="content">
                    <div className="header">{result.title}</div>
                    <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                </div>
                <div className="right floated content">
                    <a className="ui button" href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                </div>
            </div>
        )
    })

    return (
        <div>
            <input className="input" value={term} onChange={(e)=>setTerm(e.target.value)}  />
            <div>{renderedResults}</div>
        </div>
        
    )
}

export default Search