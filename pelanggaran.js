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

app.get("/pelanggaran", (req, res) => {
        let sql = "select * from pelanggaran"
        db.query(sql, (error, result) => {
            let response = null
            if (error) {
                response = {
    
                    message: error.message
                }
            } else {
                response = {
                    count: result.length,
                    pelanggaran: result 
                }
            }
            res.json(response) 
        })
    })

app.get("/pelanggaran/:id", (req, res) => {
        let data = {
            id_pelanggaran: req.params.id
        }
        let sql = "select * from pelanggaran where ?"
        db.query(sql, data, (error, result) => {
        let response = null
            if (error) {
                response = {
                    message: error.message 
                }
            } else {
                response = {
                    count: result.length, 
                    pelanggaran: result 
                }
            }
            res.json(response) 
        })
    })

app.post("/pelanggaran", (req,res) => {
        let data = {
            nama_pelanggaran: req.body.nama_pelanggaran,
            poin: req.body.poin
        }
        let sql = "insert into pelanggaran set ?"
        db.query(sql, data, (error, result) => {
        let response = null
            if (error) {
                response = {
                    message: error.message
                }
            } else {
                response = {
                    message: result.affectedRows + " data inserted"
                }
            }
            res.json(response)
        })
    })

app.put("/pelanggaran", (req,res) => {
        let data = [
                {
                    nama_pelanggaran: req.body.nama_pelanggaran,
                    poin: req.body.poin
            },
            {
                id_pelanggaran: req.body.id_pelanggaran
            }
        ]
        let sql = "update pelanggaran set ? where ?"
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

app.delete("/pelanggaran/:id", (req,res) => {
        let data = {
            id_siswa: req.params.id
        }
    
        let sql = "delete from pelanggaran where ?"
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

    app.listen(1001, () => {
            console.log( "Run on port 1001")
 })