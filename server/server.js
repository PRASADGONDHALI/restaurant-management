const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()
const PORT = process.env.PORT
const connectDB = require('./db/conn');
connectDB();
const authRoutes = require('./routes/authRoute')
const categoryRoutes =require('./routes/categoryRoutes');
const productRoutes =require('./routes/productRoutes');
const cors = require('cors'); // Import cors middleware

app.use(cors());
app.use(express.json());
app.use('/api/v1/',authRoutes);
app.use('/api/v1/category/',categoryRoutes);
app.use('/api/v1/product/',productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(PORT, () =>{
    console.log(`server started`);
})