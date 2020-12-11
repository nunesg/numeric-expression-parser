const ASTNode = require("./ASTNode");

class ASTMinusNode extends ASTNode {
    constructor(label) {
        super(label);
        this.value = null;
    }

    evaluate() {
        if(this.value !== null) {
            return this.value;
        }
        return this.value = -1 * this.left.evaluate();
    }
}

module.exports = ASTMinusNode;