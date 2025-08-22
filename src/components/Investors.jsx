import React, { useEffect, useState } from 'react'
import Table from './Table'
import { header } from 'framer-motion/client'
import View from '../assets/Investors/View.png'
import Mail from '../assets/Investors/Mail.png'

const Investors = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showData, setShowData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const InvestorsData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/invest/investors")
                console.log("data is not fetching", response)
                const result = await response.json();
                console.log("data is not fetching", result)
                setData(result.investors);
            } catch (error) {
                console.log("data not fetching", error)
            } finally {
                setLoading(false)
            }
        };
        InvestorsData();
    }, [])


    const columns = [
        { id: 'name', header: 'Investor Name' },
        { id: 'mobile', header: 'Mobile Number' },
        { id: 'state', header: 'State & City' },
        { id: 'email', header: 'Email Id' },
        {
            id: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-3 ">
                    <button className="w-10 h-10" onClick={() => alert(`View ${row.name}`)}>
                        <img src={View} />
                    </button>
                    <a href={`mailto:${row.email}`} className="w-8 h-8 block" title={`Email ${row.name}`}>
                        <img src={Mail} alt="Mail" />
                    </a>
                </div>
            ),
        },
    ]


    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table data={data} columns={columns} />
            )}

            {showModal && showImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <img
              src={showImage}
              alt="Prescription"
              className="max-h-[80vh] w-auto mx-auto"
            />
                    </div>
                </div>
            )
        }
    </div>
    )}

export default Investors
