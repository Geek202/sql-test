import { useState } from "react";
import EmployeePage from "./employeeAdmin";
import { useNavigate } from "react-router-dom";
import Users from "./User";
import Report from "./Report";


function Dashboard() {
    const navigate = useNavigate()
    const [SwitchPage,SetSwitchPage]=useState("Users")
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/')
    }

const renderPage=()=>{
    switch(SwitchPage){
        case "Employees":
            return <EmployeePage />
        case "Users":
            return <Users/>
        case "Report":
            return <Report/>
    } 
}
    
    const token = localStorage.getItem('token')
    if (!token) { navigate('/') }
    else {
        return (
            <div className="flex flex-col">
            <div className="bg-white shadow-md border-b w-full h-16 flex items-center justify-between px-6">

    
    <div className="flex gap-4">
        <button
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition"
            onClick={() => SetSwitchPage("Employees")}
        >
            Employees
        </button>

        <button
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition"
            onClick={() => SetSwitchPage("Users")}
        >
            Users
        </button>

        <button
            className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 transition"
            onClick={() => SetSwitchPage("Report")}
        >
            Reports
        </button>
    </div>

    
    <button
        className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        onClick={handleLogout}
    >
        Logout
    </button>

</div>
            <div>
                {renderPage()}
            </div>
            
            </div>
            
        )
    }

}
export default Dashboard