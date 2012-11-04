var BinaryTreeNode = function(item , leftChild , rightChild){
	this.item = item;
	this.leftChild = leftChild;
	this.rightChild = rightChild;
	
	//used for cluesTree
	this.lbit = 1;
	this.rbit = 1;
}

BinaryTreeNode.prototype.getDepth = function(){

	var leftDepth = this.leftChild ? this.leftChild.getDepth() : 0;
	var rightDepth = this.rightChild ? this.rightChild.getDepth() : 0;

	if(leftDepth > rightDepth) {
		return leftDepth + 1;
	} else {
		return rightDepth + 1;
	}
}

BinaryTreeNode.prototype.remove = function(){
	if(this.parent) {
		if(this.parent.leftChild == this) {
			this.parent.leftChild = null;
		} else if(this.parent.rightChild == this){
			this.parent.rightChild = null;
		}
	}
}

var recurePreOrderTravel = function(node , callback) {
	if(!!node) {
		callback && callback(node);
		recurePreOrderTravel(node.leftChild , callback);
		recurePreOrderTravel(node.rightChild , callback);
	}
}

var recureMiddleOrderTravel = function(node , callback) {
	if(!!node) {
		recureMiddleOrderTravel(node.leftChild , callback);
		callback && callback(node);
		recureMiddleOrderTravel(node.rightChild , callback);
	}
}

var recurePostOrderTravel = function(node , callback) {
	if(!!node) {
		recurePostOrderTravel(node.leftChild , callback);
		recurePostOrderTravel(node.rightChild , callback);
		callback && callback(node);
	}
}


var preOrderTravel = function(node , callback) {
	var stack = new Stack();
	stack.push(node);

	while(!stack.empty()) {
		var cnode = stack.pop();
		callback && callback(cnode);

		if(cnode.rightChild) {
			stack.push(cnode.rightChild);
		}

		if(cnode.leftChild) {
			stack.push(cnode.leftChild);
		}
	}
}

var middleOrderTravel = function(node , callback) {
	var stack = new Stack();
	var cnode = node;

	do {
		while(cnode) {
			stack.push(cnode);
			cnode = cnode.leftChild;
		}

		cnode = stack.pop();
		callback && callback(cnode);
		cnode = cnode.rightChild;
	} while(!stack.empty() || !!cnode);
}

var postOrderTravel = function(node , callback) {
	var stack = new Stack();
	var flagStack = new Stack();
	var cnode = node;
	var flag;

	do {
		while(cnode) {
			stack.push(cnode);
			flagStack.push(0);
			cnode = cnode.leftChild;
		}

		cnode = stack.pop();
		flag = flagStack.pop();

		if(flag == 0) {
			stack.push(cnode);
			flagStack.push(1);
			cnode = cnode.rightChild;
		} else {
			callback && callback(cnode);
			cnode = null;
		}
	} while(!stack.empty() || !!cnode);
}

var breadthOrderTravel = function(node , callback) {
	var queue = new Queue();
	queue.enQueue(node);

	while(!queue.empty()) {

		var p = queue.deQueue();
		callback && callback(p);
		
		if(p.leftChild) {
			queue.enQueue(p.leftChild);
		} 

		if(p.rightChild) {
			queue.enQueue(p.rightChild);
		}
	}
}

var isTreeNodeInBTree = function(head , node){

	if(!head || !node) {
		return false;
	}

	var findFlag = false;
	preOrderTravel(head , function(iterator){
		if(node == iterator) {
			findFlag = true;
		}
	});

	return findFlag;
}


