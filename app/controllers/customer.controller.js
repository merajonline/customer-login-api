var Customer = require('../models/customer.model.js');

exports.create = function(req, res) {
    // Create and Save a new Note
    if(!req.body.content) {
        res.status(400).send({message: "customer details can not be empty!"});
    }
    var customer = new Customer({emailId: req.body.emailId || "Untitled Customer", mobileNo: req.body.mobileNo, name:req.body.name || "no name", password:req.body.password});

    customer.save(function(err, data) {
        console.log(data);
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Customer."});
        } else {
            res.send(data);
        }
    });

};

exports.findAll = function(req, res) {
    // Retrieve and return all notes from the database.

    Customer.find(function(err, customers){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving customer details."});
        } else {
            res.send(customers);
        }
    });

};

exports.findOne = function(req, res) {
    // Find a single note with a noteId
    Customer.findById(req.params.customerId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve customer details with id " + req.params.customerId});
        } else {
            res.send(data);
        }
    });

};

exports.update = function(req, res) {
    // Update a note identified by the noteId in the request

    Customer.findById(req.params.customerId, function(err, customer) {
        if(err) {
            res.status(500).send({message: "Could not find a customer details with id " + req.params.customerId});
        }

        customer.emailId = req.body.emailId;
        customer.mobileNo = req.body.mobileNo;
        customer.name = req.body.name;
        customer.password = req.body.password;

        customer.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update customer details with id " + req.params.customerId});
            } else {
                res.send(data);
            }
        });
    });

};

exports.delete = function(req, res) {
    // Delete a note with the specified noteId in the request
    Customer.remove({_id: req.params.customerId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete customer details with id " + req.params.id});
        } else {
            res.send({message: "customer details deleted successfully!"})
        }
    });

};
