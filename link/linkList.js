var Node = function(data , link) {
	this.data = data;
	this.link = link;
}

var createLinkList = function(arr) {

	var pnode, rnode, head;

	for(var i =0; i < arr.length; i++){
		if(!head) {
			head = new Node(arr[i] , null);
			pnode = head;
		} else {
			rnode = new Node(arr[i]);
			pnode.link = rnode;
			pnode = rnode;
		}
	}

	return head;
}

var traversal = function(head , callback){
	var pnode = head;
	while(pnode) {
		// console.log(pnode.data);
		callback(pnode);
		pnode = pnode.link;
	}
}

var getLinkListLength = function(head){
	var count = 0;
	traversal(head , function(){
		count++;
	});
	return count;
}

var isLinkListEmpty = function(head){
	return !head;
}

var findNodeInList = function(head , data){
	var result = [];
	traversal(head , function(node){
		if(node.data == data) {
			result.push(node);			
		}
	});
	return result;
}

var insertNodeAtHead = function(data , head) {
	return new Node(data , head);
}

var insertNodeAtTail = function(data , head){
	var node = new Node(data , null);
	var pNode = head;
	while(!isLinkListEmpty(pNode.link)) {
		pNode = pNode.link;
	}

	if(isLinkListEmpty(head)) {
		return node;
	} else {
		pNode.link = node;
	}
	return head;
}

var inverseLinkList = function(head) {
	var pNode = head;
	var rNode = null;
	var tempNodeR = null;

	while(pNode) {
		tempNodeR = rNode;
		rNode = pNode;
		pNode = pNode.link;
		rNode.link = tempNodeR;
	}
	return rNode;
}

var removeNodeInLinkList = function(head , removeData){
	var pNode = head;
	var lNode = null;

	while(pNode) {
		if(pNode.data === removeData) {
			if(lNode == null) {
				head = pNode.link;
			} else {
				lNode.link = pNode.link;
			}
		}
		lNode = pNode;
		pNode = pNode.link;
	}

	return head;
}


