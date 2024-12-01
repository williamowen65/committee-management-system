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
    res.redirect('/my-account')
});

app.get('/my-account', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/pages/my-account/index.html'));
});
app.get('/my-account/index.js', (req, res) => { 
    res.sendFile(path.join(__dirname, 'app/pages/my-account/index.js'));
 })
app.get('/my-account/style.css', (req, res) => { 
    res.sendFile(path.join(__dirname, 'app/pages/my-account/style.css'));
 })

// app.get("dist/bundle.js", (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'bundle.js'));
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 