import React, { useEffect, useState } from 'react'
import Table from "../Table"


function ContactUs() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/contactus/allcontact")
                const result = await response.json()
                console.log(result)
                setData(result.contacts)
            }
            catch (error) {
                console.log("error");

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const columns = [
        { id: "name", header: "User Name" },
        { id: "email", header: "Email ID" },
        { id: "supportType", header: "SupportType" },
        { id: "description", header: "Description" }
    ]
    return (

        <div className='mt-10 flex flex-col gap-5 '>
            <div>
                <h4 className='text-md '>Total <span>{data.length}</span> Responses</h4>
            </div>
            {loading ?
                (<p>loading...</p>) :
                (<Table data={data} columns={columns} />)
            }
        </div>
    )
}

export default ContactUs