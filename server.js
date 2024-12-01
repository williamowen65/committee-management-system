const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Define a route to serve the HTML files
app.get('/', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.redirect('/my-account');
});

app.use('/my-account', express.static(path.join(__dirname, 'app/pages/my-account')));

// app.get("dist/bundle.js", (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

