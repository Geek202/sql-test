import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {

const [formData, setFormData] = useState({
    Username:"",
    Password:""
});
const navigate= useNavigate()

const [error,setError] = useState([]);

const handleChange = (e)=>{

setFormData({
    ...formData,
    [e.target.name]:e.target.value
});

};

const handleLogin = async(e)=>{


e.preventDefault();

let errors=[];

if(!formData.Username){
errors.push("Input Username");
}

if(!formData.Password){
errors.push("Input Password");
}

setError(errors);

if(errors.length>0){
return;
}

try{
    

const res = await axios.post(
"http://localhost:3001/auth/login",
formData
);

if(res.data.success===true){

const token = res.data.token;

localStorage.setItem(
"token",
token
);
navigate('/dashboard')

}

}catch(err){

setError([
err.response?.data?.message ||
"Login failed"
]);

}

};

return (

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">

<h2 className="text-2xl font-bold text-center mb-6">
Login
</h2>

<form
onSubmit={handleLogin}
className="space-y-4"
>

<input
type="text"
name="Username"
value={formData.Username}
onChange={handleChange}
placeholder="Username"
className="
w-full
p-3
border
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-500"
/>

<input
type="password"
name="Password"
value={formData.Password}
onChange={handleChange}
placeholder="Password"
className="
w-full
p-3
border
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-500"
/>

<button
type="submit"
className="
w-full
bg-blue-500
text-white
p-3
rounded-lg
hover:bg-blue-600"
>

Login

</button>

{
error.map((err,index)=>(

<p
key={index}
className="text-red-500"
>

{err}

</p>

))
}

</form>

</div>

</div>

);

}