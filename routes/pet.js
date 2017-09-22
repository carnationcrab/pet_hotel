var router = require('express').Router();
var path = require('path');
var pool = require('../modules/pool.js');

router.get('/', function(req, res) {
    console.log('In GET/pet route');
    pool.connect(function(connectionError, client, done){
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM pet_hotel ORDER BY id;', function(queryError, resultObj){
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            })
        }
    })
});
router.post('/', function(req, res) {
    var newPetObj = req.body;
    console.log('baaaaallin');
    console.log(newPetObj);
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var pQuery = 'INSERT INTO pet_hotel (name, breed, color, checkedIn) VALUES ($1, $2, $3, $4)';
            var valueArray = [ newPetObj.name, newPetObj.breed, newPetObj.color, newPetObj.checkedin ];
            client.query(pQuery, valueArray, function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('yaaaaaay');
                    res.sendStatus(202);
                }
            });
        }
    })
})

router.put('/:id', function(req, res) {
    var petId = req.params.id;
    console.log(petId);
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var pQuery = 'UPDATE pet_hotel SET checkedin =NOT checkedin WHERE id = $1;';
            client.query(pQuery, [petId], function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('WORD');
                    res.sendStatus(202);
                }
            });
        }
    }) 
});

router.delete('/:id', function(req, res) {
    var petId = req.params.id;
    console.log(petId);
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var pQuery = 'DELETE FROM pet_hotel WHERE id = $1;';
            client.query(pQuery, [petId], function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                } else {
                    console.log('supercalifragilisticexpealidocious');
                    res.sendStatus(202);
                }
            });
        }
    }) 
});
module.exports = router;