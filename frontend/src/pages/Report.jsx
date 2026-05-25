import axios from "axios"
import { useState } from "react"

export default function Report() {
    const [data,setData]=useState([])
    const [error,setError]=useState("")
    const GetUsers=async()=>{
        try{
            const res= await axios.get()

        }catch(err){
            setError(err)
        }
    }
    return (
        <>
            <table className="border border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">UserID</th>
                    </tr>
                </thead>

                <tbody>

                    {data.length===0?
                    <tr>
                        <td>No data to display</td>
                    </tr>
                    :
                    data.map((datas) => (
                        <tr key={datas.id}>
                            <td className="border p-2">
                                {datas.name}
                            </td>

                            <td className="border p-2">
                                {datas.id}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}