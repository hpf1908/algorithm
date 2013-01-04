var bTree = new BMinusTree(3);

console.log('test add BTree 1');
for (var i = 0; i < 7; i++) {
    var node = new BTreeNode(i + 1 , i + 1);
    bTree.add(node);
}

for (var i = 0; i < 7; i++) {
    console.log(bTree.search(i + 1));
}

console.log('test add BTree 2');

var bTree = new BMinusTree(3);

var node = new BTreeNode( 14, 14);
bTree.add(node);

var node = new BTreeNode( 20, 20);
bTree.add(node);

var node = new BTreeNode( 1, 1);
bTree.add(node);

var node = new BTreeNode( 99, 99);
bTree.add(node);

var node = new BTreeNode( 2, 2);
bTree.add(node);

console.log(bTree.search(99));
console.log(bTree.search(11111));

console.log('test del BTree right merge');

var bTree = new BMinusTree(3);

for (var i = 0; i < 7; i++) {
    var node = new BTreeNode(i + 1 , i + 1);
    bTree.add(node);
}
bTree.del(5);
console.log(bTree);

console.log('test del BTree left merge');

var bTree = new BMinusTree(3);

for (var i = 0; i < 7; i++) {
    var node = new BTreeNode(i + 1 , i + 1);
    bTree.add(node);
}
bTree.del(7);
console.log(bTree);

console.log('test del BTree right move');

var bTree = new BMinusTree(3);

for (var i = 0; i < 7; i++) {
    var node = new BTreeNode(i + 1 , i + 1);
    bTree.add(node);
}

var node = new BTreeNode(3.5 , 3.5);
bTree.add(node);

var node = new BTreeNode(3.8 , 3.8);
bTree.add(node);

bTree.del(5);
console.log(bTree);
