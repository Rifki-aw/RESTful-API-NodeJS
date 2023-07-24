// // 16. membuat eksploler
// const userService = require('../services/user.service');

// // 5. membaut fungsi registrasi, yang akan dijalankan secara asinkronus/bersamaan/paralel
// const register = async(req, res) => {
//     // 6. Mengekstrak properti 'body' dari objek 'req'
//     const { body } = req;

//     // 8. validasi dari data yang diterima
//     if ( !body.username || !body.email || !body.password ) {
//         return res.status(400).json({ 
//             status : 'Fail',
//             message : 'Data yang dikirimkan tidak sesuai, silahkan isi kembali !!' 
//         });
//     };

//     // 9. mengirimkan data body pada user.service.js, tujuan dari catch menghandle eror
//     try {
//         // 17. menyimpan variabel yang didapat dari isSuccess dari file user.services.js
//         const user = await userService.register(body);

//         // 18. membuat kondisi eror
//         if(user == false){
//             error
//         }

//         // 19. jika tidak eror akan muncul status data berhasil ditambahkan
//         return res.status(201).json({
//             status : 'Success',
//             message : 'Data berhasil disimpan',
//             data : body
//         })

//     } catch (error) {
//         return res.status(500).json({
//             status : 'Fail',
//             message : 'Data anda gagal disimpan'
//         })
//     };
// };

// // 25. membaut fungsi login, yang akan dijalankan secara asinkronus/bersamaan/paralel
// const login = async(req, res) => {
//     const { body } = req;

//     // 26. validasi dari data yang diterima
//     if ( !body.email || !body.password ) {
//         return res.status(400).json({ 
//             status : 'Fail',
//             message : 'Email dan password tidak sesuai!!' 
//         });
//     };

//     // 27. 
//     try {
//         const user = await userService.login(body);

//         if (!user) {
//             error
//         }

//         return res.status(200).json({
//             status : 'Success',
//             message : 'Anda berhasil login!!',
//             data : user
//         });

//     } catch (error) {
//         return res.status(500).json({
//             status : 'Fail',
//             message : 'Login Gagal'
//         });
//     };
// };

// module.exports = { register, login }


const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { body } = req;

    if ( !body.username || !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'data anda tidak sesuai'
        });
    }

    try {
        const user = await userService.getUserByEmail(body.email);
        console.log(user)

        if(user[0][0]) {
            return res.status(409).json({
                status: 'fail',
                message: 'email yang digunakan sudah terdaftar'
            })
        }

        await userService.register(body);

        return res.status(201).json({
            status: 'success',
            mesaage: 'data berhasil disimpan',
            data: body
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            mesaage: 'gagal menyimpan data anda'
        });
    }
}

const login = async (req, res) => {
    const { body } = req;

    if ( !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'email dan password tidak boleh kosong!'
        });
    }

    try {
        const user = await userService.login(body)

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'email dan password salah'
            })
        }

        const dataUser = user [0][0];

        const jwtToken = jwt.sign(
            {id: dataUser.id, email: dataUser.email},
            process.env.JWT_SECRET
        )

        return res.status(200).json({
            status: 'success',
            mesaage: 'login berhasil',
            token: jwtToken,
            data: dataUser
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'login gagal'
        })
    }
}

const update = async (req, res) => {
    const id = req.user[0][0].id;
    const { body } = req;

    if ( !body.username || !body.email || !body.password ) {
        return res.status(400).json({
            status: 'fail',
            message: 'data anda tidak sesuai'
        });
    }

    try {
        await userService.update(id, body);

        return res.status(200).json({
            status: 'success',
            message: 'data berhasil diperbarui'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'gagal perabarui data'
        })
    }

}

const viewUser = async (req, res) => {
    try {
        const [user] = await userService.viewUser()

        return res.status(200).json({
            status: 'success',
            message: 'data berhasil ditampilkan',
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            mesaage: 'gagal menampilkan data'
        })

    }
}

const deleteUser = async (req, res) => {
    const id = req.user[0][0].id

    try {
        await userService.deleteUser(id)

        return res.status(200).json({
            status: 'succes',
            message: 'user berhasil dihapus'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'user gagal dihapus'
        })
    }
}   
module.exports = { 
    register, 
    login, 
    update, 
    viewUser, 
    deleteUser
}