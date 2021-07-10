const { getClient } = require('../db/config')
const axios = require('axios');
const querystring = require('querystring');

exports.getAdminOrders = (req, res, next) => {
    const client = getClient();
    client.query("SELECT * FROM orders_view").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.getUserOrders = (req, res, next) => {
    const client = getClient();
    const payload = req.payload;

    client.query("SELECT * FROM orders_view WHERE user_id = $1", [payload.userId]).then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.createOrder = (req, res) => {
    const client = getClient();
    const payload = req.payload;

    const plots = req.body.plots;
    const price = req.body.price;
    const poolKey = req.body.poolKey;
    const farmerKey = req.body.farmerKey;
    const orderStatusId = 1; // 1 = NOWE
    const orderTypeId = req.body.orderTypeId;
    const currentDate = new Date();
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const company = req.body.company;
    const city = req.body.city;
    const street = req.body.street;
    const NIP = req.body.NIP;
    const phone = req.body.phone;

    client.query("INSERT INTO orders(transaction_id, plots, price, date, pool_key, farmer_key, user_id, order_status_id, order_type_id, firstname, lastname, company, city, street, NIP, phone) VALUES(NULL, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        [plots, price, currentDate, poolKey, farmerKey, payload.userId, orderStatusId, orderTypeId, firstname, lastname, company, city, street, NIP, phone]).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({ error: err })
        });
}

exports.editOrder = (req, res) => {
    const client = getClient();
    const payload = req.payload;

    const orderId = req.body.orderId;
    const orderStatusId = req.body.orderStatusId

    client.query("UPDATE orders SET order_status_id = $3 WHERE user_id = $1 AND order_id = $2 AND order_status_id IN (SELECT order_status_id FROM order_status WHERE name = 'NOWE')",
        [payload.userId, orderId, orderStatusId]).then(() => {
            res.status(200).send();
        }).catch((err) => {
            res.status(500).send({ error: err })
        });
}

exports.getOrderStatus = (req, res) => {
    const client = getClient();

    client.query("SELECT * FROM order_status").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.getOrderTypes = (req, res) => {
    const client = getClient();

    client.query("SELECT * FROM order_types").then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        res.status(500).send({ error: err })
    })
}

exports.payOrder = (req, res) => {
    const client = getClient();
    const orderId = req.body.orderId;

    axios({
        method: 'post',
        url: 'https://secure.payu.com/pl/standard/user/oauth/authorize',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: querystring.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.PAYU_ID,
            client_secret: process.env.PAYU_SECRET
        })
    }).then(function (response) {



    }).catch(function (error) {
        console.log(error);
    })

    res.sendStatus(200);
}
