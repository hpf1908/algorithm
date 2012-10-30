
var createThreadedBinaryTree= function(head) {

	var prior;

	var inThreading = function(t){
		if(t) {
			inThreading(t.leftChild);

			if(!t.rightChild) {
				t.rbit = 0;
			}

			if(!t.leftChild) {
				t.lbit = 0;
				t.leftChild = prior;
			}

			if(prior.rbit == 0) {
				prior.rightChild = t;
			}

			prior = t;
			inThreading(t.rightChild);
		}
	}

	var newHead = new BinaryTreeNode();

	newHead.rightChild = newHead;
	newHead.rbit = 1;

	if(!head) {
		newHead.leftChild = newHead;
		newHead.lbit = 1;
	} else {
		newHead.leftChild = head;
		newHead.lbit = 1;
		prior = newHead;
		inThreading(head);
		prior.rightChild = newHead;
		prior.rbit = 0;
	}

	return newHead;
}

var middleThreadedNextNode = function(head) {
	var s = head.rightChild;
	if(head.rbit == 1) {
		while(s.lbit == 1) {
			s = s.leftChild;
		}
	}
	return s;
}

var middleThreadedOrder = function(head , callback) {
	var p = head;
	while(true) {
		p = middleThreadedNextNode(p);
		if(p == head) {
			break;
		}
		callback && callback(p);
	}
}
