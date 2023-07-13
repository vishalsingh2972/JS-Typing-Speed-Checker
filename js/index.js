 //let typing_speed = (actualWords / totalTimeTaken) * 60;
 //17:26
 
 const typing_ground = document.querySelector('#textarea');
 const btn = document.querySelector('#btn');
 const score = document.querySelector('#score');
 const show_sentence = document.querySelector('#showSentence');
 const show_time = document.querySelector('#show-time');

 let startTime, endTime, totalTimeTaken;

 const sentences = ['The quick brown fox jumps 1', 'The quick brown fox jumps 2', 'The quick brown fox jumps 3'];

 let intervalID, elapsedTime = 0;

 const showTimer = () => {
      if(btn.innerText === "Done"){
          intervalID = setInterval(() => {
            elapsedTime++;
            show_time.innerHTML = elapsedTime; 
          }, 1000);
      }
      else if(btn.innerText === "Start"){
          clearInterval(intervalID);
          //console.log(elapsedTime);
            elapsedTime = 0;
            show_time.innerHTML = elapsedTime; 
      }
 }

 const startTypingTest = () => {
    let randomNumber = Math.floor(Math.random() * sentences.length);
    show_sentence.innerHTML = sentences[randomNumber];
    //console.log(show_sentence.innerHTML);

    let date = new Date();
    startTime = date.getTime();
    btn.innerText = 'Done';

    showTimer();
 }

 const endTypingTest = () => {
    btn.innerText = 'Start';
    showTimer();

    let date = new Date();
    endTime = date.getTime();

    totalTimeTaken = (endTime - startTime) / 1000;
   
    calculateTypingSpeed(totalTimeTaken);

    show_sentence.innerHTML = 'filhal kuch nahi likha hain aapne';
    typing_ground.value = ' ';
 }

 const errorChecking = (words) => {
    //console.log(words);
    

 }


 const calculateTypingSpeed = (time_taken) => {
    let totalWords = typing_ground.value.trim(); 
    let actualWordsNumber = totalWords === "" ? 0 : totalWords.split(" ").length;
    let actualWords = totalWords === "" ? 0 : totalWords.split(" ");
    
    actualwords = errorChecking(actualWords);

    if(actualWordsNumber !== 0){
      let typing_speed = (actualWordsNumber / time_taken) * 60;
      typing_speed = Math.round(typing_speed);
      score.innerHTML = `Your typing speed is ${typing_speed} words per minute, you wrote ${actualWordsNumber} words & took ${time_taken} sec for typing`;
    }
    else{
      score.innerHTML = `Your typing speed is 0 words per minute, and you took ${time_taken} sec basically doing nothing`
    }
 }

 btn.addEventListener('click', () => {
      switch(btn.innerText.toLowerCase()){
          case "start":
            typing_ground.removeAttribute('disabled');
            startTypingTest();
            break;

          case "done":
            typing_ground.setAttribute('disabled', 'true');
            endTypingTest();
            //break;
      }
 })





