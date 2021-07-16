const express = require('express');
const app = express();
const ContactsRouter = require('./router/contact');

app.use(express.static('public')); 
app.use(express.static('data/uploads'))
app.use('/api', ContactsRouter);

app.listen(5000, () => {
    console.log('port is listening');
  });