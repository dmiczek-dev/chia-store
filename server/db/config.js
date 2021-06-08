const { Client } = require('pg');

let client;

exports.dbConnect = () => {
    client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });

    // Handle disconnect
    client.on('error', () => {
        connect();
    });

    // Trying to resolve connection every 10 sec
    client.connect((err) => {
        if (err) {
            console.dir(err);
            setTimeout(() => {
                connect();
            }, 10000);
        } else {
            console.dir('Connected to PostgreSQL');
        }
    })
}

exports.getClient = () => { return client }
