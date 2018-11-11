var letter = require("./letter")
module.exports.Word = function(arg){
    this.val = arg.split("");    
    for(var i=0;i<this.val.length;i++){
        this.val[i] = new letter.Letter(this.val[i])
    }
    this.output = function(arg){
        var display = "";
        for (var i=0;i<this.val.length;i++){
            display += this.val[i].print() + " ";
        }
        return display;
    };
    this.eval = function(input){
        var response = false;
        if (/[a-z]{1}/i.test(input)){
            for(i=0;i<this.val.length;i++)
            {
                if (input.toUpperCase() == this.val[i].value || input.toLowerCase() == this.val[i].value){
                    this.val[i].guessed = true;
                    response = true;
                }
            }
            return response;
        }else{
            console.log("Please input a single letter")
            return true;
        }
    }
} 
