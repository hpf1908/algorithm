var bTree = new BMinusTree(3);

var node1 = new BTreeNode(1 , 1);
var node2 = new BTreeNode(2 , 2);
var node3 = new BTreeNode(3 , 3);
var node4 = new BTreeNode(4 , 4);
var node5 = new BTreeNode(5 , 5);
var node6 = new BTreeNode(6 , 6);
var node7 = new BTreeNode(7 , 7);

bTree.add(node1);
bTree.add(node2);
bTree.add(node3);
bTree.add(node4);
bTree.add(node5);
bTree.add(node6);
bTree.add(node7);

console.log(bTree);

console.log(bTree.search(15));
console.log(bTree.search(7));
console.log(bTree.search(6));
console.log(bTree.search(5));
console.log(bTree.search(4));
console.log(bTree.search(3));
console.log(bTree.search(2));
console.log(bTree.search(1));