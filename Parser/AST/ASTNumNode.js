const ASTNode = require("./ASTNode");

class ASTNumNode extends ASTNode {
    constructor(label) {
        super(label);
        this.value = parseInt(label);
    }

    evaluate() {
        return this.value;
    }
}

module.exports = ASTNumNode;