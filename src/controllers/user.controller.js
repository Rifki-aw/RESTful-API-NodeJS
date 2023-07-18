// 16. membuat eksploler
const userService = require('../services/user.service');

// 5. membaut fungsi registrasi, yang akan dijalankan secara asinkronus/bersamaan/paralel
const register = async(req, res) => {
    // 6. Mengekstrak properti 'body' dari objek 'req'
    const { body } = req;

    // 8. validasi dari data yang diterima
    if ( !body.username || !body.email || !body.password ) {
        return res.status(400).json({ 
            status : 'Fail',
            message : 'Data yang dikirimkan tidak sesuai, silahkan isi kembali !!' 
        });
    };

    // 9. mengirimkan data body pada user.service.js, tujuan dari catch menghandle eror
    try {
        // 17. menyimpan variabel yang didapat dari isSuccess dari file user.services.js
        const user = await userService.register(body);

        // 18. membuat kondisi eror
        if(user == false){
            error
        }

        // 19. jika tidak eror akan muncul status data berhasil ditambahkan
        return res.status(201).json({
            status : 'Success',
            message : 'Data berhasil disimpan',
            data : body
        })

    } catch (error) {
        return res.status(500).json({
            status : 'Fail',
            message : 'Data anda gagal disimpan'
        })
    };
};

// 25. membaut fungsi login, yang akan dijalankan secara asinkronus/bersamaan/paralel
const login = async(req, res) => {
    const { body } = req;

    // 26. validasi dari data yang diterima
    if ( !body.email || !body.password ) {
        return res.status(400).json({ 
            status : 'Fail',
            message : 'Email dan password tidak sesuai!!' 
        });
    };

    // 27. 
    try {
        const user = await userService.login(body);

        if (!user) {
            error
        }

        return res.status(200).json({
            status : 'Success',
            message : 'Anda berhasil login!!',
            data : user
        });

    } catch (error) {
        return res.status(500).json({
            status : 'Fail',
            message : 'Login Gagal'
        });
    };
};

module.exports = { register, login }