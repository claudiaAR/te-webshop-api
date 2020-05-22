const express = require('express')
const cookieSession = require('cookie-session')
const app = express()
require('./connect-db') //Establish connection to mongodb.
const cors = require('cors') // Needed for cross origin.
const port = 9000   //API server port.

const userRoute = require('./routers/user')

app.use(cors({ credentials: true, origin: ['http://localhost:3000']}))
app.use(cookieSession({
    secret: 'SuperSecretCode',
    maxAge: 1000 * 60 * 1, //1 min cookie timeout.
    sameSite: 'strict',
    httpOnly: true,
    secure: false
}))
app.use(express.json())
app.use(userRoute)

app.get('/', (req, res) => res.json({someText: 'From express API! :9000!'}))

app.listen(port, () => console.log(`Server http://localhost:${port}`))