const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5500;
const fs = require('fs');

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

