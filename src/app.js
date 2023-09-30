const express = require('express');
const morgan = require('morgan');

const app = express()
console.log('error')
app.use(express.json())
//rutas
app.use(morgan('dev'));
app.use('/users', require('./routes/user'));

app.listen(3000, () => {
    console.log("Server on port 3000");
});

module.exports = app;