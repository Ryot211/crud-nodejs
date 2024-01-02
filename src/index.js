import express from 'express'
import carroRoutes from './routes/carro.routes.js'
import indexRoutes from './routes/index.routes.js'

import {PORT} from './config.js'

const app =express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api',carroRoutes)

app.use((req, res , next ) =>{
    res.status(404).json({
        message:'endpoint Not found '
    })
} )

app.listen(PORT)