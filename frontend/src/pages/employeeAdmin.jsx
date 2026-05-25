import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeePage() {

const token =
localStorage.getItem(
"token"
);

const [employees,
setEmployees] =
useState([]);

const [posts,
setPosts] =
useState([]);

const [isEditing,
setIsEditing] =
useState(false);

const initialForm = {

EmployeeID:"",

FirstName:"",
LastName:"",
Gender:"Male",

DOB:"",

Position:"",

Department:"",

Email:"",

PhoneNumber:"",

Address:"",

Salary:"",

HireDate:"",

Status:""

};

const [formData,
setFormData] =
useState(
initialForm
);


useEffect(()=>{

getEmployees();
getPosts();

},[]);


const getEmployees =
async()=>{

try{

const res =
await axios.get(

"http://localhost:3001/employees",

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

setEmployees(
res.data.results
);

}catch(err){

console.log(err);

}

};


const getPosts =
async()=>{

try{

const res =
await axios.get(
"http://localhost:3001/post"
);

setPosts(
res.data.results
);

}catch(err){

console.log(err);

}

};


const handleChange =
(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};


const handleSubmit =
async(e)=>{

e.preventDefault();

try{

await axios.post(

"http://localhost:3001/employees",

formData,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

getEmployees();

setFormData(
initialForm
);

}catch(err){

console.log(err);

}

};


const handleEdit =
(emp)=>{

setIsEditing(true);

setFormData({

EmployeeID:
emp.EmployeeID,

FirstName:
emp.FirstName,

LastName:
emp.LastName,

Gender:
emp.Gender,

DOB:
emp.DOB
? emp.DOB.split("T")[0]
: "",

Position:
emp.Position,

Department:
emp.Department,

Email:
emp.Email,

PhoneNumber:
emp.PhoneNumber,

Address:
emp.Address,

Salary:
emp.Salary,

HireDate:
emp.HireDate
? emp.HireDate.split("T")[0]
: "",

Status:
emp.Status

});

};


const handleUpdate =
async()=>{

try{

await axios.put(

`http://localhost:3001/employees/${formData.EmployeeID}`,

formData,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

setIsEditing(
false
);

setFormData(
initialForm
);

getEmployees();

}catch(err){

console.log(err);

}

};


const handleDelete =
async(id)=>{

const confirmDelete=
window.confirm(
"Delete employee?"
);

if(!confirmDelete)
return;

try{

await axios.delete(

`http://localhost:3001/employees/${id}`,

{
headers:{
Authorization:
`Bearer ${token}`
}
}

);

getEmployees();

}catch(err){

console.log(err);

}

};


const handleCancel =
()=>{

setIsEditing(
false
);

setFormData(
initialForm
);

};


return(

<div className=
"min-h-screen bg-gray-100 p-8">

<div className=
"bg-white rounded-xl shadow p-6">

<h1 className=
"text-2xl font-bold mb-6">

Employee Management

</h1>


<form

onSubmit=
{handleSubmit}

className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-3
gap-4"

>


<input
name="FirstName"
placeholder="First Name"
value={formData.FirstName}
onChange={handleChange}
className="
border p-3 rounded"
/>


<input
name="LastName"
placeholder="Last Name"
value={formData.LastName}
onChange={handleChange}
className="
border p-3 rounded"
/>


<select

name="Gender"

value={formData.Gender}

onChange=
{handleChange}

className="
border p-3 rounded"

>

<option value="Male">
Male
</option>

<option value="Female">
Female
</option>

</select>


<div className="flex flex-col">
<label className="
text-sm
font-medium
mb-1
text-gray-700">

Date of Birth

</label>

<input
type="date"
name="DOB"
value={formData.DOB}
onChange={handleChange}
className="
border
p-3
rounded"
/>

</div>


<select

name="Position"

value=
{formData.Position}

onChange=
{handleChange}

className="
border p-3 rounded"

>

<option value="">
Select Position
</option>

{
(posts||[])
.map(
(post)=>(

<option

key=
{post.PostID}

value=
{post.postName}

>

{post.postName}

</option>

))
}

</select>


<input
name="Department"
placeholder="Department"
value={formData.Department}
onChange={handleChange}
className="
border p-3 rounded"
/>


<input
type="email"
name="Email"
placeholder="Email"
value={formData.Email}
onChange={handleChange}
className="
border p-3 rounded"
/>


<input
name="PhoneNumber"
placeholder="Phone Number"
value={formData.PhoneNumber}
onChange={handleChange}
className="
border p-3 rounded"
/>


<input
name="Address"
placeholder="Address"
value={formData.Address}
onChange={handleChange}
className="
border p-3 rounded"
/>


<input
type="number"
name="Salary"
placeholder="Salary"
value={formData.Salary}
onChange={handleChange}
className="
border p-3 rounded"
/>


<div className="flex flex-col">

<label className="
text-sm
font-medium
mb-1
text-gray-700">

Hire Date

</label>

<input
type="date"
name="HireDate"
value={formData.HireDate}
onChange={handleChange}
className="
border
p-3
rounded"
/>

</div>


<select
name="Status"
value={formData.Status}
onChange={handleChange}
className="
border p-3 rounded"
>

<option value="">
Select Status
</option>

<option value="Active">
Active
</option>

<option value="Inactive">
Inactive
</option>

<option value="On Leave">
On Leave
</option>

</select>


<div className="
col-span-full
flex gap-3 mt-4">

{
!isEditing ? (

<button
type="submit"

className="
bg-blue-600
text-white
px-5 py-2
rounded"

>

Add Employee

</button>

):(

<>

<button

type="button"

onClick=
{handleUpdate}

className="
bg-green-600
text-white
px-5 py-2
rounded"

>

Save Changes

</button>


<button

type="button"

onClick=
{handleCancel}

className="
bg-gray-500
text-white
px-5 py-2
rounded"

>

Cancel

</button>

</>

)

}

</div>

</form>

</div>



<div className="
bg-white
rounded-xl
shadow
mt-8
overflow-x-auto">

<table className=
"w-full">

<thead>

<tr className=
"bg-gray-100">

<th className="p-4">
ID
</th>

<th className="p-4">
Employee
</th>

<th className="p-4">
Position
</th>

<th className="p-4">
Department
</th>

<th className="p-4">
Email
</th>

<th className="p-4">
Actions
</th>

</tr>

</thead>


<tbody>

{
employees.map(
(emp)=>(

<tr

key=
{emp.EmployeeID}

className=
"border-b text-center"

>

<td className="p-4">

{
emp.EmployeeID
}

</td>


<td className="p-4">

{
emp.FirstName
}

{" "}

{
emp.LastName
}

</td>


<td className="p-4">

{
emp.Position
}

</td>


<td className="p-4">

{
emp.Department
}

</td>


<td className="p-4">

{
emp.Email
}

</td>


<td className=
"space-x-2 p-4">

<button

onClick={()=>
handleEdit(
emp
)
}

className="
bg-yellow-400
px-3 py-1
rounded"

>

Edit

</button>


<button

onClick={()=>
handleDelete(
emp.EmployeeID
)
}

className="
bg-red-500
text-white
px-3 py-1
rounded"

>

Delete

</button>

</td>

</tr>

))
}

</tbody>

</table>

</div>

</div>

);

}