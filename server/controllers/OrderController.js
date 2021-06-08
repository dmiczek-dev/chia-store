const jwt = require('jsonwebtoken');
const { getClient } = require('../db/config')

exports.getUserOrders = (req, res) => {
    const client = getClient();
    const orderId = req.params.id;
    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    if (orderId !== null && orderId !== undefined) {
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

    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("INSERT INTO orders(transaction_id, plots, price, date, pool_key, farmer_key, user_id, order_status_id, order_type_id) VALUES(NULL, $1, $2, $3, $4, $5, $6, $7, $8",
        [plots, price, currentDate, poolKey, farmerKey, payload.userId, orderStatusId, orderTypeId]).then(() => {
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
    const orderStatusId = req.body.order_status_id;
    const orderTypeId = req.body.order_type_id;
    const currentDate = new Date();

    const token = req.cookies.JWT
    const payload = jwt.decode(token);

    client.query("UPDATE orders SET plots = $1, price = $2, date = $3, pool_key = $4, farmer_key = $5, order_status_id = $6, order_type_id = $7 WHERE user_id = $8 AND order_id = $9",
        [plots, price, currentDate, poolKey, farmerKey, orderStatusId, orderTypeId, payload.userId, orderId]).then(() => {
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