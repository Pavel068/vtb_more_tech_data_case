require('dotenv').config()

const port = process.env.NODE_PORT

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Running node app at http://localhost:${port}`)
});

const { init } = require('./models/init');
(async () => {
    await init()
})();

module.exports = app