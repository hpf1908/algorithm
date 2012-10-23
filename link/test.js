
var inputArray = [1,2,3,4,5,6,7,8,9];

console.log('createLinkList test');

var head = createLinkList(inputArray);

traversal(head , function(node){
	console.log(node.data);
});

console.log('linkList length:' + getLinkListLength(head));

var result = findNodeInList(head, 6);

console.log('findNodeInList test');

console.log(result);

console.log('insertNodeAtHead test');

var head1 = insertNodeAtHead(0, head);

traversal(head1 , function(node){
	console.log(node.data);
});

console.log('insertNodeAtTail test');

var head2 = insertNodeAtTail(10, head1);

traversal(head2 , function(node){
	console.log(node.data);
});

console.log('inverseLinkList test');

var head3 = inverseLinkList(head2);

traversal(head3 , function(node){
	console.log(node.data);
});

console.log('removeNodeInLinkList test');

var head4 = removeNodeInLinkList(head3 , 7);

traversal(head4 , function(node){
	console.log(node.data);
});

