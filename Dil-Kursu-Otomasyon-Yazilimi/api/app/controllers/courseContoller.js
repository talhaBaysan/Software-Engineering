const mysqlConnection = require("../config/db_config")


exports.showCourses = (req,res) => {
    console.log(req.body)
    mysqlConnection.query('SELECT ders.ders_id, ders.dil ,ders.starttime, ders.endtime, ders.gun, ders.fiyat, sube.isim FROM ders, sube where ders.sube_id = sube.sube_id ',(err,result) => {
        console.log(result)
        // console.log(fields)
        if(err){
            console.log(err)
            res.status(500).json({message:'error in showCourses function'})
        }else{
            console.log(result)
            if(result){
                res.status(200).json(result)
            }
        }
    })
}