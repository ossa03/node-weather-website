const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // 'darksky.net/dev' のAPI_KEY
    const API_KEY = "2a7de4d7ce6b3b93b154ba0b9eb4ec76"
    const qs = '?units=si&lang=ja'
    const url = `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}${qs}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            //! callback(error用の引数, success用の引数)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const data = body.currently
            callback(undefined, {
                summary: data.summary,
                temperature: data.temperature,
                precipProbability: Math.floor(data.precipProbability * 100),
                windSpeed: data.windSpeed,
                pressure: data.pressure
            })
        }
    })
}

module.exports = forecast