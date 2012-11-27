var inputVertexs = [];

inputVertexs.push(new Vertex(1 , '北京'));
inputVertexs.push(new Vertex(2 , '上海'));
inputVertexs.push(new Vertex(3 , '天津'));
inputVertexs.push(new Vertex(4 , '福建'));
inputVertexs.push(new Vertex(5 , '台湾'));

var inputEdges = [];

inputEdges.push(new Edge(1 , 2, 5));
inputEdges.push(new Edge(2 , 1, 5));

inputEdges.push(new Edge(1 , 3, 2));
inputEdges.push(new Edge(3 , 1, 2));

inputEdges.push(new Edge(2 , 4, 6));
inputEdges.push(new Edge(4 , 2, 6));

inputEdges.push(new Edge(4 , 5, 6));
inputEdges.push(new Edge(5 , 4, 6));

var adjMatris = new AdjMatris(inputVertexs , inputEdges);

// console.log(adjMatris);
// console.log(adjMatris.getOuputAdjById(1));
// console.log(adjMatris.getInputAdjById(1));
// console.log(adjMatris.getAdjsById(1));

console.log('travelDFS test');

adjMatris.travelDFS(function(vetex) {
	console.log(vetex);
});

console.log('travelBFS test');

adjMatris.travelBFS(function(vetex) {
	console.log(vetex);
});