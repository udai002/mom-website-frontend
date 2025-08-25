import React, { useEffect, useState } from 'react'
import Table from './Table'
import { header } from 'framer-motion/client'
import View from '../assets/Investors/View.png'
import Mail from '../assets/Investors/Mail.png'
import Search from './Search'
import ExportPDF from './pdf'
import Button from './filter'
import filter from './Buttons'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Investors = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showData, setShowData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("")
     const [page, setPage] = useState(1);
    const [limit] = useState(10); 
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        async function fetchInvestion() {
            try {
                const response = await fetch(`http://localhost:3000/api/invest/investors?search=${search}&page=${page}&limit=${limit}`)
                console.log("data is not fetching", response)
                const result = await response.json();
                console.log("data is not fetching", result)
                setData(result.investors);
                setTotalPages(Math.ceil(result.total / limit));
                setTotalResponses(result.total);

            } catch (error) {
                console.log("data not fetching", error)
            } finally {
                setLoading(false)
            }
        }

        fetchInvestion();
    }, [search,  page, limit])

    const columns = [
        { id: 'name', header: 'Investor Name' },
        { id: 'mobile', header: 'Mobile Number' },
        { id: 'state', header: 'State & City' },
        { id: 'email', header: 'Email Id' },
        {
            id: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-3 items-center justify-center ">
                    <button className="w-10 h-10" onClick={() => {
                        if (row.background) {
                            setShowData(row.background);
                            setShowModal(true);
                        }
                    }}>
                        <img src={View} alt="View" />
                    </button>
                    <a href={`mailto:${row.email}`} className="w-8 h-8 block mt-1" title={`Email ${row.name}`}>
                        <img src={Mail} alt="Mail" />
                    </a>
                </div>
            ),
        },
    ]


    function handleOnChange(e) {
        setSearch(e.target.value);
        setPage(1); 
    }
    
        const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };  


    return (
        <div>
            <div className="flex justify-between p-4 items-center flex-wrap">
                <p className='text-2xl font-medium '>Investors Response </p>
                <div className='flex gap-3 mt-2 items-center flex-wrap'>
                    <Search onChange={handleOnChange} />
                    <filter />
                    <Button />
                    {/* <ExportPDF elementId="invest" fileName="investors.pdf" /> */}
                </div>
            </div>
            <p className='text-xl px-4 text-gray-600 mb-4 '>Total <span className='text-black'>{data.length}</span> responses</p>

            <div id="invest">
                {loading ? (
                    <p>Loading...</p>
                ) : (

                     <>
                        <Table data={data} columns={columns} />
                        <div className="flex justify-center items-center mt-10 gap-4 flex-row">
                            <span className="text-lg flex-1 text-[#444444] font-medium sm:text-base md:text-lg sm:text-left"> Page {page} of {totalPages}</span>
                            <div className="flex gap-2">
                                <button onClick={handlePrevious} disabled={page === 1} className={`p-2 bg-[#00a99d] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`} >
                                    <FaArrowLeftLong className="text-2xl text-white" />
                                </button>
                                <button onClick={handleNext} disabled={page === totalPages} className={`p-2 bg-[#00a99d] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`} >
                                    <FaArrowRightLong className="text-2xl text-white" />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {showModal && showData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
                            <button
                                className="absolute top-2 right-2 text-gray-600 text-xl"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>

                            <p className="mt-4"><strong>{showData}</strong></p>
                            <p className="text-gray-700">{showData.description || "No description provided."}</p>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default Investors
