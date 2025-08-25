
function filter({name,image}) {
  return (
    <div><button className='border-2 border-[#00A79B80] rounded-2xl p-2 flex gap-3 text-sm'>
       <p> {name}</p>
        <img src={image} className='h-5 w-5'/>
        </button></div>
  )
}

export default filter