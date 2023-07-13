 //let typing_speed = (actualWords / totalTimeTaken) * 60;
 //17:26
 
 const typing_ground = document.querySelector('#textarea');
 const btn = document.querySelector('#btn');
 const score = document.querySelector('#score');
 const show_sentence = document.querySelector('#showSentence');
 const show_time = document.querySelector('#show-time');

 let startTime, endTime, totalTimeTaken, sentence_to_write;

 const sentences = ['The moment you become aware, you are free', 'The best way to find yourself is to lose yourself in the service of others', 'The only way to reach your goals is to never give up'];

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
    //console.log(show_sentence);

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

    show_sentence.innerHTML = 'You did great but I feel can do much better';
    typing_ground.value = ' ';
 }

 const errorChecking = (words) => {
    sentence_to_write = show_sentence.innerHTML; 
    sentence_to_write = sentence_to_write.split(" ");
    console.log(sentence_to_write); //sentence displayed

    console.log(words); //sentence I typed
    let num = 0;
    for(let i = 0; i<words.length; i++){
      if(words[i] === sentence_to_write[i]){
          num++;
      }
    }
    return num;
 }

 const calculateTypingSpeed = (time_taken) => {
    let totalWords = typing_ground.value.trim(); //.trim() - start and end space removal
    //let actualWordsNumber = totalWords === "" ? 0 : totalWords.split(" ").length;
    let actualWords = totalWords === "" ? 0 : totalWords.split(" ");
    // console.log(totalWords);
    // console.log(totalWords.split(" "));
    
    actualWords = errorChecking(actualWords);
    
    if(actualWords !== 0){
      let typing_speed = (actualWords / time_taken) * 60;
      typing_speed = Math.round(typing_speed);
      score.innerHTML = `Your typing speed is ${typing_speed} words per minute, you wrote ${actualWords} correct words out of ${sentence_to_write.length} words & took ${time_taken} sec for typing`;
    }
    else{
      score.innerHTML = `Your typing speed is 0 words per minute as you did not write anything, you took ${time_taken} sec for nothing`
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
 


