var express = require('express');
var router = express.Router();

router.get('/:id/Month=:Month/Year=:Year', function(req, res, next)
{
    var start=req.params.Year+'-'+req.params.Month+'-01';
    var end=req.params.Year+'-'+req.params.Month+'-31';
     findCostById(req.params.id, res, start, end, costs => {
            res.render('MonthlyBill', {
                    json:costs
                 });

          });

});

module.exports = router;