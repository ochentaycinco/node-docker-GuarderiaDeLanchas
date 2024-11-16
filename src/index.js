const userRouter = require('./routes/user.router.js');
const vehicleRouter = require('./routes/vehicle.router.js');
const reservasRouter = require('./routes/reservas.router.js')
const shopRouter = require('./routes/shop.router.js')
const cartRouter = require('./routes/cart.router.js')
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis').default;  // Conectas el store
const {createClient} = require('redis');  // Importas redis desde el paquete correcto
const cors = require('cors')
const { MONGO_USER, MONGO_PASSWORD, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

// Crear el cliente Redis correctamente
let redisClient = createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
});

redisClient.connect().catch(console.error);  // Conectar el cliente Redis

let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp",
});

const app = express();
app.use(express.json());
app.use(cors())

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:27017/dbname?authSource=admin`;

const connectWithRetry = () => {
    mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to DB"))
    .catch((err) => {
        console.log(err);
        setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(session({
    store: redisStore,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3000000
    }
}));

app.use('/api/users', userRouter);
app.use('/api/vehicles', vehicleRouter);
app.use('/api/reservas', reservasRouter)
app.use('/api/shop', shopRouter)
app.use('/api/cart', cartRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
