const config = {

    appConfig:
    {
        port:process.env.APP_PORT || 3000,
        host: process.env.APP_HOST || 'localhost',
    },
    
    dbConfig:
    {
        port: process.env.DB_PORT || 27017,
        host: process.env.DB_HOST || 'localhost',
        dbName: process.env.DB_NAME 
    }
    
    }
    
    module.exports = config;