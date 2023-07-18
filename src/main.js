// 1. import framework express
const express = require('express');

// 22. 
const userRouter = require('./routes/user.route');

// 2. membuat aplikasi dari express
const app = express();

// 3. membuat PORT lokal
const PORT = 5000;

// 7. agar modul express bisa membaca json yang telah dikirim oleh user
app.use(express.json());

// 23. 
app.use(userRouter);

// 4. membuat listen yang dijalankan di lokal
app.listen(PORT, () => {
    console.log(`Server telah berhasil jalan di port ${PORT}!!`);
});
