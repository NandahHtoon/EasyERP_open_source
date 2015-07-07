var mongoose = require('mongoose');
var Opportunity = function (models) {
    var access = require("../Modules/additions/access.js")(models);
    var _ = require('../node_modules/underscore');
    var mongoose = require('mongoose');
    var logWriter = require('../helpers/logWriter.js');
    var opportunitiesSchema = mongoose.Schemas['Opportunitie'];



    this.getFilterValues = function (req, res, next) {
        var opportunity = models.get(req.session.lastDb, 'Opportunitie', opportunitiesSchema);

        opportunity.aggregate([
            {
                $group:{
                    _id: null,
                    name: {
                        $addToSet: '$name'
                    },
                    creationDate: {
                        $addToSet: '$creationDate'
                    },
                    nextAction: {
                        $addToSet: '$nextAction.desc'
                    },
                    expectedRevenue: {
                        $addToSet: '$expectedRevenue.value'
                    }
                }
            }
        ], function (err, result) {
            if (err) {
                return next(err);
            }

            res.status(200).send(result);
        });
    }

};

module.exports = Opportunity;