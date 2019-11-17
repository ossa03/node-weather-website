console.log('Client side JavaScript loaded !');

// form取得
const weatherForm = document.querySelector('form');
// searchボタンクリックしたら天気取得する
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#location')
    const address = input.value;
    const URL = `/weather/?address=${address}`;

    const messageOne = document.querySelector('#messageOne');
    const messageTwo = document.querySelector('#messageTwo');

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
                messageTwo.textContent = `今の天気は${data.forecast.summary} 気温${data.forecast.temperature}℃ 降水確率${data.forecast.precipProbability}%`
                // console.log(data);
            }
        })
        .catch(err => console.log(err))
});

// 現在地の経度、緯度取得
const getPresentLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        return {
            latitude: position.coords.latitude,  // 緯度
            longitude: position.coords.longitude  // 経度
        }
    })
}