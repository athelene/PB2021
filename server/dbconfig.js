const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_DB,
    options: {
        Encrypt: true,
        enableArithPort: true
    },
    port: 1433
}

module.exports = config;