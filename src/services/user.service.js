// // 15. 
// const { is } = require('express/lib/request');
// const { nanoid } = require('nanoid');

// // 11. membuat array untuk menyimpan data kosong
// const users = [] // database sementara

// // 10. membaut fungsi registrasi dengan parameter body yang dikirimkan dari user.controller.js, yang akan dijalankan secara asinkronus/bersamaan/paralel
// const register =  async(body) => {
//     // 16. 
//     const id = nanoid(4);
    
//     // 12. menyimpan data objek
//     const newUser = {
//         id : id,
//         username : body.username,
//         email : body.email,
//         password : body.password
//     };

//     // 13. menyimpan data objek user ke dalam array
//     users.push(newUser);

//     // 14. cek respon dengan kondisi id dari body sama dengan id dari nanoid 
//     const isSuccess = users.filter((user) => user.id === id ).length > 0;

//     return isSuccess;
// };

// // 28. 
// const login = async(body) => {
//     // 29. 
//     const user = users.filter((user) => (user.email === body.email && user.password === body.password))[0];
    
//     return user;
// };

// module.exports = { register, login };


const dbPool = require('../config/database');

const register = async (body) => {
    const query = `INSERT INTO users (username, email, password) VALUES ('${body.username}', '${body.email}', '${body.password}')`

    return dbPool.execute(query);
}

const login = async (body) => {
    const query = `SELECT id, username, email FROM users WHERE email = '${body.email}' AND password = '${body.password}'`

    return dbPool.execute(query);
}

const update = async (id, body) => {
    const query = `UPDATE users SET username = '${body.username}', email = '${body.email}', password = '${body.password}' WHERE id = ${id}`

    return dbPool.execute(query);
}

const viewUser = async () => {
    const query = `SELECT id, username, email FROM users`

    return dbPool.execute(query);
}

const deleteUser = async (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`

    return dbPool.execute(query);
}

const getUserByEmail = async (email) => {
    const query = `SELECT id, username, email FROM users WHERE email = '${email}'`

    return dbPool.execute(query)
}

module.exports = { 
    register, 
    login, 
    update, 
    viewUser, 
    deleteUser,
    getUserByEmail 
}