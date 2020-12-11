const ASTNode = require("./ASTNode");

class ASTDivNode extends ASTNode {
    constructor(label) {
        super(label);
        this.value = null;
    }

    evaluate() {
        if(this.value != null) {
            return this.value;
        }
        const left = this.left ? this.left.evaluate() : 0;
        const right = this.right ? this.right.evaluate() : 0;
        if(right === 0) {
            throw "Division by 0!!";
        }
        return this.value = parseInt(left / right);
    }
}

module.exports = ASTDivNode;