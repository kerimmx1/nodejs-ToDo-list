var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: ""

})
module.exports = con;