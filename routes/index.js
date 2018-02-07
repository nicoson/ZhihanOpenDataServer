var express = require('express');
var transfer = require('../model/transfer')
var cycle = require('../model/cycle')
var storage = require('../model/Storage')
var router = express.Router();

/* local api - for test */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// open source api
// handle requests for stocks
router.get('/astocknamelist', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'astock',
        table: 'updatelog'
    }

    cycle.getData(res,id)
});

router.post('/astockdata', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'astock',
        table: req.body.table,
        start: req.body.start,
        end: req.body.end
    }

    cycle.getData(res,id)
});

// handle requests for futures
router.get('/futurenamelist', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'future_l2',
        table: 'updatelog'
    }

    cycle.getData(res,id)
});

router.post('/futuredata', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'future_l2',
        table: req.body.table,
        start: req.body.start,
        end: req.body.end
    }

    cycle.getData(res,id)
});

// handle requests for main contract
router.get('/maincontractlist', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'maincontract',
        table: 'updatelog'
    }

    cycle.getData(res,id)
});

router.post('/maincontractdata', function(req, res, next) {
    let id = (new Date()).getTime();
    storage.jobs[id] = {
        db: 'maincontract',
        table: req.body.table,
        start: req.body.start,
        end: req.body.end
    }

    cycle.getData(res,id)
});


// middle ware api
router.get('/getjobs', function(req, res, next) {
    res.send(storage.jobs);
    storage.jobs = {};
});

router.post('/feedbackdata', function(req, res, next) {
    let sqlData = req.body.sqlData;
    console.log("===========>   return query data:")
    console.log(sqlData);
    console.log(req.body);
    // let index = Object.getOwnPropertySymbols(sqlData);
    storage.data = Object.assign(storage.data, sqlData);
    console.log(storage.data);
    res.send("get data");
});


// data watch api
router.get('/getResults', function(req, res, next) {
    res.send(storage.data);
});

router.get('/cleanResults', function(req, res, next) {
    storage.data = {};
    res.send('done');
});

module.exports = router;
