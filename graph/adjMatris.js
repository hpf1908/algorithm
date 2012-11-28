/**
 * 图的邻接矩阵表示
 */
var Vertex = function(id , title) {
	this.title = title;
	this.id = id;
}

/**
 * 输入参数：顶点, 顶点偶对
 */
var Edge = function(from , to, weight) {
	this.fromId = from;
	this.toId   = to;
	this.weight = weight;
}

var AdjMatris = function(vertexs , edges) {

	this.idsMap = {};
	this.vertexs = vertexs;
	this.edges = edges;
	this.matris = [];

	this.initialize();
	this.addEdges(edges);
}

AdjMatris.prototype.initialize = function(){

	var matris = this.matris;
	var vertexs = this.vertexs;
	var martisNum = this.vertexs.length;

	//初始化idmap
	this.initialIdsMap(0);

	for (var i = 0; i < martisNum; i++) {
		matris[i] = [];
		for (var j = 0; j < martisNum; j++) {
			matris[i][j] = Number.MAX_VALUE;
		}
	}
}

AdjMatris.prototype.id2Index = function(id) {
	return this.idsMap[id] == undefined ? -1 : this.idsMap[id];
}

AdjMatris.prototype.checkIndex = function(index) {
	return index >=0 && index < this.vertexs.length;
}

AdjMatris.prototype.checkVertex = function(vertex) {
	return vertex && vertex.id;
}

AdjMatris.prototype.getOuputAdjById = function(id) {
	var index = this.id2Index(id);
	return index < 0 ? [] : this.getOuputAdjByIndex(index);
}

AdjMatris.prototype.initialIdsMap = function(start) {
	for (var i = start; i < this.vertexs.length; i++) {
		var vertex = this.vertexs[i];
		this.idsMap[vertex.id] = i;
	}
}

AdjMatris.prototype.getOuputAdjByIndex = function(index) {

	var res = [];
	var fMartis = this.matris[index];

	for (var i = 0; i < this.vertexs.length; i++) {
		if(fMartis && fMartis[i] != Number.MAX_VALUE && this.vertexs[i]) {
			res.push(this.vertexs[i]);
		}
	};
	return res;
}

AdjMatris.prototype.getInputAdjById = function(id) {
	var index = this.id2Index(id);
	return index < 0 ? [] : this.getOuputAdjByIndex(index);
}

AdjMatris.prototype.getInputAdjByIndex = function(index) {

	var res = [];

	for (var i = 0; i < this.vertexs.length; i++) {
		var fMartis = this.matris[i];
		if(fMartis && fMartis[index] != Number.MAX_VALUE && this.vertexs[i]) {
			res.push(this.vertexs[i]);
		}
	};
	return res;
}

AdjMatris.prototype.getAdjsById = function(id) {
	var inputs  = this.getInputAdjById(id);
	var outputs = this.getOuputAdjById(id);
	return inputs.concat(outputs);
}

AdjMatris.prototype.addAdj = function(vertex) {
	for (var i = 0; i < this.vertexs.length - 1; i++) {
		this.matris[i].push(Number.MAX_VALUE);
	}

	var arr = [];
	this.vertexs.push(vertex);
	for (var i = 0; i < this.vertexs.length; i++) {
		arr.push(Number.MAX_VALUE);
	}
	this.matris.push(arr);
}

AdjMatris.prototype.addEdges = function(edges) {
	for (var i = 0; i < edges.length; i++) {
		this.addEdge(edges[i]);
	}
}

AdjMatris.prototype.addEdge = function(edge) {
	var from = this.id2Index(edge.fromId);
	var to   = this.id2Index(edge.toId);
	if(this.checkIndex(from) && this.checkIndex(to)) {
		this.matris[from][to] = edge.weight;
	}
}

//删除边信息只是将标志位清除，不是实际删除节点
AdjMatris.prototype.delEdgesById = function(id) {
	var index = this.id2Index(id);
	if(this.checkIndex(index)) {
		var hMatris = this.matris[index];
		for (var i = 0; i < this.vertexs.length; i++) {
			hMatris[i] = Number.MAX_VALUE;
		}

		for (var i = 0; i < this.vertexs.length; i++) {
			hMatris = this.matris[i];
			hMatris[index] = Number.MAX_VALUE; 
		};
	} 
}

