
function Suggestion({word}: any) {

    return (
        <div 
            className = "text-gray-700 text-sm cursor-pointer flex justify-start items-center pl-4 w-full h-8 border-b border-b-gray-300 border-opacity-50 bg-white transition-transform hover:bg-gray-50"> 
            {word} 
        </div>
    )

}

export default Suggestion
