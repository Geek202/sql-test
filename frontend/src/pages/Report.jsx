import axios from "axios"
import { useEffect, useState } from "react"


export default function Report() {
    const token = localStorage.getItem('token')
    const [Userdata, setUserData] = useState([])
    const [PostData, setPostData] = useState([])
    const [EmployeeData, setEmployeeData] = useState([])

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

            setUserData(res.data.results)

        } catch (err) {
            console.log(err)
            setError(err)
        }
    }
    const GetPosts = async () => {
        try {
            const res = await axios.get('http://localhost:3001/post', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setPostData(res.data.results)


        } catch (err) {
            setError(err.message || err)
        }
    }

    const GetEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:3001/employees', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setEmployeeData(res.data.results)
        } catch (err) {
            setError(err.message || err)
        }
    }
    useEffect(() => {
        GetUsers(),
        GetPosts(),
        GetEmployees()
    }, [])
    return (
        <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-4"><h1>Users</h1>
            <table className="border border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2"> Employee ID</th>
                    </tr>
                </thead>

                <tbody>
                    {Userdata.length < 1 ? (
                        <tr>
                            <td colSpan="2">No data to display</td>
                        </tr>
                    ) : (
                        Userdata.map((datas) => (
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

                </tbody></table>

        </div>
        <div className="bg-white shadow-md rounded-lg p-4"><h1>Posts</h1>
                <table className="border border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2">Post Id</th>
                            <th className="border p-2">Post Name</th>

                        </tr>
                    </thead>

                    <tbody>
                        {PostData.length < 1 ? (
                            <tr>
                                <td colSpan="2">No data to display</td>
                            </tr>
                        ) : (
                            PostData.map((datas) => (
                                <tr key={datas.postId}>
                                    <td className="border p-2">
                                        {datas.postId}
                                    </td>

                                    <td className="border p-2">
                                        {datas.postName}
                                    </td>


                                </tr>
                            ))
                        )}

                    </tbody>
                </table>

        </div>
        <div className="bg-white shadow-md rounded-lg p-4"><h1>Employees</h1>
                <table className="border border-separate">
                    <thead>
                        <tr>
                            <th className="border p-2">Employee ID</th>
                            <th className="border p-2">Post ID</th>
                            <th className="border p-2">Full Names</th>
                           
                            <th className="border p-2">Gender</th>
                            <th className="border p-2"> Date of Birth</th>
                            <th className="border p-2">Position</th>
                            <th className="border p-2">Department</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone Number</th>
                            <th className="border p-2">Address</th>
                            <th className="border p-2">Salary</th>
                            <th className="border p-2">Hire Date</th>
                            <th className="border p-2">Status</th>
                            
                            

                        </tr>
                    </thead>

                    <tbody>
                        {EmployeeData.length < 1 ? (
                            <tr>
                                <td colSpan="2">No data to display</td>
                            </tr>
                        ) : (
                            EmployeeData.map((datas) => (
                                <tr key={datas.postId}>
                                    <td className="border p-2">
                                        {datas.EmployeeID}
                                    </td>

                                    <td className="border p-2">
                                        {datas.PostID}
                                    </td>
                                    <td className="border p-2">
                                        {datas.FirstName +" "+ datas.LastName}
                                    </td>
                                    
                                    <td className="border p-2">
                                        {datas.Gender}
                                    </td>
                                    <td className="border p-2">
                                        {datas.DOB}
                                    </td>
                                    <td className="border p-2">
                                        {datas.Position}
                                    </td>
                                    <td className="border p-2">
                                        {datas.Department}
                                    </td>
                                    <td className="border p-2">
                                        {datas.Email}
                                    </td>
                                    <td className="border p-2">
                                        {datas.PhoneNumber}
                                    </td>
                                    <td className="border p-2">
                                        {datas.Address}
                                    </td>
                                    <td className="border p-2">
                                        frw {datas.Salary}
                                    </td>
                                    <td className="border p-2">
                                        {new Date(datas.HireDate).toDateString()}
                                    </td>
                                    <td className={ datas.Status==="Active"?("border p-2 text-green-500"):("border p-2 text-red-500")}>
                                        {datas.Status}
                                    </td>
                                    


                                </tr>
                            ))
                        )}

                    </tbody>
                </table>

        </div>
        


            <p>{error}</p>




        </div>
    )
}