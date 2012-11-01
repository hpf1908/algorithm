
var createBinarySortTree = function(arr){
	var head = null;
	for (var i = 0; i < arr.length; i++) {
		head = insertBinarySortTree(head , arr[i]);
	};
	return head;
}

var insertBinarySortTree = function(head , item){
	var p ,q ;

	p = new BinaryTreeNode(item , null , null);

	if(!head) {
		head = p;
	} else {
		q = head;

		while(true) {

			if(item < q.item) {
				if(q.leftChild) {
					q = q.leftChild;
				} else {
					q.leftChild = p;
					break;
				}
			} else {
				if(q.rightChild) {
					q = q.rightChild;
				} else {
					q.rightChild = p;
					break;
				}
			}

		}
	}

	return head;
}

var searchBinarySortTree = function(head , item){
	var p = head;
	while(p) {
		if(p.item == item) {
			return p;
		}

		if(item < p.item) {
			p = p.leftChild;
		} else {
			p = p.rightChild;
		}
	} 
	return null;
}

var deleteBinarySortTreeItem = function(head , item){

	var delParentNode = null;
	var delNode = null;
	var findFlag = 0;
	var p = head, q = null;

	while(p) {
		if(p.item == item) {
			break;
		}

		q = p;
		if(item < p.item) {
			p = p.leftChild;
		} else {
			p = p.rightChild;
		}
	} 

	delNode = p;
	delParentNode = q;

	if(delNode) {
		head = deleteBinarySortTree(head , delParentNode , delNode);
	}

	return head;
}

var deleteBinarySortTree = function(head , parent , delNode ) {

	var p = delNode;
	var q = parent;
	var flag = 0;
	var r , s;

	if(!p.leftChild) {
		if(p == head) {
			head = p.rightChild;
		} else {
			r = p.rightChild;
			flag = 1;
		}
	} else if(!p.rightChild) {
		if(p == head) {
			head = p.leftChild;
		} else {
			r = p.leftChild;
			flag = 1;
		}
	} else {

		s = p;
		r = s.rightChild;

		while(r.leftChild){
			s = r;
			r = r.leftChild;
		}

		r.leftChild = p.leftChild;

		if(s != p) {
			s.leftChild = null;
			r.rightChild = p.rightChild;
		}

		if(p == head) {
			head = r;
		} else {
			flag = 1;
		}
	}


	if(flag == 1) {
		if(q.leftChild == p) {
			q.leftChild = r;
		} else {
			q.rightChild = r;
		}
	}

	return head;
}