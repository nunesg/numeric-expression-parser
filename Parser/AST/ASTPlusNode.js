const ASTNode = require("./ASTNode");

class ASTPlusNode extends ASTNode {
    constructor(label) {
        super(label);
        this.value = null;
    }

    evaluate() {
        if(this.value !== null) {
            return this.value;
        }
        return this.value = this.left.evaluate();
    }
}

module.exports = ASTPlusNode;