const express = require('express');
const cors = require('cors');
const dbConnect = require('./models/dbConnect.js');



// init and middlewares
const app = express();
dbConnect();
app.use(express.json());
app.use(cors());



// routes
app.get('/', (req, res) => res.send('Homepage of Logistics App :)'));
app.use('/api/orders', require('./routes/order.js'));
app.get('*', (req, res) => res.status(400).send('Error 404: Page not found !'));
app.post('*', (req, res) => res.status(400).send('Error 404: Page not found !'));



const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));