import Filter from '../assets/filter.png'
import Export from '../assets/export.png';
import Data from '../assets/date.png';
import Buttons from "./Buttons";

function Button() {
    const data = [
         {
        id: 1,
        name: "DD-MM-YY",
        image: Data
    },
       { id: 2,
        name: "More filters",
        image: Filter
    },
   
    {
        id: 3,
        name: "Export",
        image: Export
    }]

    return (
        <div className='flex gap-2 text-[#00A79B]'>
            {data.map((item, index) => (
                <div key={index}>
                    <Buttons name={item.name} image={item.image} />
                </div>
            ))}

        </div>
    )
}

export default Button