const mysqlConnection = require("../config/db_config")

exports.showBranchs = (req,res) => {
    mysqlConnection.query("SELECT GROUP_CONCAT(DISTINCT ders.dil ORDER BY ders.dil SEPARATOR ', ') AS  diller,sube.sube_id, sube.isim, sube.adres, sube.tanitim FROM sube, ders WHERE sube.sube_id=ders.sube_id GROUP BY sube.sube_id;",(err,result) => {
        console.log(result)
        // console.log(fields)
        if(err){
            console.log(err)
            res.status(500).json({message:'error in showBranches function'})
        }else{
            console.log(result)
            if(result){
                res.status(200).json(result)
            }
        }
    })
}

exports.findOne = (req,res) => {
    console.log(req.body)
    mysqlConnection.query(`SELECT * FROM sube WHERE sube_id=${req.body.branch_id}`,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({message:`Error in finding ${req.body.branch_id}`})
        }else{
            console.log(result)
            res.status(200).json({
                message:`${req.body.branch_id} found!`,
                result:result
            })
        }
    })
}

exports.showLanguagesOne = (req,res) => {
    console.log(req.body)
    mysqlConnection.query(`SELECT  GROUP_CONCAT(DISTINCT ders.dil ORDER BY ders.dil SEPARATOR ', ') AS diller FROM sube, ders WHERE ders.sube_id=${req.body.branch_id} GROUP BY ders.sube_id;`,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({message:`Error in finding ${req.body.branch_id}`})
        }else{
            console.log(result)
            res.status(200).json({
                message:`${req.body.branch_id} found!`,
                result:result
            })
        }
    })
}

exports.showCoursesOne = (req,res) => {
    mysqlConnection.query(`SELECT ders.ders_id, ders.dil ,ders.starttime, ders.endtime, ders.gun, ders.fiyat FROM  ders WHERE ders.sube_id = ${req.body.branch_id} ;
    `,(err,result) => {
        if(err){
            console.log(err)
            res.status(500).json({message:`Error in finding ${req.body.branch_id}`})
        }else{
            console.log(result)
            res.status(200).json({
                message:`${req.body.branch_id} found!`,
                result:result
            })
        }
    })
}