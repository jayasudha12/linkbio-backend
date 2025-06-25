
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const publicRoutes = require('./routes/public');
dotenv.config();



const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const linkRoutes = require('./routes/link');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/links', linkRoutes);
app.use('/@', publicRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('Server running')))
  .catch(err => console.log(err));