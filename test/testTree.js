var Root = new TreeNode(null , 0);
var node1 = new TreeNode(Root , 1);
var node2 = new TreeNode(Root , 2);
var node3 = new TreeNode(Root , 3);

var node4 = new TreeNode(node1 , 4);
var node5 = new TreeNode(node1 , 5);

var node6 = new TreeNode(node2 , 6);

console.log('breadthFirstSearch test');

Root.breadthFirstSearch(function(node){
	console.log(node.item);
});

console.log('deepthFirstSearch test');

Root.deepthFirstSearch(function(node){
	console.log(node.item);
});

console.log('root depth:' + node6.getDepth());
console.log('node6 floor:' + node6.getFloor());

/***
 *        0
      1      2
    3   4      5
      
 *
 * preOrder    : 0 1 3 4 2 5
 * middleOrder : 3 1 4 0 2 5
 * postOrder   : 3 4 1 5 2 0
 */
var binaryRoot = new BinaryTreeNode(0);

var binaryNode1 = new BinaryTreeNode(1); 
var binaryNode2 = new BinaryTreeNode(2); 

binaryRoot.leftChild = binaryNode1;
binaryRoot.rightChild = binaryNode2;

var binaryNode3 = new BinaryTreeNode(3); 
var binaryNode4 = new BinaryTreeNode(4);
var binaryNode5 = new BinaryTreeNode(5);

binaryNode1.leftChild = binaryNode3;
binaryNode1.rightChild = binaryNode4;

binaryNode2.rightChild = binaryNode5;

console.log('root depth:' + binaryRoot.getDepth());

console.log('recurePreOrderTravel test');

recurePreOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('preOrderTravel test');

preOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('recureMiddleOrderTravel test');

recureMiddleOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('middleOrderTravel test');

middleOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('recurePostOrderTravel test');

recurePostOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('postOrderTravel test');

postOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

console.log('breadthOrderTravel test');

breadthOrderTravel(binaryRoot , function(node){
	console.log(node.item);
});

//threaded test

console.log('threaded test');

var threadedRoot = createThreadedBinaryTree(binaryRoot);

console.log(threadedRoot);

middleThreadedOrder(threadedRoot , function(node){
	console.log(node.item);
});

console.log('binarySortTree test');

var inputArr = [5,10,5,20,17,12,19,2];
var bSTreeRoot = createBinarySortTree(inputArr);

middleOrderTravel(bSTreeRoot , function(node){
	console.log(node.item);
});

console.log('searchBinarySortTree test');
var searchItem = searchBinarySortTree(bSTreeRoot , 10);
console.log(searchItem);

console.log('deleteBinarySortTreeItem test');
bSTreeRoot = deleteBinarySortTreeItem(bSTreeRoot, 12);
bSTreeRoot = deleteBinarySortTreeItem(bSTreeRoot, 5);

middleOrderTravel(bSTreeRoot , function(node){
	console.log(node.item);
});

console.log('createAvlBtree test');

// var inputArr = [46,15,20,35,28,18,50,54];
var inputArr = [46 , 15 , 20 , 35 , 28 , 58 , 18 , 50 , 54]
var avlTreeRoot = createAvlBtree(inputArr);

console.log(avlTreeRoot);

middleOrderTravel(avlTreeRoot , function(node){
	console.log(node.item);
});


console.log('huffmanEncodeString test');

var inputStr = 'aaaaaaaaaabbbbbbbbbbbbcccccccccccccccaaaaaaaaaabbbbbbbbbbbbccccccccccccccc';
// var inputStr = 'hello world';
// var inputStr = 'world';

var ouputBits = huffmanEncodeString(inputStr);
var ouputStr = convertBitsToString(ouputBits);

console.log('input:' + inputStr + ' len:' + inputStr.length);
console.log('output bits:' + ouputBits);
console.log('output:' + ouputStr + ' len:' + ouputStr.length);

console.log('huffmanCompressString test');

var originStr = inputStr;
var ouputStr = huffmanCompressString(inputStr);
console.log('input:' + inputStr + ' len:' + inputStr.length);
console.log('output:' + ouputStr + ' len:' + ouputStr.length);
console.log('compress ratio:' + ouputStr.length / inputStr.length );

console.log('huffmanDeCompressString test');
var inputStr = ouputStr;
var ouputStr = huffmanDeCompressString(inputStr);
console.log('input:' + inputStr);
console.log('output:' + ouputStr);
console.log('origin:' + originStr);

var isEquals = originStr == ouputStr;
console.log('equals: ' + isEquals);








