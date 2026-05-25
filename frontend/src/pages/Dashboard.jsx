import { useState } from "react";
import EmployeePage from "./employeeAdmin";
import { useNavigate } from "react-router-dom";
import Users from "./User";
import Report from "./Report";


function Dashboard() {
    const [SwitchPage,SetSwitchPage]=useState("Employees")


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
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    if (!token) { navigate('/') }
    else {
        return (
            <div className="flex flex-col">
            <div className=" bg-blue-300 flex w-full gap-10 h-20 justify-center items-center">
            <button className="bg-black hover:bg-gray-900 transition-colors ease-in-out text-white rounded min-w-30 h-10" onClick={()=>{SetSwitchPage("Employees")}}>Employees</button>
            <button className="bg-black hover:bg-gray-900 transition-colors ease-in-out text-white rounded min-w-30 h-10" onClick={()=>{SetSwitchPage("Users")}}>Users</button>
            <button className="bg-black hover:bg-gray-900 transition-colors ease-in-out text-white rounded min-w-30 h-10" onClick={()=>{SetSwitchPage("Report")}}>Reports</button>
            <button className="bg-red-500 hover:bg-red-900 transition-colors ease-in-out text-black rounded min-w-30 h-10">Logout</button>
            
            
        </div>
            <div>
                {renderPage()}
            </div>
            
            </div>
            
        )
    }

}
export default Dashboard