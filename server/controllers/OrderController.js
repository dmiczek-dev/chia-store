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

        client.query("INSERT INTO orders(plots, price, date, pool_key, farmer_key, user_id, product_id, order_status_id, order_type_id, firstname, lastname, company, city, street, NIP, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING order_id",
            [plots, totalPrice, currentDate, poolKey, farmerKey, payload.userId, orderStatusId, firstname, lastname, company, city, street, NIP, phone]).then((result) => {
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

    //Autoryzacja PayU
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
        let accessToken = response.data.accessToken;

        //Pobranie informacji o zamówieniu
        client.query('SELECT * FROM orders WHERE order_id = $1', [orderId]).then((result) => {
            let order = result.rows[0];

            //Pobranie informacji o produkcie
            client.query('SELECT price FROM products WHERE product_id = $1', [order.product_id]).then((result) => {
                let productPrice = result.rows[0].price;

                //Wysłanie żądania do PayU
                axios({
                    method: 'post',
                    url: 'https://secure.payu.com/api/v2_1/orders',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                    data: {
                        "merchantPosId": process.env.PAYU_ID,
                        "description": "Chia zone",
                        "currencyCode": "PLN",
                        "totalAmount": `${order.total_price}`,
                        "products": [
                            {
                                "name": "Cyfrowe pliki (ploty)",
                                "unitPrice": `${productPrice}`,
                                "quantity": `${order.plots}`
                            }
                        ]
                    }

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

    res.sendStatus(200);
}

// data: {
//     access_token: '4e3ec7c5-2b5a-45ed-954a-1d7545c5df2d',
//     token_type: 'bearer',
//     expires_in: 43199,
//     grant_type: 'client_credentials'
//   }
