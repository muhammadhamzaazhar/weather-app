const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hamza Azhar'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Hamza Azhar',
        title: 'Help',
        plainText: 'This is a plain text'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Hamza Azhar',
        title: 'About Me'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(500).json({ 'error': "Please provide address parameter" });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error)
            return res.send({ error });
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error });
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Hamza Azhar',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Hamza Azhar',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});