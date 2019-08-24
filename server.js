const express = require('express');
const mongoose = require('mongoose');

const app = express();

const db =require('./config/keys').mongoURI;

mongoose.connect(db, {useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)
);

app.get('/', (req, res) => res.send('Jesu my people !') );

const port = process.env.PORT || 7383;



app.listen(port, () => console.log(`Server running on port ${port}`));