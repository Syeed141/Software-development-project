// selecting elements from the page/html (variables)

//step 1 
const wordDisplay =document.querySelector(".word-display"); //targets class wordDisplay

const guessesText =document.querySelector(".guesses-text b"); //targets class wordDisplay
const keyboardDiv =document.querySelector(".keyboard"); //targets class wordDisplay
const hangmanImage =document.querySelector(".hangman-box img"); //targets class wordDisplay
const gameModal =document.querySelector(".game-modal"); //targets class wordDisplay
const playAgainBtn =gameModal.querySelector("button"); //targets class wordDisplay



//step 2
//initializing the game variables


let currentWord,correctLetters,wrongGuessCount;

const maxGuesses=6;

//creating functions



//reset game function

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // create the empty letter slots
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");

    // enable keyboard buttons
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);

    // hide the game modal
    gameModal.classList.remove("show");
}



//resetGame();


//step  3

//function to get a random word and set up the game 

const getRandomWord= () => {



//picking a random word and hint from your wordList array


const{ word, hint} = wordList[Math.floor(Math.random() * wordList.length)]; //generates random index

//set the current word and update the hint 
currentWord = word;
document.querySelector(".hint-text b").innerText=hint;

//call reset game 
resetGame();



}

//function to handle end of game win or lose


const gameOver = (isVictory) => {


//show the game over modal with win or loss


const modalText= isVictory ? `You found the word :` : 'The correct word was :';
gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
gameModal.querySelector("h4").innerText = isVictory ? 'congrats!' : 'Game Over!';
gameModal.querySelector("p").innerHTML =`${modalText} <b> ${currentWord} </b>`;



gameModal.classList.add("show");








}



//step 5
//Creating a for loop to display our keyboard buttons


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");

    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    //adding a click event listenerfor eeach button

    button.addEventListener("click", (e) => initGame(e.target,String.fromCharCode(i)));


    
}




//step 6
//function to handle the game logic a letter is clicked

const initGame= (button, clickedLetter)=> {


    //checking if the clicked letter is in the current word 
    if (currentWord.includes(clickedLetter)) {

        //update the displayed letters if clicked is correct 

        [...currentWord].forEach((letter,index) => {

            if (letter == clickedLetter) {
            correctLetters.push(letter);
            wordDisplay.querySelectorAll("li")[index].innerText = letter;
            wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }



        });
        
    } else {

//update wrong guess count and hangman image if letter guessed is incorrect 

wrongGuessCount++;
hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;



    }

    //disable the clicked button so it cant be clicked again

    button.disabled=true ;
    //update the displayed guess count 

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;


    //check if the game should end based on win or lose conditions


    if (wrongGuessCount == maxGuesses) return gameOver(false);



    if(correctLetters.length == currentWord.length)
    return gameOver(true);






    






}






//starting the game with random word 

getRandomWord();

// add event listener for the play again button 

playAgainBtn.addEventListener("click", getRandomWord);