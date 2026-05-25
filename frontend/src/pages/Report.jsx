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
    <div className="min-h-screen bg-gray-100 p-8">

    

        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
                Reports Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
                Users, Posts and Employees Overview
            </p>
        </div>

        

        <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-lg">Users</h2>
                <p className="text-3xl font-bold mt-2">
                    {Userdata.length}
                </p>
            </div>

            <div className="bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-lg">Posts</h2>
                <p className="text-3xl font-bold mt-2">
                    {PostData.length}
                </p>
            </div>

            <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                <h2 className="text-lg">Employees</h2>
                <p className="text-3xl font-bold mt-2">
                    {EmployeeData.length}
                </p>
            </div>

        </div>

        

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
                Users
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Username
                            </th>

                            <th className="p-4 text-left">
                                User ID
                            </th>

                            <th className="p-4 text-left">
                                Employee ID
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {Userdata.length < 1 ? (

                            <tr>
                                <td
                                    colSpan="3"
                                    className="p-4 text-center"
                                >
                                    No users found
                                </td>
                            </tr>

                        ) : (

                            Userdata.map((datas) => (

                                <tr
                                    key={datas.UserID}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {datas.Username}
                                    </td>

                                    <td className="p-4">
                                        {datas.UserID}
                                    </td>

                                    <td className="p-4">
                                        {datas.EmployeeId}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

        

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
                Posts
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Post ID
                            </th>

                            <th className="p-4 text-left">
                                Post Name
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {PostData.length < 1 ? (

                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center p-4"
                                >
                                    No posts found
                                </td>
                            </tr>

                        ) : (

                            PostData.map((datas) => (

                                <tr
                                    key={datas.postId}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="p-4">
                                        {datas.postId}
                                    </td>

                                    <td className="p-4">
                                        {datas.postName}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

        

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
                Employees
            </h2>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="bg-gray-100 text-sm">

                            <th className="p-3">
                                Employee ID
                            </th>

                            <th className="p-3">
                                Post ID
                            </th>

                            <th className="p-3">
                                Full Name
                            </th>

                            <th className="p-3">
                                Gender
                            </th>

                            <th className="p-3">
                                DOB
                            </th>

                            <th className="p-3">
                                Position
                            </th>

                            <th className="p-3">
                                Department
                            </th>

                            <th className="p-3">
                                Email
                            </th>

                            <th className="p-3">
                                Phone
                            </th>

                            <th className="p-3">
                                Address
                            </th>

                            <th className="p-3">
                                Salary
                            </th>

                            <th className="p-3">
                                Hire Date
                            </th>

                            <th className="p-3">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {EmployeeData.map((datas) => (

                            <tr
                                key={datas.EmployeeID}
                                className="border-b hover:bg-gray-50 text-sm"
                            >

                                <td className="p-3">
                                    {datas.EmployeeID}
                                </td>

                                <td className="p-3">
                                    {datas.PostID}
                                </td>

                                <td className="p-3 font-medium">
                                    {datas.FirstName}
                                    {" "}
                                    {datas.LastName}
                                </td>

                                <td className="p-3">
                                    {datas.Gender}
                                </td>

                                <td className="p-3">
                                    {datas.DOB}
                                </td>

                                <td className="p-3">
                                    {datas.Position}
                                </td>

                                <td className="p-3">
                                    {datas.Department}
                                </td>

                                <td className="p-3">
                                    {datas.Email}
                                </td>

                                <td className="p-3">
                                    {datas.PhoneNumber}
                                </td>

                                <td className="p-3">
                                    {datas.Address}
                                </td>

                                <td className="p-3 font-semibold text-green-600">
                                    FRW {datas.Salary}
                                </td>

                                <td className="p-3">
                                    {
                                        new Date(
                                            datas.HireDate
                                        ).toDateString()
                                    }
                                </td>

                                <td className="p-3">

                                    <span
                                        className={
                                            datas.Status ===
                                            "Active"

                                            ?

                                            "px-3 py-1 rounded-full bg-green-100 text-green-700"

                                            :

                                            "px-3 py-1 rounded-full bg-red-100 text-red-700"
                                        }
                                    >
                                        {datas.Status}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

        {error && (

            <div className="mt-6 bg-red-100 text-red-600 p-4 rounded-lg">
                {error}
            </div>

        )}

    </div>
)
}