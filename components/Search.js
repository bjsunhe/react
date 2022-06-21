import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Search=()=>{
    const [term, setTerm]=useState('programming')
    const [debouncedTerm,setDebouncedTerm]=useState(term)
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
            const {data}=await axios.get('https://en.wikipedia.org/w/api.php',{
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
            <div key={result.pageid}>

            </div>
        )
    })
    return (
        <div>
            <input onChange={e=>setTerm(e.target.value)} />
            {renderedResults}
        </div>
    )
}

export default Search