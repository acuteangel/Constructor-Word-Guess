var fs = require("fs");
var inquirer = require("inquirer");
var word = require("./word.js");
var musWordBank = ["Bokura no LIVE Kimi to no LIFE",
                "Eien Friends",
                "Music S.T.A.R.T!!",
                "LOVELESS WORLD",
                "Nightingale Love Song",
                "Yuujou no Change",
                "Aki no Anata no Sora Tooku",
                "Snow halation",
                "Takaramonozu",
                "baby maybe Koi no Button",
                "Futari Happiness",
                "Paradise Live",
                "Fuyu ga Kureta Yokan",
                "Love marginal",
                "Sore wa Bokutachi no Kiseki",
                "Datte Datte Aa Mujou",
                "sweet&sweet holiday",
                "Trouble Busters",
                "Bokura wa Ima no Naka de",
                "Diamond Princess no Yuutsu",
                "Donna Toki mo Zutto",
                "COLORFUL VOICE",
                "Love Novel",
                "No brand girls",
                "Shiranai Love＊Oshiete Love",
                "START：DASH!!",
                "Yume no Tobira",
                "A.no.ne.ga.nbare!",
                "SENTIMENTAL StepS",
                "Wonderful Rush",
                "Love wing bell",
                "Natsuiro egao de 1,2, Jump!",
                "Dancing stars on me!",
                "Mermaid festa vol.1",
                "Pure girls project",
                "Cutie Panther",
                "KiRa-KiRa Sensation!",
                "Mogyutto `LOVE` de Sekkin Chuu!",
                "Aishiteru Banzai!",
                "Binetsu Kara Mystery",
                "Happy maker!",
                "Shangri-La Shower",
                "Ruteshi Kisuki Shiteru"
                ];

console.log("Love Live Word Guess Game!")
var solution;
var guesses = 6;
var lineOne = "|";
var lineTwo = "|";
var lineThree = "|";
var wrongArr = [];
initiate();
function game(){
    if (solution.output().indexOf("_") < 0){
        gameEnd(true);
    } else {
        console.log("Wrong letters: "+ wrongArr)
        console.log(" _________     ");
        console.log("|         |    ");
        console.log(lineOne);
        console.log(lineTwo);
        console.log(lineThree);
        console.log("|              ");
        console.log("|              ");
        inquirer.prompt([
            {
                name:"input",
                type:"input",
                message: "Guess a letter!\n" + solution.output()+"\n"
            }
        ]).then(function(response){            
            guess(solution.eval(response.input), response.input);            
        })
    }
}

function initiate(){
    solution = musWordBank[Math.floor(Math.random()*43)];
    solution = new word.Word(solution);
    game();
}

function gameEnd(result){
    console.log("Wrong letters: "+ wrongArr)
    console.log(" _________     ");
    console.log("|         |    ");
    console.log(lineOne);
    console.log(lineTwo);
    console.log(lineThree);
    console.log("|              ");
    console.log("|              ");
    console.log(solution.output())
    if (result){
        console.log("You win!")
    } else {
        console.log("You lost!")
    }
    inquirer.prompt([{
        name: "input",
        type: "list",
        choices: ["Yes", "No"],
        message: "Play again?"
    }]).then(function(response){
        if (response.input == "Yes"){            
            guesses = 6;
            lineOne = "|";
            lineTwo = "|";
            lineThree = "|";
            wrongArr = [];
            initiate();
        }
    })
}

function guess(bool, input){
    if (!bool){
        wrongGuess(input);
    } else {
        game();
    }
}

function wrongGuess(input){   
    if (wrongArr.indexOf(input.toUpperCase()) < 0){
        guesses--;
        wrongArr.push(input.toUpperCase())
        switch(guesses){
            case 5: lineOne = "|         0";
                game();
                break;
            case 4: lineTwo = "|         |";
                game();
                break;
            case 3: lineThree = "|        /";
                game();
                break;
            case 2: lineThree += " \\";
                game();
                break;
            case 1: lineTwo = "|        /|";
                game();
                break;
            case 0: lineTwo += "\\";
                gameEnd(false);
                break;
        }
    } else {
        game();
    }
}