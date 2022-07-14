import { useEffect, useState } from 'react'
import Suggestion from "./components/suggestion"


interface wordData {
    translation: string;
    similar_words: Array<any>;
}



function App() {
    let [search, setSearch] = useState("");
    let [suggestions, setSuggetions] = useState([]);
    let lastTime = 0 



    let fetch_suggestions = async () => {
        await fetch(`http://localhost:3300/search/${search}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(async (res) => {
            if (!res.ok) return []
            else return await res.json()
        })
        .then((data) => {
            setSuggetions(data)
        })
    }


    let fetchWordData = async (word: string, id: Number) => {
        await fetch(`http://localhost:3300/words/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/Json",
            },
        }) 
        .then((res) => {
            if (!res.ok) return null
            return res.json()
        })
        .then((data: wordData) => {
            if (data)
                document.getElementById("eng-translation")!.innerText = data.translation
                let similar_words_string: string = ""
                for(let w of data.similar_words) {
                    if (word != w)
                        similar_words_string += `${w}, `
                }
            document.getElementById("darija-word")!.innerText = word
            document.getElementById("similar-words")!.innerText = word == "" ? "..." : similar_words_string.slice(0,-2)
        })
    }
    

    useEffect(() => {
        if (search.length == 0)
            setSuggetions([])
        else
            fetch_suggestions()
    }, [search])

    
    return (
        <div className = "relative w-screen h-screen flex flex-col bg-gray-100">
            <div className = "flex justify-between items-center w-screen border-b border-b-gray-300 h-16 drop-shadow-sm bg-white">
                <div className = "ml-4 font-bold text-gray-600">DARIJA translator</div>
            </div>
            <div className="flex flex-col mx-auto container max-w-screen-sm font-bold h-screen w-screen z-40 mt-16">

                {/* search bar */}
                <div className = "relative w-full h-12">
                    <form className ="w-full h-full" id ="search_bar">
                        <input 
                            onChange={(e) => { setSearch(e.target.value) } } 
                            className="bg-gray-50 outline outline-1 outline-gray-300 text-slate-800 text-sm pl-4 mx-auto shadow-sm h-full w-full rounded-sm" 
                            type="text"
                            placeholder="search"
                        />

                        {/* suggestions bar */}
                        {suggestions.length != 0  && <div className = "absolute top-14 left-2 w-48 h-auto bg-gray-50 outline outline-1 outline-gray-300">
                            {suggestions.map( (s, index) => {
                                console.log(s[0], index)
                                return (

                                    <div
                                        key={index}
                                        className = "text-gray-700 text-sm cursor-pointer flex justify-start items-center pl-4 w-full h-8 border-b border-b-gray-300 border-opacity-50 bg-white transition-transform hover:bg-gray-50"
                                        onClick={(e: any) => {
                                            e.preventDefault()
                                            fetchWordData(s[0], s[1]) 
                                            setSuggetions([])
                                            let searchBar = document.getElementById("search_bar") as HTMLFormElement
                                            searchBar.reset()
                                            setSearch("")
                                        }}
                                    >
                                        {s[0]}
                                    </div>
                                    // <Suggestion
                                    //     onClick={(e: any) => console.log("test from the mapping function")}
                                    //     word={(s[0])}
                                    //     key={index}
                                    // />
                                )})}
                        </div>}
                    </form>
                </div>


                {/*  */}
                <div className = "flex flex-row w-full h-8 bg-gray-50 outline outline-1 outline-gray-300 ">
                    <div className = "px-4 text-center text-sm text-gray-500 pt-1 cursor-pointer"> darija </div>
                    <div className="flex-grow flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                        </svg>
                    </div>
                    <div className = "px-4 text-center text-sm text-gray-500 pt-1 cursor-pointer"> english </div>
                </div>

                {/*  */}
                <div className = "flex flex-row w-full h-28 bg-gray-50 outline outline-1 outline-gray-300 ">
                    <div 
                        id="darija-word" 
                        className="pl-10 pt-4 w-1/2 h-full border-r border-r-gray-300 text-2xl text-gray-500 font-bold uppercase"></div>
                    <div 
                        id="eng-translation" 
                        className="pl-10 pt-4 w-1/2 h-full text-2xl text-gray-500 font-bold uppercase"></div>
                </div>

                {/*  */}
                <div className = "flex flex-col w-full h-24 bg-gray-50 outline outline-1 outline-gray-300 ">
                    <div className="w-full mx-auto pl-4 pt-1 h-8 text-gray-400 text-sm bg-gray-50 border-b border-b-gray-200"> similar words</div>
                    <div 
                        id = "similar-words"
                        className="pl-8 pt-1 w-full h-fullpl-10 text-gray-500 text-lg font-bold bg-gray-50"></div>
                </div>
            </div>
        </div>
    )
}
export default App
