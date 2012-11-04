var createAvlBtree = function(arr){
	var head = null;
	for (var i = 0; i < arr.length; i++) {
		head = insertAvlBtree(head , arr[i]);
	};
	return head;
}

//查找最小不平衡子树
var insertAvlBtree = function(head, item) {
	var p ,q ;
	var parentStack = new Stack();

	p = new BinaryTreeNode(item , null , null);

	if(!head) {
		head = p;
	} else {
		q = head;
		parentStack.push(q);

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

			parentStack.push(q);
		}
	}

	// console.log('add item:' + item);

	// if(item == 58) {
	// 	debugger;
	// 	console.log(head);
	// }

	return adjustAvlTree(head, parentStack);
}

var adjustAvlTree = function(head , stack ){
	var notAvlHead = null,
		notAvlHeadParent = null;

	// console.log('add item:' + p.item);
	while(!stack.empty()) {

		var cnode = stack.pop();

		if(checkIsNotAvlBTree(cnode) && !notAvlHead) {
			notAvlHead = cnode;
			notAvlHeadParent = stack.pop();
		}
	}

	// debugger;
	if(notAvlHead) {
		// debugger;
		var avlType = judgeAvlBtree(notAvlHead);

		if(avlType == 0) {
			// debugger;
			// console.log('LL');
			head = avlLLAdjust(notAvlHeadParent , notAvlHead);
			// console.log(head);
		} else if(avlType == 1) {
			// debugger;
			// console.log('LR');
			// console.log(head);
			head = avlLRAdjust(notAvlHeadParent , notAvlHead);
			// console.log(head);
		} else if(avlType == 2) {
			// debugger;
			// console.log('RL');
			head = avlRLAdjust(notAvlHeadParent , notAvlHead);
		} else if(avlType == 3) {
			// debugger;
			// console.log('RR');
			head = avlRRAdjust(notAvlHeadParent , notAvlHead);
		}
	}

	return head;
}

var checkIsNotAvlBTree = function(head){

	var leftChildLen = head.leftChild ? head.leftChild.getDepth() : 0;
	var rightChildLen = head.rightChild ? head.rightChild.getDepth() : 0;
	
	// console.log('item:'+ head.item + ' ' + leftChildLen + '_' + rightChildLen);
	return Math.abs(leftChildLen - rightChildLen) > 1;
}

//判断avlTree的类型
var judgeAvlBtree = function(head ) {

	// console.log('notAvl mini:' + head.item);

	var leftChildLen = head.leftChild ? head.leftChild.getDepth() : 0;
	var rightChildLen = head.rightChild ? head.rightChild.getDepth() : 0;


	if(leftChildLen > rightChildLen) {
		var tempNode = head.leftChild;
		var lLen = tempNode.leftChild ? tempNode.leftChild.getDepth() : 0;
		var rLen = tempNode.rightChild ? tempNode.rightChild.getDepth() : 0;

		// console.log('judge left leftChildLen:'+ lLen + ' rightChildLen:' + rLen);

		if(lLen > rLen ) {
			return 0;
		} else {
			return 1;
		}
	} else  {
		var tempNode = head.rightChild;
		var lLen = tempNode.leftChild ? tempNode.leftChild.getDepth() : 0;
		var rLen = tempNode.rightChild ? tempNode.rightChild.getDepth() : 0;
		
		// console.log('judge right leftChildLen:'+lLen + ' rightChildLen:' + rLen);
		
		if(lLen > rLen ) {
			return 2;
		} else {
			return 3;
		}
	}

}

var avlLLAdjust = function(parent, unAvlHead){
	var pA = unAvlHead;
	var pB = pA.leftChild;
	var pC = pB.rightChild;

	pB.rightChild = pA;
	pA.leftChild  = pC;

	if(parent && parent.leftChild == unAvlHead) {
		parent.leftChild = pB;
	} else if(parent && parent.rightChild == unAvlHead) {
		parent.rightChild = pB;
	}

	if(!parent) {
		parent = pB;
	}

	return parent;
}

var avlRRAdjust = function(parent , unAvlHead){
	var pA = unAvlHead;
	var pB = pA.rightChild;
	var pC = pB.leftChild;

	pB.leftChild = pA;
	pA.rightChild  = pC;

	if(parent && parent.leftChild == unAvlHead) {
		parent.leftChild = pB;
	} else if(parent && parent.rightChild == unAvlHead) {
		parent.rightChild = pB;
	}


	if(!parent) {
		parent = pB;
	}

	return parent;
}

var avlLRAdjust = function(parent , unAvlHead) {

	var pA  = unAvlHead;
	var pB  = pA.leftChild;
	var pC  = pB.rightChild;
	var pC1 = pC.leftChild;
	var pC2 = pC.rightChild;

	pC.leftChild  = pB;
	pC.rightChild = pA;
	pB.rightChild = pC1;
	pA.leftChild  = pC2;

	if(parent && parent.leftChild == unAvlHead) {
		parent.leftChild = pC;
	} else if(parent && parent.rightChild == unAvlHead) {
		parent.rightChild = pC;
	}

	if(!parent) {
		parent = pC;
	}

	return parent;
}

var avlRLAdjust = function(parent , unAvlHead) {
	var pA  = unAvlHead;
	var pB  = pA.rightChild;
	var pC  = pB.leftChild;
	var pC1 = pC.leftChild;
	var pC2 = pC.rightChild;

	pC.leftChild  = pA;
	pC.rightChild = pB;
	pB.leftChild  = pC2;
	pA.rightChild = pC1;

	if(parent && parent.leftChild == unAvlHead) {
		parent.leftChild = pC;
	} else if(parent && parent.rightChild == unAvlHead) {
		parent.rightChild = pC;
	}

	if(!parent) {
		parent = pC;
	}

	return parent;
}

var deleteAvlTreeItem = function(head , item){

	var delParentNode = null;
	var delNode = null;
	var findFlag = 0;
	var p = head, q = null;
	var stack = new Stack(); 

	while(p) {
		if(p.item == item) {
			break;
		}

		q = p;
		stack.push(q);

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
		head = adjustAvlTree(head , stack);
	}

	return head;
}