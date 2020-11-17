const db = require('../models');
const Employee = db.employees;

//create and save a new Employee
exports.create = (req, res) => {
    // Validate request
    if ((!req.body.first_name) || (!req.body.email) || (!req.body.title)){
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Employee
    const employee = new Employee({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        title: req.body.title,
        published: req.body.published ? req.body.published : false
    });

    // Save Employee in the database
    employee
        .save(employee)
        .then(data => {
            res.send(data);
            console.log("Saved to database!" + data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Employee."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Employee.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Employee.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Employee with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Employee with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
                });
            } else res.send({ message: "Employee was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Employee.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
                });
            } else {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Employees were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all employees."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Employee.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employees."
            });
        });
};
