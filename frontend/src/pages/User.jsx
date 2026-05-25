import axios from "axios"
import { useEffect, useState } from "react"

export default function Users() {
    const token = localStorage.getItem('token')
    const [EmployeeData, setEmployeeData] = useState([])
    const[UserData,setUserData]=us
    const [error, setError] = useState("")

    const getEmployees = async() => {
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
    useEffect(()=>{
        getEmployees()
    },[])
    return (
        <>
            <div className="border w-full">
                <h1>Create New User</h1>
                <form action="" className="flex flex-col items-center">
                    <div className="flex"><span>Employee: </span>
                    <select name="" id=""> 
                        {EmployeeData.map((datas)=>(
                            <option value={datas.EmployeeID}>{datas.FirstName}</option>

                        ))}
                    </select></div>
                    <div>
                        <span>Username:</span>
                    <input type="text"  className="border"/>
                    </div>
                    
                    <div><span>Password:</span>
                    <input type="password" className="border"/></div>
                    <input type="submit" value="Create" className="border rounded w-30 bg-green-500" />

                </form>
            </div>
            <div>
                <table>
                    <thead>
                        
                    </thead>
                </table>
            </div>
<p>{error}</p>
        </>
    )
}