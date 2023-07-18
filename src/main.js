// 1. import framework express
const express = require('express');

// 2. membuat aplikasi dari express
const app = express();

// 3. membuat PORT lokal
const PORT = 5000;

// 4. membuat listen yang dijalankan di lokal
app.listen(PORT, () => {
    console.log(`Server telah berhasil jalan di port ${PORT}!!`);
});