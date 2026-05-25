const connectDB = require("../config/db");
const bcrypt = require("bcrypt"); 
const jwt= require('jsonwebtoken')
exports.login = async (req, res) => {
  try {
    const { Username, Password } = req.body;

    if (!Username) return res.status(400).json({ message: "Input a Username" });
    if (!Password) return res.status(400).json({ message: "Input a Password" });

    
    const query = 'SELECT * FROM users WHERE Username = ?';
    
    
    connectDB.query(query, [Username], async (err, results) => {
      if (err) {
        return res.status(400).json({ message: "User Not Found" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      const user = results[0];

     
      const isMatch = await bcrypt.compare(Password, user.Password); 
      
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
     const token = jwt.sign(
        {userID: user.id},
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
        

      )
      return res.status(200).json({ message: "Login successful", userId: user.id ,token,success:true});
    });

  } catch (err) {
    return res.status(500).json({ message: `Internal server error: ${err.message || err}` });
  }
};

exports.register = async (req, res) => {
    try {
        const { EmployeeID, Username, Password } = req.body;

        if (!EmployeeID) return res.status(400).json({ message: "Input an EmployeeID" });
        if (!Username) return res.status(400).json({ message: "Input a Username" });
        if (!Password) return res.status(400).json({ message: "Input a Password" });

     
        const checkUserQuery = "SELECT * FROM users WHERE Username = ?";
        connectDB.query(checkUserQuery, [Username], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }

            if (results && results.length > 0) {
                return res.status(400).json({ message: "Username already exists" });
            }

           
            const hashedPassword = await bcrypt.hash(Password, 10);

            const insertQuery = "INSERT INTO users (EmployeeID, Username, Password) VALUES (?, ?, ?)";
            connectDB.query(insertQuery, [EmployeeID, Username, hashedPassword], (err, results) => {
                if (err) {
                    return res.status(400).json({ message: "Issue registering user", error: err.message });
                }

                return res.status(201).json({ 
                    message: "User registered successfully", 
                    userId: results.insertId 
                });
            });
        });
    } catch (err) {
        return res.status(500).json({ message: `Internal server error: ${err.message || err}` });
    }
};
exports.getUsers= async(req,res)=>{
  try{
    const qeury="SELECT * FROM Users"
    connectDB.query(qeury,(err,results)=>{
      if(err)return res.status(400).json({message:`error retrieving users ${err.message||err}`})
      return res.status(200).json({message:"Retrieved Users",results})

    })
  }catch(err){
    return res.status(500).json({message:`Server error :${err.message||err}`})
  }
}