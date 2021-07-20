const { getClient } = require('../db/config')

exports.getProducts = (req, res) => {
  const client = getClient();

  client.query('SELECT * FROM products').then((result) => {
    res.status(200).send(result.rows)
  }).catch((err) => {
    res.status(404).send({ error: err })
  })
}

exports.createProduct = (req, res) => {
  const client = getClient();
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productActive = req.body.productActive;

  client.query('INSERT INTO products(name, price, active) VALUES ($1, $2, $3)',
    [productName, productPrice]).then((result) => {
      res.status(200).send({ message: 'Product created successfully' })
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
}

exports.editProduct = (req, res) => {
  const client = getClient();
  const productId = req.body.productId;
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productActive = req.body.productActive;

  client.query('UPDATE products SET name = $1, price = $2, active = $3 WHERE product_id = $4',
    [productName, productPrice, productActive, productId]).then((result) => {
      res.status(200).send({ message: 'Product changed successfully' })
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
}

exports.deleteProduct = (req, res) => {
  const client = getClient();
  const productId = req.body.productId;

  client.query('DELETE FROM products WHERE product_id = $1',
    [productId]).then((result) => {
      res.status(200).send({ message: 'Product deleted successfully' })
    }).catch((err) => {
      res.status(500).send({ error: err })
    })
}