AdjMatris.prototype.delVertexById = function(id) {
	var index = this.id2Index(id);
	if(this.checkIndex(index)) {
		var hMatris;

		//先删除列
		for (var i = 0; i < this.vertexs.length; i++) {
			hMatris = this.matris[i];
			hMatris.splice(index);
		}
		//再删除行
		this.matris.splice(index);
		//再删除节点
		this.vertexs.splice(index);
		//重新设置节点
		this.initialIdsMap(index);
	}
}

AdjMatris.prototype.travelDFS = function(iterator) {

	var visited = {};

	for (var i = 0; i < this.vertexs.length; i++) {
		var vetex = this.vertexs[i];
		visited[vetex.id] = false;
	}

	for (var i = 0; i < this.vertexs.length; i++) {
		var vetex = this.vertexs[i];
		if(!visited[vetex.id]) {
			this.DFS(visited , vetex.id , iterator);	
		}
	}
}

AdjMatris.prototype.DFS = function(visited , id , iterator) {

	var outputs = this.getOuputAdjById(id);
	var index = this.id2Index(id);

	iterator && iterator(this.vertexs[index]);
	visited[id] = true;

	for (var i = 0; i < outputs.length; i++) {
		var vetex = outputs[i];
		if(!visited[vetex.id]) {
			this.DFS(visited , vetex.id, iterator);
		}
	}
}

AdjMatris.prototype.travelBFS = function(iterator) {
	var visited = {};

	for (var i = 0; i < this.vertexs.length; i++) {
		var vetex = this.vertexs[i];
		visited[vetex.id] = false;
	}

	for (var i = 0; i < this.vertexs.length; i++) {
		var vetex = this.vertexs[i];
		if(!visited[vetex.id]) {
			this.BFS(visited , vetex.id , iterator);	
		}
	}
}

AdjMatris.prototype.BFS = function(visited , id , iterator) {

	var index = this.id2Index(id);
	var queue = new Queue();

	iterator && iterator(this.vertexs[index]);
	visited[id] = true;
	queue.enQueue(id);

	while(!queue.empty()) {
		var vetexId = queue.deQueue();
		var outputs = this.getOuputAdjById(vetexId);

		for (var i = 0; i < outputs.length; i++) {
			var vetex = outputs[i];
			if(!visited[vetex.id]) {
				iterator(vetex);
				visited[vetex.id] = true;
				queue.enQueue(vetex.id);
			}
		}
	}
}

AdjMatris.prototype.isAllConneced = function() {
	var visited = {};

	for (var i = 0; i < this.vertexs.length; i++) {
		var vetex = this.vertexs[i];
		visited[vetex.id] = false;
	}

	if(this.vertexs.length <= 0) {
		return true;
	}

	var vetex = this.vertexs[0];
	var count = 0;

	this.BFS(visited , vetex.id , function() {
		count++;
	});	
	return count == this.vertexs.length;
}

AdjMatris.prototype.miniSpantPrim = function() {

	var lowerCost = [], teends = [];
	var spantResult = [];
	var spantCost = 0;

	lowerCost[0] = 0;
	teends[0] = 0;

	for (var i = 1; i < this.vertexs.length; i++) {
		teends[i] = 0;
		lowerCost[i] = this.matris[0][i];
	}

	for (var i = 1; i < this.vertexs.length; i++) {
		var miniCost = Number.MAX_VALUE;
		var j = 1 , k;

		while(j < this.vertexs.length) {
			if(lowerCost[j] > 0 && miniCost > lowerCost[j]) {
				miniCost = lowerCost[j];
				k = j;
			}
			j++;
		}

		var from = this.vertexs[teends[k]];
		var to = this.vertexs[k];

		spantResult.push({
			from : from,
			to   : to,
			cost : miniCost
		});

		spantCost+= miniCost;
		lowerCost[k] = 0;

		for (var j = 0; j < this.vertexs.length; j++) {
			if(this.matris[k][j] < lowerCost[j])	{
				lowerCost[j] = this.matris[k][j];
				teends[j] = k;
			}
		}
	}

	return {
		spantCost   : spantCost,
		spantResult : spantResult
	};
}

