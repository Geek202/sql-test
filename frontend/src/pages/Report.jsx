import axios from "axios"
import { useEffect, useState } from "react"


export default function Report() {
    const token = localStorage.getItem('token')
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const GetUsers = async () => {
        try {
            const res = await axios.get('http://localhost:3001/auth/users',
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            
            setData(res.data.results)

        } catch (err) {
            console.log(err)
            setError(err)
        }
    }
    useEffect(() => {
        GetUsers()
    }, [])
    return (
        <><div cla><h1>Users</h1>
        <table className="border border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2"> Employee ID</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length < 1 ? (
                        <tr>
                            <td colSpan="2">No data to display</td>
                        </tr>
                    ) : (
                        data.map((datas) => (
                            <tr key={datas.UserID}>
                                <td className="border p-2">
                                    {datas.Username}
                                </td>

                                <td className="border p-2">
                                    {datas.UserID}
                                </td>
                                <td className="border p-2">
                                    {datas.EmployeeId} 

                                </td>

                            </tr>
                        ))
                    )}
                    
                </tbody>
            </table>
            
        </div>
            
                <p>{error}</p>
            
        </>
    )
}