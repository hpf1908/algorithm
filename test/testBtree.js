var bTree = new BMinusTree(3);

console.log('test add BTree 1');
for (var i = 0; i < 7; i++) {
    var node = new BTreeNode(i + 1 , i + 1);
    bTree.add(node);
}

for (var i = 0; i < 7; i++) {
    console.log(bTree.search(i + 1));
}

console.log(bTree);

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

console.log(bTree);
console.log(bTree.search(99));
