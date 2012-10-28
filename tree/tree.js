
var TreeNode = function(parent , item){
	this.childs = [];
	this.item = item;
	this.parent = parent;
	this.leftSibling = null;
	this.rightSibling = null;

	if(parent) {
		this.floor = parent.floor + 1;
		parent.addChild(this);
	} else {
		this.floor = 1;
	}
}

TreeNode.prototype.addChild = function(item){
	if(this.childs.length > 0 ) {
		var lastItem = this.childs[this.childs.length - 1];
		lastItem.rightSibling = item;
		item.leftSibling = lastItem;
		item.floor = this.floor + 1;
	}
	this.childs.push(item);
	return true;
}

TreeNode.prototype.removeChild = function(child){
	for (var i = this.childs.length - 1; i >= 0; i--) {
		if(this.childs[i] === child) {
			this.removeChildAt(i);
		}
	};
}

TreeNode.prototype.removeChildAt = function(index) {
	if(this.childs[index]) {
		if(index > 0 && index < this.childs.length - 1) {
			var leftItem = this.childs[index - 1];
			var rightItem = this.childs[index + 1];
			leftItem.rightSibling = rightItem;
			rightItem.leftSibling = leftItem;
		} else if(index == 0) {
			var rightItem = this.childs[index + 1];
			rightItem.leftSibling = null;
		} else if(index == this.childs.length - 1) {
			var leftItem = this.childs[index - 1];
			leftItem.rightSibling = null;
		}

		var item = this.childs.splice(index , 1)[0];
		item.leftSibling = null;
		item.rightSibling = null;
		return item;
	} else {
		return null;
	}
}

TreeNode.prototype.remove = function(){
	if(this.parent != nil) {
		this.parent.removeChild(this);
	}
}

TreeNode.prototype.getChilds = function(){
	return this.childs;
}

TreeNode.prototype.getChildAt = function(index){
	return this.childs[index];
}

TreeNode.prototype.isLastChild = function(parent){
	parent = parent ? parent : this.parent;
	if(!parent) {
		return true;
	}

	if(parent.childs && parent.childs.length > 0) {
		return this == parent.getLastChild();
	} else {
		return false;
	}
}

TreeNode.prototype.isFirstChild = function(parent){
	parent = parent ? parent : this.parent;
	if(!parent) {
		return false;
	}

	if(parent.childs && parent.childs.length > 0) {
		return this == parent.getFirstChild();
	} else {
		return false;
	}
}

TreeNode.prototype.getFirstChild = function(){
	return this.getChildAt(0);
}

TreeNode.prototype.getLastChild = function(){
	return this.getChildAt(this.childs.length - 1);
}

TreeNode.prototype.getFloor = function(){
	if(!this.parent) {
		return 1;
	} else {
		return this.parent.getFloor() + 1;
	}
}

TreeNode.prototype.getDegree = function(){
	var degree = 0;

	this.breadthFirstSearch(function(item){
		if(item.floor > degree) {
			degree = item.floor;
		}
	});

	return degree;
}


TreeNode.prototype.breadthFirstSearch = function(callback){
	var queue = new Queue();
	queue.enQueue(this);

	while(!queue.empty()) {
		var item = queue.deQueue();
		callback && callback(item);
		for(var i = 0; i < item.childs.length; i++) {
			queue.enQueue(item.childs[i]);
		}
	}
}

TreeNode.prototype.deepthFirstSearchItem = function(item , callback){
	callback && callback(item);

	if(item.childs && item.childs.length > 0) {
		for(var i = 0; i < item.childs.length; i++) {
			this.deepthFirstSearchItem(item.childs[i] , callback);
		}
	}
}

TreeNode.prototype.deepthFirstSearch = function(callback){
	this.deepthFirstSearchItem(this , callback);
}




