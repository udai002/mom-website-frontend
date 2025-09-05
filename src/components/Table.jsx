const Table = ({ data, columns, emptyMessage = "No data available." }) => {
    if (!data || data.length === 0) {
        return <p>{emptyMessage}</p>;
    }
    

    return (
        <div className=" w-full justify-center align-center overflow-y-auto h-[70vh] pt-4">
                
        <div className='flex w-full justify-center align-center'>
            
            <table className='w-[100%] border-collapse overflow-auto sticky'>
                <thead> 
                    <tr className=''>

                        {columns.map((col) => (
                            <th className='px-4 py-1 border-b border-[#00A79B80] text-[#444444] bg-[#00A79B1A]' key={col.id}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (

                        <tr key={rowIndex}>
             
                            {columns.map((col) => (
                                
                                <td className='px-4 text-center py-2 border-b border-[#00A79B80]' key={`${rowIndex}-${col.id}`}>
                                    {col.cell ? col.cell(row) : row[col.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Table;