const { getClient } = require('../db/config')
const axios = require('axios');
const querystring = require('querystring');
const logger = require('../helpers/logger');

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

    const productId = req.body.productId;

    client.query("SELECT * FROM products WHERE product_id = $1", [productId]).then((result) => {
        const productPrice = result.rows[0].price;
        const plots = req.body.plots;
        const totalPrice = plots * productPrice;
        const poolKey = req.body.poolKey;
        const farmerKey = req.body.farmerKey;
        const orderStatusId = 1; // 1 = NOWE
        const currentDate = new Date();
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const company = req.body.company;
        const city = req.body.city;
        const street = req.body.street;
        const NIP = req.body.NIP;
        const phone = req.body.phone;

        client.query("INSERT INTO orders(plots, total_price, date, pool_key, farmer_key, user_id, product_id, order_status_id, firstname, lastname, company, city, street, nip, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING order_id",
            [plots, totalPrice, currentDate, poolKey, farmerKey, payload.userId, productId, orderStatusId, firstname, lastname, company, city, street, NIP, phone]).then((result) => {
                res.status(200).send(result.rows);
            }).catch((err) => {
                res.status(500).send({ error: err })
            });
    }).catch((err) => {
        res.send(500).send({ error: err })
    })
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

exports.payOrder = (req, res) => {
    const client = getClient();
    const orderId = req.body.orderId;

    //Autoryzacja PayU - pobranie tokenu
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
        let accessToken = response.data.access_token;

        //Pobranie informacji o zamówieniu
        client.query('SELECT * FROM orders_view WHERE order_id = $1', [orderId]).then((result) => {
            let order = result.rows[0];

            //Pobranie informacji o produkcie
            client.query('SELECT * FROM products WHERE product_id = $1', [order.product_id]).then((result) => {
                let product = result.rows[0];

                //Wysłanie żądania do PayU
                axios({
                    method: 'POST',
                    maxRedirects: 0,
                    url: 'https://secure.payu.com/api/v2_1/orders',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                    data: {
                        "customerIp": "127.0.0.1",
                        "notifyUrl": `${process.env.PAYU_NOTIFY_URL}`,
                        "merchantPosId": `${process.env.PAYU_ID}`,
                        "description": `${process.env.PAYU_NAME}`,
                        "continueUrl": `${process.env.PAYU_CONTINUE_URL}`,
                        "currencyCode": "PLN",
                        "totalAmount": `${parseInt(order.total_price * 100, 10)}`,
                        "buyer": {
                            "email": `${order.email}`,
                            "phone": `${order.phone}`,
                            "firstName": `${order.firstname}`,
                            "lastName": `${order.lastname}`,
                        },
                        "products": [
                            {
                                "name": `${product.name}`,
                                "unitPrice": `${parseInt(product.price * 100, 10)}`,
                                "quantity": `${order.plots}`
                            }
                        ]
                    },
                    validateStatus: function (status) {
                        return status >= 200 && status <= 302
                    }
                }).then(function (response) {
                    const transactionId = response.data.orderId;
                    client.query('UPDATE orders SET transaction_id = $1 WHERE order_id = $2', [transactionId, order.order_id]).catch((err) => {
                        return res.status(500).send(err)
                    })
                    logger.info(response.data)
                    return res.status(200).send(response.data)
                }).catch(function (error) {
                    console.log(error);
                    res.status(500).send(error)
                })

            }).catch((err) => {
                res.status(500).send({ error: err });
            })
        }).catch((err) => {
            res.status(500).send({ error: err })
        })
    }).catch(function (error) {
        console.log(error);
    })
}

exports.notifyOrder = (req, res) => {
    logger.info(req.body)
    const client = getClient();

    const status = req.body.order.status;
    const transactionId = req.body.order.orderId;

    client.query("UPDATE orders SET status = $1 WHERE transaction_id = $2", [status, transactionId]).then((result) => {
        res.status(200).send();
    }).catch((err) => {
        res.status(500).send()
    })
}
