const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mainRouter = require('./routes/main');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//mangoDb
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connected');
});

//routes
app.use('/main', mainRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`server name : ${port}`);

});