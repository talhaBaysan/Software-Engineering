const mysqlConnection = require("../config/db_config")

exports.createStudents = (req, res) => {
    console.log(req.body)
    const { name, surname, tc, phone, address } = req.body

    mysqlConnection.query('INSERT INTO ogrenci(isim, soyisim, tc, tel, adres) VALUES (?,?,?,?,?)', [name, surname, tc, phone, address], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'error in insertion' })
        } else {
            if (result) {
                res.status(200).json({ message: 'insert opertation successful!' })
            } else {
                res.status(500).json({ message: 'error in result' })
            }
        }
    })
}

exports.showStudents = (req, res) => {
    console.log(req.body)
    mysqlConnection.query('SELECT kayit.id, ogrenci.isim, ogrenci.soyisim, ogrenci.tc, kayit.ders_id, kayit.pesin FROM ogrenci,kayit WHERE ogrenci.id=kayit.ogrenci_id ;',(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({message:'error in showStudent function'})
        }else{
            console.log(result)
            if(result){
                res.status(200).json(result)
            }
        }})
    }

exports.findOne = (req, res) => {
    console.log(req.body)
    mysqlConnection.query(`SELECT * FROM ogrenci WHERE tc=${req.body.tc}`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: `error in finding student with TC:${req.body.tc}` })
        } else {
            console.log(result)
            res.status(200).json(result)
        }
    })
}

exports.getInstallment = (req, res) => {
    console.log(req.body)
    mysqlConnection.query(`UPDATE kayit SET kayit.pesin = GREATEST(0 ,kayit.pesin - 1) WHERE kayit.ogrenci_id = (SELECT o.id FROM (SELECT * FROM ogrenci) as o WHERE o.tc = ${req.body.tc});`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Error in getInstallment function' })
        } else {
            console.log(result)
            res.status(200).json(result)
        }
    })
}

exports.addToCourse = (req, res) => {
    console.log(req.body)
    mysqlConnection.query(`INSERT INTO kayit(ogrenci_id, ders_id, pesin) VALUES((SELECT id FROM ogrenci WHERE tc=${req.body.tc}), ${req.body.course}, ${req.body.odeme});`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Error in delete student function' })
        } else {
            console.log(result)
            res.status(200).json(result)
        }
    })

}

exports.deleteStudent = (req, res) => {
    console.log(req.body)
    mysqlConnection.query(`DELETE FROM ogrenci WHERE tc=${req.body.tc}`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Error in delete student function' })
        } else {
            if (result.affectedRows != 0) {
                console.log('result', result)
                res.status(200).json(result)
            } else {
                res.status(500).json({ message: 'tc not found' })
            }
        }
    })
}



exports.deleteStudentFromCourse = (req, res) => {
    console.log(req.body)
    mysqlConnection.query(`DELETE FROM kayit WHERE ogrenci_id = (SELECT ogrenci.id FROM ogrenci WHERE ogrenci.tc = ${req.body.tc})`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Error in delete student function' })
        } else {
            console.log(result)
            res.status(200).json(result)
        }
    })
}