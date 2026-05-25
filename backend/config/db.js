const mysql= require('mysql2')
const connectDB= mysql.createPool({
   host:"localhost",
   user:"root",
    password:"",
    database:"sql"
})
connectDB.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the pool:', err.message);
    return;
  }
  console.log('Connected to MySQL pool successfully!');
  
  
  connection.release();
});
module.exports= connectDB