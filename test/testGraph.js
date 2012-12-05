/**
      北京
            天津
  河北    
   
     福建 

        台湾
 */

var inputVertexs = [];

inputVertexs.push(new Vertex(1 , '北京'));
inputVertexs.push(new Vertex(2 , '河北'));
inputVertexs.push(new Vertex(3 , '天津'));
inputVertexs.push(new Vertex(4 , '福建'));
inputVertexs.push(new Vertex(5 , '台湾'));

var inputEdges = [];

inputEdges.push(new Edge(1 , 2, 5));
inputEdges.push(new Edge(2 , 1, 5));

inputEdges.push(new Edge(1 , 3, 2));
inputEdges.push(new Edge(3 , 1, 2));

inputEdges.push(new Edge(1 , 4, 6));
inputEdges.push(new Edge(4 , 1, 6));

inputEdges.push(new Edge(1 , 5, 15));
inputEdges.push(new Edge(5 , 1, 15));

inputEdges.push(new Edge(2 , 3, 3));
inputEdges.push(new Edge(3 , 2, 3));

inputEdges.push(new Edge(2 , 4, 7));
inputEdges.push(new Edge(4 , 2, 7));

inputEdges.push(new Edge(2 , 5, 10));
inputEdges.push(new Edge(5 , 2, 10));

inputEdges.push(new Edge(3 , 4, 8));
inputEdges.push(new Edge(4 , 3, 8));

inputEdges.push(new Edge(3 , 5, 1));
inputEdges.push(new Edge(5 , 3, 1));

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

console.log('isAllConneced');

console.log(adjMatris.isAllConneced());

console.log('miniSpantPrim');

if(adjMatris.isAllConneced()) {
	console.log(adjMatris.miniSpanPrim());
} else {
	console.log('not connected');
}

console.log('miniSpanKruskal');

if(adjMatris.isAllConneced()) {
	console.log(adjMatris.miniSpanKruskal());
} else {
	console.log('not connected');
}

console.log('shortestPath');

console.log(adjMatris.shortestPath(1));
