var con = require("./connection");
var express = require("express")
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/public/'));

app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    con.connect(function (err) {
        if (err) console.log(err)
        var sql = "SELECT * FROM todo"
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.render(__dirname + "/index", { todo: result })

        })
    })
})

app.post("/", function (req, res) {
    var task = req.body.task;
    con.connect(function (err) {
        if (err) console.log(err)
        var sql = "INSERT INTO todo (task) VALUES ?"
        var values = [[task]]
        con.query(sql, [values], function (err) {
            if (err) throw err;
            res.redirect("/")
            // res.send("kayıt tamamlandı")
        })
    })
})
app.get("/update-task", function (req, res) {
    var task = req.body.task;
    con.connect(function (err) {
        if (err) console.log(err)
        var sql = "select *  from todo where idtodo=?";
        var id = req.query.id;
        con.query(sql, [id], function (err, result) {
            if (err) console.log(err)
            res.render(__dirname + "/update-task", { todo: result });

        })
    })
})
app.post("/update-task", function (req, res) {
    var task = req.body.task;
    var id = req.body.idtodo;
    con.connect(function (err) {
        if (err) console.log(err)
        var sql = "UPDATE todo SET task=? WHERE idtodo=?";

        con.query(sql, [task, id], function (err, result) {
            if (err) console.log(err)
            res.redirect("/")

        })
    })
})

app.get("/delete-task", function (req, res) {
    con.connect(function (err) {
        if (err) console.log(err)
        var sql = "delete from todo where idtodo=?";
        var id = req.query.id;
        con.query(sql, [id], function (err, result) {
            if (err) console.log(err)
            res.redirect("/");

        })
    })
})




app.listen("3000", console.log("bağlandı"))

