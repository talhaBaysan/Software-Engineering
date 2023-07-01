const mysqlConnection = require('../config/db_config')
exports.login = async (req,res) =>{
    const { username, password} = req.body;
    mysqlConnection.query('SELECT eleman_id FROM kayit_elemani Where eleman_username = ? AND eleman_password = ? ',[username,password], (err, result) => {
        console.log(result)
        if (err){
            console.log(err)
            res.status(500).send({err: err})
        }
        else{
            if(result.length){
                res.status(200).send(result)
            }
            else{
                res.status(404).send({message: "No user found"})
            }
        }
            
    })
}

exports.fortest = async (a,b) =>{
    return a+b
}

