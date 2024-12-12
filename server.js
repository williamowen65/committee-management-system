const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const cors = require('cors');
const createOrderMiddleware = require('./app/api/paypal/order.js');
const createCaptureMiddleware = require('./app/api/paypal/capture.js');
const bodyParser = require('body-parser');


// console.log("hi", {

// Enable CORS for requests from http://localhost:5500
app.use(cors({
    origin: 'http://localhost:5500',
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Parse JSON bodies
app.use(bodyParser.json());



app.post('/submit', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.send('Data received');
});

app.post('/api/paypal/capture', createCaptureMiddleware);
app.post('/api/paypal/order', createOrderMiddleware);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {   
    res.redirect('/members')
 });
// Serve all folders in pages as a page
const pagesDir = path.join(__dirname, 'app/pages');
fs.readdir(pagesDir, (err, folders) => {
    if (err) {
        console.error('Unable to read pages directory:', err);
        return;
    }
    folders.forEach(folder => {
        const folderPath = path.join(pagesDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            app.use(`/${folder}`, express.static(folderPath));
        }
    });
});


// Serve the api folder (POST REQUEST)
// const apiDir = path.join(__dirname, 'app/api');
// fs.readdir(apiDir, (err, files) => {
//     if (err) {
//         console.error('Unable to read api directory:', err);
//         return;
//     }
//     files.forEach(file => {
//         const filePath = path.join(apiDir, file);
//         if (fs.lstatSync(filePath).isFile()) {
//             const route = file.replace('.js', '');
//             app.post(`/api/${route}`, require(filePath));
//         }
//     });
// });




// Serve info about the API
app.use('/api', (req, res) => {

    /// THIS IS JUST DOCUMENTATION !!!

    res.send({
        message: 'Welcome to my custom Paypal API integration',
        author: "William Owen",
        contact: "william.owen.career@gmail.com",
        routes: {
            "/api/paypal/order": {
                method: "POST",
                description: "Create a PayPal order",
                body: {
                    "intent": "CAPTURE",
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": "100.00"
                            }
                        }
                    ]
                }
            },
            "/api/paypal/capture": {
                method: "POST",
                description: "Capture a PayPal order",
                body: {
                    "orderID": "ORDER_ID"
                }
            },
        }
    });
})

// // fall back
// app.get('*', (req, res) => {
//     res.redirect('/')
// });




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

