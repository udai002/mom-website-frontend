import search from "../assets/search.png";
import { useState } from "react";
function Search({ onChange }) {
  
  return (
    <div className="flex bg-[#00A79B1A]  py-2 px-2 h-15 gap-2 justify-center items-center align-center border-2 border-[#00A79B] rounded-xl">
      <img src={search} className="w-5 h-5 " />
      <input
        name="search"
        type="text"
        onChange={onChange}
        placeholder="search..."
        className="outline-none bg-transparent"
      />
    </div>
  );
}

export default Search;
