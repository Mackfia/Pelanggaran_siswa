const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"",
        database: "pelanggaran_siswa"
    })
    db.connect(error => {
        if (error) {
            console.log(error.message)
        } else {
            console.log("MySQL Connected")
        }
    })

app.get("/user", (req, res) => {
        let sql = "select * from user"
        db.query(sql, (error, result) => {
            let response = null
            if (error) {
                response = {
    
                    message: error.message
                }
            } else {
                response = {
                    count: result.length,
                    user: result 
                }
            }
            res.json(response) 
        })
    })

app.get("/user/:id", (req, res) => {
        let data = {
            id_user: req.params.id
        }
        let sql = "select * from user where ?"
        db.query(sql, data, (error, result) => {
        let response = null
            if (error) {
                response = {
                    message: error.message 
                }
            } else {
                response = {
                    count: result.length, 
                    user: result 
                }
            }
            res.json(response) 
        })
    })

app.post("/user", (req,res) => {
        let data = {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: req.body.password
        }
        let sql = "insert into user set ?"
        db.query(sql, data, (error, result) => {
        let response = null
            if (error) {
                response = {
                    message: error.message,
                }
            } else {
                response = {
                    message: result.affectedRows + " data inserted"
                }
            }
            res.json(response)
        })
    })  

app.put("/user", (req,res) => {
        let data = [
                {
                    nama_user: req.body.nama_user,
                    username: req.body.username,
                    password: md5(req.body.password)
            },
            {
                id_user: req.body.id_user
            }
        ]
        let sql = "update user set ? where ?"
        db.query(sql, data, (error, result) => {
            let response = null
            if (error) {
                response = {
                message: error.message
                }
            } else {
                response = {
                    message: result.affectedRows + " data updated"
                }
            }
            res.json(response)
        })
    })

app.delete("/user/:id", (req,res) => {
        let data = {
            id_user: req.params.id
        }
    
        let sql = "delete from user where ?"
        db.query(sql, data, (error, result) => {
            let response = null
            if (error) {
                response = {
                message: error.message
            }
            } else {
                    response = {
                    message: result.affectedRows + " data deleted"
                }
            }
        res.json(response)
        })
    })

    app.listen(1011, () => {
            console.log( "Run on port 1011")
 })