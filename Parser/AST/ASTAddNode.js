const ASTNode = require("./ASTNode");

class ASTAddNode extends ASTNode {
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
        return this.value = left + right;
    }
}

module.exports = ASTAddNode;