module.exports.Letter = function(val){
    this.value = val;
    this.guessed = false;
    if (!/[a-z]{1}/i.test(val)){
        this.guessed = true
    }
    this.print = function(){
        if (this.guessed){
            return this.value;
        } else {
            return "_"
        }
    }
    this.check = function(arg){
        if (arg==this.value){
            this.guessed = true;            
        }
        this.print();
    }
}
