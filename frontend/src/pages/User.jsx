import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
    const token = localStorage.getItem("token");

    const [EmployeeData, setEmployeeData] = useState([]);
    const [Users, setUsers] = useState([]);

    const [UserData, setUserData] = useState({
        EmployeeID: "",
        Username: "",
        Password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:3001/auth/register",
                UserData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setError(res.data.message);

            getUser();

            setUserData({
                EmployeeID: "",
                Username: "",
                Password: ""
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message
            );
        }
    };

    const getUser = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3001/auth/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(res.data.results);

        } catch (err) {
            setError(err.message);
        }
    };

    const getEmployees = async () => {
        try {
            const res = await axios.get(
                "http://localhost:3001/employees",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEmployeeData(res.data.results);

        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getEmployees();
        getUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="grid md:grid-cols-3 gap-8">

                {/* Form */}

                <div className="bg-white shadow-lg rounded-xl p-6 h-fit">

                    <h1 className="text-2xl font-bold mb-6">
                        Create User
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>
                            <label className="block mb-2 font-medium">
                                Employee
                            </label>

                            <select
                                name="EmployeeID"
                                value={UserData.EmployeeID}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                <option value="">
                                    Select Employee
                                </option>

                                {EmployeeData.map((datas) => (
                                    <option
                                        key={datas.EmployeeID}
                                        value={datas.EmployeeID}
                                    >
                                        {datas.FirstName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Username
                            </label>

                            <input
                                type="text"
                                name="Username"
                                value={UserData.Username}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                placeholder="Enter username"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                name="Password"
                                value={UserData.Password}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                placeholder="Enter password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white rounded-lg p-3 hover:bg-green-700 transition"
                        >
                            Create User
                        </button>

                    </form>

                    {error && (
                        <p className="mt-4 text-red-500">
                            {error}
                        </p>
                    )}

                </div>

                {/* Table */}

                <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-6">

                    <h1 className="text-2xl font-bold mb-6">
                        Users
                    </h1>

                    <div className="overflow-x-auto">

                        <table className="w-full border-collapse">

                            <thead>

                                <tr className="bg-gray-100">

                                    <th className="p-3 text-left">
                                        Username
                                    </th>

                                    <th className="p-3 text-left">
                                        User ID
                                    </th>

                                    

                                </tr>

                            </thead>

                            <tbody>

                                {Users.length < 1 ? (

                                    <tr>

                                        <td
                                            colSpan="3"
                                            className="text-center p-4"
                                        >
                                            No users found
                                        </td>

                                    </tr>

                                ) : (

                                    Users.map((datas) => (

                                        <tr
                                            key={datas.UserID}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-3">
                                                {datas.Username}
                                            </td>

                                            <td className="p-3">
                                                {datas.UserID}
                                            </td>

                                           

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}