
const db = require('./db.config');
const Customer = db.customers;

async function createCustomer(req, res, next) {
    try {
        const { name, email, age } = req.body;

        if (!name || !email || !age) {
            return res.status(400).send({
                message: 'Bad Data'
            });
        }

        const customer = await Customer.create({
            name: name,
            email: email,
            age: age
        });

        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

async function getAllCustomers(req, res, next) {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        console.error('Error fetching all customers:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

async function getCustomer(req, res, next) {
    try {
        const customerId = req.params.id;

        if (!customerId) {
            // If no ID is provided, return all customers
            return getAllCustomers(req, res, next);
        }

        const customer = await Customer.findByPk(customerId);

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

async function updateCustomer(req, res, next) {
    try {
        const { name, email, age } = req.body;

        await Customer.update(
            { name, email, age },
            {
                where: {
                    email: email
                }
            }
        );

        res.send(`Customer updated: ${email}`);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

async function deleteCustomer(req, res, next) {
    try {
        const customerEmail = req.params.email;
        const deletedCustomerCount = await Customer.destroy({
            where: {
                email: customerEmail
            }
        });

        if (deletedCustomerCount === 0) {
            return res.status(404).send({ message: 'Customer not found' });
        }

        res.send(`Customer deleted: ${customerEmail}`);
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

async function findCustomerByEmail(req, res) {
    try {
        const customerEmail = req.params.email;
        const customer = await Customer.findByPk(customerEmail);

        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        console.error('Error finding customer by email:', error);
        res.status(500).send(error.message || 'Internal Server Error');
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomerByEmail
};
