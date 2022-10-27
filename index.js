require('dotenv').config();
const express =require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose')
const Role = require('./models/role');

app.use(express.json())
app.use(cors());

// Database connection
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => {
    console.log('Connected to Database')
    // note: need to run once
    // Role.deleteMany({}, async (err) => { 
    //     if(err) return handleError(err) 
        
    //     const role = new Role();
    //     role.save(async (err) => {
    //         if(err) console.log('Initializing roles error.');
    //     });
    // });
});

// import routes
const UserRoutes = require('./routes/Users')

// Routes
app.use('/user', UserRoutes);

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
})