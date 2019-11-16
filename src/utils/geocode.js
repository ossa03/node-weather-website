const request = require('request')

const geocode = (address, callback) => {
    const ACCESS_TOKEN = 'pk.eyJ1Ijoib3NzYTAzIiwiYSI6ImNrMmlpYXI4ajE1bGwzY21zamttejdvbW0ifQ.eqEQ308ubAIg9JeWakXXCQ'
    const qs2 = '&limit=1&lang=ja'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${ACCESS_TOKEN}${qs2}`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            //! callback(error用の引数, success用の引数)
            callback('Unable to connect to weather service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Tyr another search ', undefined)
        } else {
            const data = body.features[0]
            callback(undefined, {
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name
            })
        }
    })
}

module.exports = geocode