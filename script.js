const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const translate = document.querySelector("#btnTranslate");
const exchange = document.querySelector(".exchange");
const icons =  document.querySelectorAll(".icons");

for(let lang in languages){
    const option = `<option value="${lang}">${languages[lang]}</option>`
    fromLang.insertAdjacentHTML("beforeend",option);
    toLang.insertAdjacentHTML("beforeend",option);
    fromLang.value="tr-TR";
    toLang.value="en-GB";
}

// const url="https://api.mymemory.translated.net/get?q=Hello World!&langpair=en|it";


// Events

translate.addEventListener("click",()=>{
    const from = fromLang.value;
    const to = toLang.value;
    const text = fromText.value;

    console.log(text);
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`

    fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data.responseData.translatedText);
            toText.value = data.responseData.translatedText;
        });

})

exchange.addEventListener("click",()=>{
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
})

for(let icon of icons){
    icon.addEventListener("click",(e)=>{
        if(e.target.classList.contains("fa-copy")){
            if(e.target.id==="from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(e.target.id==="from"){
                console.log("Speak From");
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;

            }
            speechSynthesis.speak(utterance);
        }
    })
}