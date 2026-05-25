const express = require("express");
const authRoutes = require('./routes/AuthRoutes');
const postRoutes = require('./routes/PostRoutes');
const EmployeeRoutes = require('./routes/EmployeeRoutes');
const cors = require('cors');
const connectDB = require('./config/db');

require('dotenv').config();

connectDB;

const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/employees', EmployeeRoutes);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});