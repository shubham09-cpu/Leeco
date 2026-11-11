const { createClient } = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'cherry-essential-jar-12061.db.redis.io',
        port: 16486
    }
});

module.exports=redisClient;