import axios from "axios"
import { useEffect,useState } from "react"
export default function Report(){
    const[data,SetData]=useState([])
    const token= localStorage.getItem('token')
    const getEmployees=async(e)=>{
        e.preventDefault()
        try{
            const res= await axios.get('http://localhost:3001/employees',{
                headers:{
                    "Authorization":`Bearer ${token}`

                }}
            )
            SetData(res.data)
        }catch(err){
            window.alert(err)
        }
    }
    useEffect(()=>{
        getEmployees()
    },[])
    return(
<>
<table>
<th>Name</th>

{data.map((datas)=>(
<tr>
    <td>
        {datas.FirstName}
        </td></tr>
))}
</table>
</>



    )
}