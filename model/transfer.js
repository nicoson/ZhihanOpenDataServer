var http = require('http');

function Transfer(){};

Transfer.getData = function(res, db, table, start, end) {
    //  config database
    let data = {
        db: db,
        table: table,
        start: start,
        end: end
    };

}

Transfer.getNameList = function(res, db, table) {
    //  config database
    let data = {
        db: db,
        table: table
    };

}

// console.log(Transfer.getData())
module.exports = Transfer;