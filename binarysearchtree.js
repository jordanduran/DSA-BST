class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        //if the tree is empty then this key is being inserted as the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        //if the tree already exists, then start at the root and compare it to the key you want to insert. If the new key is less than the node's key then the new node needs to live in the left-hand branch
        else if (key < this.key) {
            //if the existing node does not have a left child, meaning that if the `left` pointer is empty, then we can just instantiate and insert the new node as the left child of that node, passing `this` as the parent
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this)
            }
            //if the node has an existing left child, then we recursively call the `insert` method so the node is added further down the tree
            else {
                this.left.insert(key, value);
            }
        }
        //similarly, if the new key is greater than the node's key then you do the same thing, but on the right-hand side
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    //evaluates the same way as the insert(key) func
    find(key) {
        if (this.key == key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left.find(key)
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            //if this has a parent whose left branch is equal to this node, replace the parent's left pointer with the given node
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }
            //if the node is given, set the parent of the given node to the parent of the node being replaced
            if (node) {
                node.parent = this.parent;
            }
        } else {
            // if the node is provided, replace the attributes with the attributes of the new node
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                //set all attributes to null so that it is not included in the BST
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}