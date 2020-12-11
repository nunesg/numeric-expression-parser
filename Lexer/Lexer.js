const tokenModule = require("../Token/token-module");

const {Token, TokenType} = require("../Token/token-module");


const blankCharacters = [' ', '\n'];

class Lexer {
    constructor(text) {
        this.left = 0;
        this.right = 0;
        this.text = text;
    }

    ended() {
        return this.right >= this.text.length;
    }

    isBlank(c) {
        return blankCharacters.includes(c);
    }

    lookAhead() {
        if(this.ended()) return null;
        return this.text[this.right];
    }

    advance() {
        if(this.right < this.text.length) {
            this.right++;
        }
    }

    skipBlank() {
        while(!this.ended() && this.isBlank(this.lookAhead())) {
            this.advance();
        }
        this.left = this.right;
    }

    isDigit(c) {
        if(!c) return false;
        return c >= '0' && c <= '9';
    }

    integer() {
        let result = "";
        while(this.isDigit(this.lookAhead())){
            result += this.lookAhead();
            this.advance();
        }
        return parseInt(result);
    }

    createToken(type, value) {
        const result = new Token(type, value);
        console.log(result);
        return result;
    }

    getToken() {
        this.skipBlank();
        if(this.ended()) return null;

        if(this.lookAhead() === "+") {
            this.advance();
            return this.createToken(TokenType.PLUS, "+");
        }
        if(this.lookAhead() === "-") {
            this.advance();
            return this.createToken(TokenType.MINUS, "-");
        }
        if(this.lookAhead() === "*") {
            this.advance();
            return this.createToken(TokenType.MULT, "*");
        }
        if(this.lookAhead() === "/") {
            this.advance();
            return this.createToken(TokenType.DIV, "/");
        }
        if(this.lookAhead() === "(") {
            this.advance();
            return this.createToken(TokenType.OPEN_P, "(");
        }
        if(this.lookAhead() === ")") {
            this.advance();
            return this.createToken(TokenType.CLOSE_P, ")");
        }

        const value = this.integer();
        const result = this.createToken(TokenType.INTEGER, value);
        return result;
    }
}

module.exports = Lexer;