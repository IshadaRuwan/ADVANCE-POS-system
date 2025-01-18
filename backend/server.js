const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
const saleRoutes = require('./routes/saleRoutes');
const productRouts = require('./routes/productRoutes');



dotenv.config();
dbConnect();


const app = express();


app.use(cors());
app.use(express.json());

// Routes

app.listen(process.env.PORT,() => {
    console.log(`Server running on port ${process.env.PORT}`);
});



app.use('/',productRouts);
app.use('/Sale',saleRoutes)