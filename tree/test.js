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

console.log('root degree:' + node6.getDegree());
console.log('node6 floor:' + node6.getFloor());



