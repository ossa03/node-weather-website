const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    res.send({
        forecast: "晴れ",
        location: "Philadelphia",
        address: req.query.address
    })
})

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

app.listen(3000, () => console.log('Server listening on port 3000'))