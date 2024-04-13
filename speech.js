const btn =document.querySelector(".btn");
const content=document.querySelector(".btn-text");
const click_text= `<i class="fa-solid fa-microphone" style="color: black; font-size: 2rem;"></i>
<span class="speak">Click me to speak!</span>`;

// function to speak some senetence
function speakThis(sentence)
{
    const speech=new SpeechSynthesisUtterance(sentence);
    const allvoices=speechSynthesis.getVoices();
    speech.lang='hi';
    speech.volume=1;
    speech.rate=1;
    speech.pitch=1;
    speech.voice=allvoices[30];
    window.speechSynthesis.speak(speech);
}

// function to wish according to time

function wishMe(){
    let dateObj=new Date();
    let hr=dateObj.getHours();
    if(hr>=0 && hr<12)
    {
        speakThis("Good Morning Sir");
    }
    else if(hr==12)
    {
        speakThis("Good Noon Sir");
    }
    else if(hr>12 && hr<16)
    {
        speakThis("Good AfterNoon Sir");
    }
    else{
        speakThis("Good Evening Sir")
    }

}

window.addEventListener('load',()=>{
    speakThis("Activating Vikram");
    speakThis("Getting Ready")
    wishMe();
    speakThis("My name is VIKRAM");
    speakThis("I am your personal voice assistant");
    speakThis("How may I assist you Today");
});

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;

// function to recover textContent of button
function recoverButton(content)
{
    content.textContent="Click me to speak!";

}
const recognition=new SpeechRecognition();

btn.addEventListener('click',()=>
{
    recognition.start();
    btn.style.border="8px solid turquoise"

});
recognition.onresult=(event)=>{
    const current=event.resultIndex;
    const transcript=event.results[current][0].transcript;
    content.textContent=transcript.toLowerCase()+"..";
    btn.style.border="2px solid #00bcd4";
    speakMessage(transcript.toLowerCase());
    setTimeout(recoverButton,2500,content);
};

const recognitionForCopy=new SpeechRecognition();
recognitionForCopy.lang='hi';

recognitionForCopy.onresult = (event) => {
    const currentReco = event.resultIndex;
    const textToCopy = event.results[currentReco][0].transcript;
    speakThis(textToCopy.toLowerCase());
};

// function for start recognition when copy me is commanded by user

function startReco(recognitionForCopy)
{
    recognitionForCopy.start();
}

//function to perform tasks according to recognition

function speakMessage(message)
{
    const speech=new SpeechSynthesisUtterance();
    speech.text="Sorry,I could Not understand what you say please try again"
    if((message.includes("hello")|| message.includes("hi")||message.includes("namaste"))&&message.includes("vikram"))
    {
        const finalText="Hello sir";
        speech.text=finalText;
    }
    else if(message.includes("what can you do for me")||message.includes("your introduction"))
    {
        const finalText=`I can do many things for you like copying your speech(say copy me if you want to test)
        ,opening google,opening youtube,open gmail and many more
        `
        speech.text=finalText;
    }
    else if(message.includes("copy me"))
    {
        speakThis("speak now...");
        const mytime=setTimeout(startReco,1400,recognitionForCopy)
        return;
    }
    else if(message.includes("how are you"))
    {
        const finalText="I am fine Sir.How can I help you";
        speech.text=finalText;
    }
    else if(message.includes("who are you"))
    {
        const finalText="I am your personal voice assistant";
        speech.text=finalText;
    }
    else if(message.includes("your name"))
    {
        const finalText="My name is Vikram";
        speech.text=finalText;

    }
    else if(message.includes("what do you do"))
    {
        const finalText="I follow orders of my master";
        speech.text=finalText;

    }
    else if(message.includes("name of master")||message.includes("master")||message.includes("father"))
    {

        const finalText="My master is Mr. Harsh Dhunna";
        speech.text=finalText;
    }
    else if(message.includes("when were you born")||message.includes("your birthday"))
    {
        const finalText="My birthday is on 28 August 2023";
        speech.text=finalText;

    }
    else if(message.includes("what")||message.includes("who")||message.includes("how")||message.includes("why"))
    {
        window.open(`https://www.google.com/search?q=${message.replace(" ","+")}`,"_blank");
        const finalText="This is what i found on google for "+message;
        speech.text=finalText;

    }
    else if(message.includes("open google"))
    {
        window.open("https://www.google.com","_blank");
        const finalText="Opening google";
        speech.text=finalText;

    }
    else if(message.includes("open youtube"))
    { 
        window.open("https://www.youtube.com","_blank");
        const finalText="Opening youtube";
        speech.text=finalText;
    }
    else if (message.includes("open gmail"))
    {
        window.open("https://www.gmail.com","_blank");
        const finalText="opening gmail";
        speech.text=finalText;

    }
    else{
        window.open(`https://www.google.com/search?q=${message.replace(" ","+")}`,"_blank");
        const finalText="I found some information for" + message+" On google";
        speech.text=finalText;
    }
    speech.volume=1;
    speech.pitch=1;
    speech.rate=1;
    window.speechSynthesis.speak(speech);
}
