import React, { useEffect, useState } from "react";
import Table from "../Table";
import Delete from "../../assets/Employee/Delete.png";
import email from "../../assets/email.png";
import Modal from "./Modal";
import ExportPDF from "../pdf";
import Search from "../Search";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import apiClient from "../../utils/apliClent";

function ContactUs() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);


    const [filterDate, setFilterDate] = useState("");
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await apiClient(`contactus/allcontact?search=${search}&page=${page}&limit=${limit}` );
                console.log(result);
                setData(result.contacts);
                setOriginalData(result.contacts);
                setTotalPages(Math.ceil(result.total / limit));
                setTotalResponses(result.total);
            } catch (error) {
                console.log("error");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [search, page, limit])



    const handleDelete = async (id) => {
        try {
            const contact = await apiClient(`contactus/delete/${id}`, {
                method: 'DELETE',
            });
            if (contact) {
                alert("are you sure")
                console.log('Item deleted successfully');
            } else {
                console.error('Failed to delete the details.');
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };

    const columns = [
        { id: "name", header: "User Name" },
        { id: "email", header: "Email ID" },
        { id: "supportType", header: "SupportType" },
        {
            id: "description", header: "Description",
            cell: (row) => (
                <div className=" flex w-60 m-auto justify-center items-center text-center">
                    {row.description}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2 px-1">
                    <button onClick={() => handleDelete(row._id)}>
                        <img src={Delete} className="w-6 h-6 block" />
                    </button>
                    <div>
                        <a href={`mailto:${row.email}`} className="w-6 h-6 block mt-1"><img src={email} alt="email" className='w-6 h-6' /></a>
                    </div>

                </div>
            ),
        }
    ]


    useEffect(() => {
        if (!filterDate) {
            setData(originalData);
            return;
        }
        const filtered = originalData.filter((item) => {
            if (!item.createdAt) return false;
            const created = new Date(item.createdAt);
            const selected = new Date(filterDate);
            return (
                created.getFullYear() === selected.getFullYear() &&
                created.getMonth() === selected.getMonth() &&
                created.getDate() === selected.getDate()
            );
        });
        setData(filtered);
    }, [filterDate, originalData]);


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
            <div className="flex flex-row px-5 justify-between items-center">
                <div>
                    <h2 className="text-lg">User Response</h2>
                </div>
                <div className="flex flex-row gap-3">
                    <Search onChange={handleOnChange} />

                    <div className="flex ">
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="border-2 border-[#00A79B80] rounded-2xl p-2 flex gap-3 text-sm  text-[#00A79B]"
                        />
                    </div>
                    <ExportPDF elementId="users" fileName="Users.pdf" />
                    <button
                        onClick={() => setShowModal(true)}
                        className="font-200  bg-[#00A79B] text-[#fff] border-2 rounded-xl border-[#00A79B] py-2 px-3 "
                    >
                        Early Access Responses
                    </button>
                    {showModal && <Modal onClose={() => setShowModal(false)} />}
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-5 px-5 ">
                <div className="flex justify-between">
                    <h4 className="text-md ">
                        Total <span>{data.length}</span> Responses
                    </h4>
                    <p>No filters applied</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="font-200 flex gap-2 bg-[white] text-[#e71818] border-2 rounded-xl border-[#e71818] py-2 px-3 "
                    >
                        Delete Selections
                        <img src={Delete} alt="delete" className="w-5 h-5" />
                    </button>
                </div>
                {loading ? (
                    <p>loading...</p>
                ) : (
                    <>
                        <Table data={data} columns={columns} />
                        <div className="flex justify-center items-center mt-10 gap-4 px-7 mb-5 flex-row">
                            <span className="text-lg flex-1 text-[#444444] font-medium sm:text-base md:text-lg sm:text-left">
                                {" "}
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrevious}
                                    disabled={page === 1}
                                    className={`p-2 bg-[#00a99d] rounded-full ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <FaArrowLeftLong className="text-2xl text-white" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={page === totalPages}
                                    className={`p-2 bg-[#00a99d] rounded-full ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    <FaArrowRightLong className="text-2xl text-white" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ContactUs;
