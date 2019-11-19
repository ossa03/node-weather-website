const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const PORT = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Ossa"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Ossa"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help!",
        helpText: "This is some Helpful text",
        name: "Ossa"
    })
})

app.get('/weather', (req, res) => {
    // 現在地の経度と緯度を取得できた場合
    if (req.query.latitude && req.query.longitude) {
        forecast(req.query.latitude, req.query.longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err })
            } else {
                res.send({
                    forecast: forecastData
                })
            }
        })
    } else {
        // 現在位置を取得できない場合の処理
        if (!req.query.address) {
            return res.send({
                error: "You must provide an address"
            })
        }
        geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
            if (err) {
                return res.send({ "error": err })
            }
            // const { latitude, longitude, location } = data
            forecast(latitude, longitude, (err, forecastData) => {
                if (err) {
                    return res.send({ err })
                } else {
                    res.send({
                        forecast: forecastData,
                        location: location,
                        address: req.query.address
                    })
                }
            })
        })
    }
})
// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "You must provide an address"
//         })
//     }
//     geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
//         if (err) {
//             return res.send({ "error": err })
//         }
//         // const { latitude, longitude, location } = data
//         forecast(latitude, longitude, (err, forecastData) => {
//             if (err) {
//                 return res.send({ err })
//             } else {
//                 res.send({
//                     forecast: forecastData,
//                     location: location,
//                     address: req.query.address
//                 })
//             }
//         })
//     })
// })


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Ossa",
        errorMessage: "Help article not found !"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Ossa",
        errorMessage: "Page not found !"
    })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));