var router = require('express').Router();
var pool = require('../modules/pool.js');

router.post('/:id', function(req, res) {
    var petId = req.params.id;
    var newVisit = {
        dateIn: req.body.dateIn,
        dateOut: req.body.dateOut
    };
    console.log(petId);
    pool.connect(function(connectionError, client, done) {
        if(connectionError) {
            console.log(connectionError);
            res.sendStatus(500);
        } else {
            var pQuery = 'INSERT INTO visits (check_in, check_out, pet_id) VALUES ($1, $2, $3)';
            var values = [newVisit.dateIn, newVisit.dateOut, petId]
            client.query(pQuery, values, function(queryError, resultObj) {
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

module.exports = router;