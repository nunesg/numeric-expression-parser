const {Lexer} = require("./Lexer/lexer-module");
const {Parser} = require("./Parser/parser-module");


class Main{
    constructor(text) {
        this.text = text;
        this.lexer = new Lexer(text);
        this.parser = new Parser(this.lexer);
        const result = this.parser.parse();
        console.log(`${text} = ${result}`);
    }
}

// passar uma expressao numerica com apenas +,-,*,/,numeros negativos e parenteses
const main = new Main("-2*---7+3");