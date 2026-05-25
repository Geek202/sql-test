const connectDB = require("../config/db");


exports.create = async (req, res) => {

try {

const {
FirstName,
LastName,
Gender,
DOB,
Position,
Department,
Email,
PhoneNumber,
Address,
Salary,
HireDate,
Status
} = req.body;

if(
!FirstName ||
!LastName ||
!Gender ||
!DOB ||
!Position ||
!Department ||
!Email ||
!PhoneNumber ||
!Address ||
!Salary ||
!HireDate ||
!Status
){

return res.status(400).json({
message:"Missing Fields"
});

}

const postQuery =
"SELECT PostID FROM post WHERE postName=?";

connectDB.query(
postQuery,
[Position],
(err, postResults)=>{

if(err){

return res.status(500).json({
message:"Post lookup failed"
});

}

if(
!postResults ||
postResults.length===0
){

return res.status(404).json({
message:"Post not found"
});

}

const PostID =
postResults[0].PostID;

const checkQuery =
"SELECT * FROM employees WHERE Email=?";

connectDB.query(
checkQuery,
[Email],
(err, results)=>{

if(err){

return res.status(500).json({
message:
"Employee creation failed"
});

}

if(results.length>0){

return res.status(400).json({
message:
"Employee already exists"
});

}

const createQuery = `

INSERT INTO employees(

PostID,
FirstName,
LastName,
Gender,
DOB,
Position,
Department,
Email,
PhoneNumber,
Address,
Salary,
HireDate,
Status

)

VALUES(
?,?,?,?,?,?,?,?,?,?,?,?,?
)

`;

connectDB.query(
createQuery,

[
PostID,
FirstName,
LastName,
Gender,
DOB,
Position,
Department,
Email,
PhoneNumber,
Address,
Salary,
HireDate,
Status
],

(err,result)=>{

if(err){

return res.status(500).json({
message:
"Failed creating employee",
err
});

}

return res.status(201).json({

message:
"Employee created",

employee:{
EmployeeID:
result.insertId,
PostID
}

});

});

});

});

}catch(err){

return res.status(500).json({
message:
err.message
});

}

};


exports.update = async(req,res)=>{

try{

const { EmployeeID } =
req.params;

const {
FirstName,
LastName,
Gender,
DOB,
Position,
Department,
Email,
PhoneNumber,
Address,
Salary,
HireDate,
Status
}=req.body;

const postQuery =
"SELECT PostID FROM post WHERE postName=?";

connectDB.query(
postQuery,
[Position],
(err,postResults)=>{

if(err){

return res.status(500).json({
message:
"Post lookup failed"
});

}

if(
!postResults ||
postResults.length===0
){

return res.status(404).json({
message:
"Post not found"
});

}

const PostID =
postResults[0].PostID;

const updateQuery = `

UPDATE employees SET

PostID=?,
FirstName=?,
LastName=?,
Gender=?,
DOB=?,
Position=?,
Department=?,
Email=?,
PhoneNumber=?,
Address=?,
Salary=?,
HireDate=?,
Status=?

WHERE EmployeeID=?

`;

connectDB.query(
updateQuery,

[
PostID,
FirstName,
LastName,
Gender,
DOB,
Position,
Department,
Email,
PhoneNumber,
Address,
Salary,
HireDate,
Status,
EmployeeID
],

(err)=>{

if(err){

return res.status(500).json({
message:
"Update failed"
});

}

return res.status(200).json({
message:
"Updated successfully"
});

});

});

}catch(err){

return res.status(500).json({
message:
err.message
});

}

};


// DELETE
exports.deletes = async(req,res)=>{

const { EmployeeID } =
req.params;

const query =
"DELETE FROM employees WHERE EmployeeID=?";

connectDB.query(
query,
[EmployeeID],

(err)=>{

if(err){

return res.status(500).json({
message:
"Delete failed"
});

}

return res.status(200).json({
message:
"Deleted"
});

});

};


// GET
exports.getEmployees =
async(req,res)=>{

const query = `
SELECT *
FROM employees
`;

connectDB.query(
query,
(err,results)=>{

if(err){

return res.status(500).json({
message:
"Fetch failed"
});

}

return res.status(200).json({
results
});

});

};