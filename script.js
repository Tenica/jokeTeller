const button = document.getElementById('button')
const audioElement = document.getElementById('audio')

// VoiceRSS Javascript SDK



function toggleButton(params) {
    button.disabled = !button.disabled
}


async function tellMe(joke) {
    console.log('tell me:', joke);
    VoiceRSS.speech({
                key: '16714e15cbd04a29aac326032c7e5a4a',
                src: joke,
                hl:'en-us',
                r: 0,
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            })
}

//Get Jokes from Joke API

async function getJokes(params) {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Dark,Pun,Spooky?blacklistFlags=racist,sexist'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        const joinJoke = data.setup ? joke = `${data.setup} ... ${data.delivery}` : joke = data.joke;
        tellMe(joinJoke)
        //DisableButton
        toggleButton();
    } catch (error) {
        console.log('whoops', error)  
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)

