import search from "../assets/search.png"

function Search() {
    return (
        <div className="flex bg-[#00A79B1A]  py-2 w-[20%] h-15 gap-2 justify-center items-center align-center border-2 border-[#00A79B] rounded-xl">
            <img src={search} className="w-5 h-5 "/>
            <input name="search" type="text" placeholder="search..." className="outline-none bg-transparent" />
        </div>
    )
}

export default Search