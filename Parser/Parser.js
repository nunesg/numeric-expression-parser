const { TokenType } = require("../Token/token-module");
const ASTAddNode = require("./AST/ASTAddNode");
const ASTDivNode = require("./AST/ASTDivNode");
const ASTMinusNode = require("./AST/ASTMinusNode");
const ASTMultNode = require("./AST/ASTMultNode");
const ASTNumNode = require("./AST/ASTNumNode");
const ASTPlusNode = require("./AST/ASTPlusNode");
const ASTSubNode = require("./AST/ASTSubNode");

class Parser {
    constructor(lexer){
        this.lexer = lexer;
        this.currentToken = this.lexer.getToken();
    }

    error() {
        throw "syntax error!";
    }

    eat(expectedType) {
        if(this.current().type === expectedType) {
            this.currentToken = this.lexer.getToken();
        } else {
            this.error();
        }
    }

    current() {
        return this.currentToken;
    }

    /*
        factor: (MINUS | PLUS)factor | INTEGER | OPEN_P exp CLOSE_P
    */
    factor() {
        const result = this.current().value;
        let node = null;
        switch(this.current().type) {
            case TokenType.INTEGER:
                this.eat(TokenType.INTEGER);
                return new ASTNumNode(result);
            case TokenType.PLUS:
                this.eat(TokenType.PLUS);
                node = new ASTPlusNode(result);
                node.left = this.factor();
                return node;
            case TokenType.MINUS:
                this.eat(TokenType.MINUS);
                node = new ASTMinusNode(result);
                node.left = this.factor();
                return node;
            default:
                this.eat(TokenType.OPEN_P);
                node = this.expr();
                this.eat(TokenType.CLOSE_P);
                return node;
        }
    }


    /*
        term: factor (( MULT | DIV ) factor)*
    */
    term() {
        const operators = [TokenType.MULT, TokenType.DIV];
        let result = this.factor();
        let leftNode = result;
        let root = leftNode;
        while(this.current() && operators.includes(this.current().type)) {
            const type = this.current().type;

            switch(type) {
                case TokenType.MULT:
                    root = new ASTMultNode(this.current().value);
                    break;
                case TokenType.DIV:
                default:
                    root = new ASTDivNode(this.current().value);
            }
            
            root.left = leftNode;

            this.eat(type);
            const rightNode = this.factor();
            root.right = rightNode;

            leftNode = root;
        }
        return root;
    }

    /*
        expr: term (( PLUS | MINUS ) term)*
    */
    expr() {
        const operators = [TokenType.PLUS, TokenType.MINUS];
        
        let leftNode = this.term();
        let root = leftNode;
        while(this.current() && operators.includes(this.current().type)) {
            const type = this.current().type;

            switch(type) {
                case TokenType.PLUS:
                    root = new ASTAddNode(this.current().value);
                    break;
                case TokenType.MINUS:
                default:
                    root = new ASTSubNode(this.current().value);
            }
            
            root.left = leftNode;

            this.eat(type);
            const rightNode = this.term();
            root.right = rightNode;

            leftNode = root;
        }
        return root;
    }

    parse() {
        const node = this.expr();
        node.print(0, "root");
        node.postFix(); console.log();
        return node.evaluate();
    }
}

module.exports = Parser;