const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Paths for express
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static dir to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sebastian'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sebastian'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Some help text',
        title: 'Help',
        name: 'Sebastian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'Address required'
        });
    }

    const address = req.query.address;

    geocode(address, (error, location) => {
        if (error) {
            return res.status(400).send({ error });
        }
        forecast(location, (error, forecast) => {
            if (error) {
                return res.status(400).send({ error });
            }
            res.send({
                forecast,
                location: location.location,
                address
            });
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.status(400).send({
            error: 'Search term required'
        })
    }

    res.send({
        products: []
    });

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Sebastian'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        name: 'Sebastian'
    });
})

app.listen(80, () => {
    console.log('Server is up');
});
