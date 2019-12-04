function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

//This is a recursive function that can be applied to a binary tree to find the sum of all values in the tree.

//The best case would be that no tree exists so returns 0 and runtime is O(1).
//The average case is a balanced tree which runs the functions the same number of times for the right and left branches from the root, which would give us O(n)
//The worst case is a skewed tree which would require more recursions on one side of the tree, so it would end up as O(log(n)) runtime