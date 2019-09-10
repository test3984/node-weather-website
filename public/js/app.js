console.log('Client side js file');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    const location = search.value;

    fetch(`/weather?address=${location}`).then(res => {
        if (res.status === 400) {
            throw new Error('Bad request');
        }
    
        return res.json();
    }).then(res => {
        messageOne.textContent = 'Forecast: ' + res.forecast;
        messageTwo.textContent = 'Address: ' + res.address;
    }).catch(err => messageOne.textContent = err);
});