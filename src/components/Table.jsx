// import React, { useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component'
// import { FaRegEdit } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
// import { IoMdSearch } from "react-icons/io";
// export default function Table() {

//     const columns=[
//         {
//             name:'Job Name',
//             selector:row=>row.JobName
//         },
//         {
//             name:'Job ID',
//             selector:row=>row.JobId
//         },
//         {
//             name:"Creation Date",
//             selector:row=>row.CreateDate

//         },

//         {
//             name:"Expiry Date",
//             selector:row=>row.ExpDate
//         },
//          {
//             name:"Job Location",
//             selector:row=>row.Location
//         },
//           {
//             name:"Job Type",
//             selector:row=>row.Age
//         },
//          {
//             name:"Action",
//             selector:row=>row.Action
//         },


//     ];

  


//     const data=[
//         {
//             JobName:"Full stack Developer",
//             JobId:23380,
//             CreateDate:"adarshjanjirala@gmil.com",
//             ExpDate:"12-04-2024",
//             Location:"Hyderabad",
//             Age:'23',
//             Action:""

//         },
         

//     ]

//     const [records , setRecords]=useState(data)

//     function handleFilter(event)
//     {
//         const newData=records.filter(row=>{
//             return row.name.toLowerCase().includes(event.target.toLowerCase())
//         }
//         )
//         setRecords(newData)
//     }

//   return (
//     // 
    
//     <div className="max-w-[95%] mx-auto p-6 border border-teal-1000 rounded-xl shadow-lg" style={{ marginTop: 40 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
//         <h2 className="text-2xl ">Manage Jobs</h2>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//          <IoMdSearch  style={{width:'25px',height:'25px'}}/>
//           <input
//             type="text"
//             value={records}
//             onChange={handleFilter}
//             placeholder="Search..."
//             style={{
//               backgroundColor: 'white',
//               opacity: 0.9,
//               borderWidth: 2,
//               borderRadius: 10,
//               padding: '5px 10px',
//               minWidth: '250px',
//             }}
            
//           />
        
//         </div>
//       </div>

//       <div className="bg-white rounded-lg p-4 shadow-inner">
//         <DataTable
//           columns={columns}
//           data={data}
//           pagination
//           highlightOnHover
//           selectableRows
          
//           customStyles={{
//             headRow: {
//               style: {
//                 // backgroundColor: '#00A99D',
//                 color: 'black',
//                 fontSize: '16px',
//               },
//             },
//             rows: {
//               style: {
//                 // backgroundColor: '#D2ECE9',
//                 // borderRadius: '15px',
//                 marginBottom: '20px',
//                 fontWeight: 500,
//                 fontSize: '15px',
//                 borderColor:'pink'
//               },
//             },
//             cells: {
//               style: {
//                 padding: '12px',
//                 // justifyContent: 'center',
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   )
// }


// // const Table = ({ data, columns, emptyMessage = "No data available." }) => {
// //     if (!data || data.length === 0) {
// //         return <p>{emptyMessage}</p>;
// //     }

// //     return (
// //         <div className='flex w-full justify-center align-center'>
// //             <table className='w-[80%] border-collapse'>
// //                 <thead>
// //                     <tr className=''>

// //                         {columns?.map((col) => (
// //                             <th className='px-4 py-1 border-b border-[#00A79B80] text-[#444444] bg-[#00A79B1A]' key={col.id}>{col.header}</th>
// //                         ))}
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {data?.map((row, rowIndex) => (

// //                         <tr key={rowIndex}>
             
// //                             {columns?.map((col) => (
                                
// //                                 <td className='px-4 text-center py-2 border-b border-[#00A79B80]' key={`${rowIndex}-${col.id}`}>
// //                                     {col.cell ? col.cell(row) : row[col.id]}
// //                                 </td>
// //                             ))}
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default Table;


const Table = ({ data, columns, emptyMessage = "No data available." }) => {
    if (!data || data.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <div className='flex w-full justify-center align-center'>
            <table className='w-[80%] border-collapse'>
                <thead>
                    <tr className=''>

                        {columns?.map((col) => (
                            <th className='px-4 py-1 border-b border-[#00A79B80] text-[#444444] bg-[#00A79B1A]' key={col.id}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, rowIndex) => (

                        <tr key={rowIndex}>
             
                            {columns?.map((col) => (
                                
                                <td className='px-4 text-center py-2 border-b border-[#00A79B80]' key={`${rowIndex}-${col.id}`}>
                                    {col.cell ? col.cell(row) : row[col.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;