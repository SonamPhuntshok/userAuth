const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const { createUserTable } = require('./Models/userModel');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));


// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));


// Routes
// const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');  // Correct path (no extra space)
;
const { createFoodTable } = require('./Models/foodModel');
createFoodTable();


// app.use('/', adminRoutes);
app.use('/', authRoutes);
app.use('/admin', adminRoutes);



// app.use('/', userRoutes);
app.use('/user', userRoutes);

// Schema creation
createUserTable(); // Call this after setting up middlewares


// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


