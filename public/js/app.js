console.log('Client side JavaScript loaded !');

const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');

// form取得
const weatherForm = document.querySelector('form');
// searchボタンクリックしたら天気取得する
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#location')
    const address = input.value;
    const URL = `/weather/?address=${address}`;

    messageOne.textContent = 'Now Loading...';
    messageTwo.textContent = '';
    // APIを叩く
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = `現在の天気は${data.forecast.summary} 気温${data.forecast.temperature}℃ 降水確率${data.forecast.precipProbability}% 風速${data.forecast.windSpeed} 気圧${data.forecast.pressure}`
            }
        })
        .catch(err => console.log(err))
});


//TODO 現在地ボタン押したら現在地の天気を取得できるように
const currentLocation = document.querySelector('#present-location')
currentLocation.addEventListener('click', (e) => {
    e.preventDefault()

    console.log("現在地クリック")
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude  // 緯度
        const longitude = position.coords.longitude  // 経度
        const URL = `/weather/?latitude=${latitude}&longitude=${longitude}`;

        messageOne.textContent = 'Now Loading...';
        messageTwo.textContent = '';
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = `現在の天気は${data.forecast.summary} 気温${data.forecast.temperature}℃ 降水確率${data.forecast.precipProbability}% 風速${data.forecast.windSpeed} 気圧${data.forecast.pressure}`
                }
            })
            .catch(err => console.log(err))
    })
})