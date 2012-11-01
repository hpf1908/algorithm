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

var recurePreOrderTravel = function(item , callback) {
	if(!!item) {
		callback && callback(item);
		recurePreOrderTravel(item.leftChild , callback);
		recurePreOrderTravel(item.rightChild , callback);
	}
}

var recureMiddleOrderTravel = function(item , callback) {
	if(!!item) {
		recureMiddleOrderTravel(item.leftChild , callback);
		callback && callback(item);
		recureMiddleOrderTravel(item.rightChild , callback);
	}
}

var recurePostOrderTravel = function(item , callback) {
	if(!!item) {
		recurePostOrderTravel(item.leftChild , callback);
		recurePostOrderTravel(item.rightChild , callback);
		callback && callback(item);
	}
}


var preOrderTravel = function(item , callback) {
	var stack = new Stack();
	stack.push(item);

	while(!stack.empty()) {
		var citem = stack.pop();
		callback && callback(citem);

		if(citem.rightChild) {
			stack.push(citem.rightChild);
		}

		if(citem.leftChild) {
			stack.push(citem.leftChild);
		}
	}
}

var middleOrderTravel = function(item , callback) {
	var stack = new Stack();
	var citem = item;

	do {
		while(citem) {
			stack.push(citem);
			citem = citem.leftChild;
		}

		citem = stack.pop();
		callback && callback(citem);
		citem = citem.rightChild;
	} while(!stack.empty() || !!citem);
}

var postOrderTravel = function(item , callback) {
	var stack = new Stack();
	var flagStack = new Stack();
	var citem = item;
	var flag;

	do {
		while(citem) {
			stack.push(citem);
			flagStack.push(0);
			citem = citem.leftChild;
		}

		citem = stack.pop();
		flag = flagStack.pop();

		if(flag == 0) {
			stack.push(citem);
			flagStack.push(1);
			citem = citem.rightChild;
		} else {
			callback && callback(citem);
			citem = null;
		}
	} while(!stack.empty() || !!citem);
}

var breadthOrderTravel = function(item , callback) {
	var queue = new Queue();
	queue.enQueue(item);

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


