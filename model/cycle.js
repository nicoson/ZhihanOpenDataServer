var storage = require('../model/Storage')

function Cycle(){
    this.delay = 1000;
};

Cycle.getData = function(res,id) {
    cycle(res, id, 0);
}

function cycle (res, id, count) {
    if(storage.data[id] != undefined) {
        res.send(datum);
        delete storage.data[id];
    } else if (count > 10){
        console.log(storage.jobs);
        res.send("Timeout, please try again");
    } else {
        setTimeout(cycle, 1000, res, id, ++count);
    }
}

// console.log(Transfer.getData())
module.exports = Cycle;