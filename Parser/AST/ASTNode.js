class ASTNode {
    set left(node) {
        this._left = node;
    }
    set right(node) {
        this._right = node;
    }
    get left() {
        return this._left;
    }
    get right() {
        return this._right;
    }
    constructor(label) {
        this.label = label;
        this._left = null;
        this._right = null;
    }

    print(level, label = "") {
        let padding = "";
        for(let i=0; i<level*2; i++) padding+=" ";
        console.log(padding + label + " " + this.label);
        
        if(this._left) {
            this._left.print(level+1, "left");
        }
        if(this._right) {
            this._right.print(level+1, "right");
        }
    }

    postFix() {
        if(this._left) this._left.postFix();
        if(this._right) this._right.postFix();
        process.stdout.write(" "+this.label);
    }

    // @override
    evaluate(){}
}

module.exports = ASTNode;