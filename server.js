const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const URI = config.get('mongoURI');

// Routes:
const userRoutes = require('./routes/api/users');
const profileRoutes = require('./routes/api/profile');
const postsRoutes = require('./routes/api/posts');
const authRoutes = require('./routes/api/auth');

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/posts', postsRoutes);

//const PORT = process.env.PORT || 5000;
const PORT = 5000;

mongoose.connect(URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(response => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})
.catch(err => console.log(err));