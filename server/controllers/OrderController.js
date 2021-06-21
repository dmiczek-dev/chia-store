const jwt = require('jsonwebtoken');
const { getClient } = require('../db/config')

exports.getAdminOrders = (req, res) => {
    const client = getClient();
    const orderId = req.params.id;
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    if (payload.permission === 'ADMIN') {
        if (orderId === null || orderId === undefined) {
            client.query("SELECT * FROM orders").then((result) => {
                res.status(200).send(result.rows);
            }).catch((err) => {
                res.status(500).send({ error: err })
            })
        } else {
            client.query("SELECT * FROM orders WHERE order_id = $2", [orderId]).then((result) => {
                res.status(200).send(result.rows);
            }).catch((err) => {
                res.status(500).send({ error: err })
            })
        }
    } else {
        res.status(401).send({ message: 'Unauthorized request' })
    }


}

exports.getUserOrders = (req, res) => {
    const client = getClient();
    const orderId = req.params.id;
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    if (payload.permission === 'USER') {
        if (orderId === null || orderId === undefined) {
            client.query("SELECT * FROM orders WHERE user_id = $1", [payload.userId]).then((result) => {
                res.status(200).send(result.rows);
            }).catch((err) => {
                res.status(500).send({ error: err })
            })
        } else {
            client.query("SELECT * FROM orders WHERE user_id = $1 AND order_id = $2", [payload.userId, orderId]).then((result) => {
                res.status(200).send(result.rows);
            }).catch((err) => {
                res.status(500).send({ error: err })
            })
        }
    } else {
        res.status(401).send({ message: 'Unauthorized request' })
    }
}

exports.createOrder = (req, res) => {
    const client = getClient();

    const plots = req.body.plots;
    const price = req.body.price;
    const poolKey = req.body.pool_key;
    const farmerKey = req.body.farmer_key;
    const orderStatusId = req.body.order_status_id;
    const orderTypeId = req.body.order_type_id;
    const currentDate = new Date();
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const company = req.body.company;
    const city = req.body.city;
    const street = req.body.street;
    const NIP = req.body.NIP;
    const phone = req.body.phone;

    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("INSERT INTO orders(transaction_id, plots, price, date, pool_key, farmer_key, user_id, order_status_id, order_type_id, fistname, lastname, company, city, street, NIP, phone) VALUES(NULL, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        [plots, price, currentDate, poolKey, farmerKey, payload.userId, orderStatusId, orderTypeId, firstname, lastname, company, city, street, NIP, phone]).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({ error: err })
        });

}

exports.editOrder = (req, res) => {
    const client = getClient();

    const orderId = req.body.order_id;
    const plots = req.body.plots;
    const price = req.body.price;
    const poolKey = req.body.pool_key;
    const farmerKey = req.body.farmer_key;
    const orderTypeId = req.body.order_type_id;
    const currentDate = new Date();
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const company = req.body.company;
    const city = req.body.city;
    const street = req.body.street;
    const NIP = req.body.NIP;
    const phone = req.body.phone;

    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("UPDATE orders SET plots = $1, price = $2, date = $3, pool_key = $4, farmer_key = $5, order_type_id = $6, firstname = $7, lastname = $8, company = $9, city = $10, street = $11, NIP = $12, phone = $13 WHERE user_id = $14 AND order_id = $15 AND order_status_id IN (SELECT order_status_id FROM order_status WHERE name = 'NOWE')",
        [plots, price, currentDate, poolKey, farmerKey, orderTypeId, firstname, lastname, company, city, street, NIP, phone, payload.userId, orderId]).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({ error: err })
        });
}

exports.deleteOrder = (req, res) => {
    const client = getClient();

    const orderId = req.body.order_id;

    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("DELETE FROM orders WHERE user_id = $1 AND order_id = $2",
        [payload.userId, orderId]).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({ error: err })
        });
}

exports.getOrderStatus = (req, res) => {
    const client = getClient();
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    console.log(token);

    client.query("SELECT * FROM order_status").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.getOrderTypes = (req, res) => {
    const client = getClient();
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    console.log(token);

    client.query("SELECT * FROM order_types").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}