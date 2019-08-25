const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

const db =require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)
);

app.get('/', (req, res) => res.send('Jesu my people !') );

//Use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 7383;



app.listen(port, () => console.log(`Server running on port ${port}`));