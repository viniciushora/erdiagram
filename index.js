const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use('/', require('./routes/erd'));

const PORT = process.env.PORT || 4111;

app.get('/', (request, response) => {
    return response.send('HelloWorld');
});

app.listen(PORT, console.log("Server start for port: " + PORT))