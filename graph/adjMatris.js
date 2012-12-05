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

AdjMatris.prototype.delEdge = function(edge) {
    var fromIndex = this.id2Index(edge.fromId);
    var toIndex   = this.id2Index(edge.toId);

    var hMatris = this.matris[fromIndex];
    hMatris[toIndex] = Number.MAX_VALUE;
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

/**
 * 图的深度优先遍历
 */
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

/**
 * 图的广度优先遍历
 */
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

/**
 * 判断无向图是否连通
 */
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

/**
 * 普里姆算法 - 求解无向图的最小生成树
 * 适合于稠密图
 */
AdjMatris.prototype.miniSpanPrim = function() {

    var lowerCost = [], teends = [];
    var spanResult = [];
    var spanCost = 0;

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

        spanResult.push({
            from : from,
            to   : to,
            cost : miniCost
        });

        spanCost+= miniCost;
        lowerCost[k] = 0;

        for (var j = 0; j < this.vertexs.length; j++) {
            if(this.matris[k][j] < lowerCost[j])    {
                lowerCost[j] = this.matris[k][j];
                teends[j] = k;
            }
        }
    }

    return {
        spanCost  : spanCost,
        spanResult : spanResult
    };
}

AdjMatris.prototype.getMiniEdge = function(edges , excepts) {

    if(excepts == undefined) {
        excepts = edges;
        edges = this.edges;
    } 

    excepts = excepts ? excepts : [];

    var exceptesMap = {},
        miniEdge = undefined,
        minCost = Number.MAX_VALUE;

    for (var i = 0; i < excepts.length; i++) {
        var edge = excepts[i];
        exceptesMap[edge.fromId + ' ' + edge.toId] = true;
    }

    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];

        if(exceptesMap[edge.fromId + ' ' + edge.toId]) {
            continue;
        }

        if(edge.weight < minCost) {
            minCost  = edge.weight;
            miniEdge = edge;
        }
    }

    return miniEdge;
}

//判断是否产生回路
AdjMatris.prototype.hasLoop = function(vertexs) {

    vertexs = this.vertexs;

    // debugger;
    for (var i = 0; i < vertexs.length; i++) {
        var startVetex = vertexs[i];
        var visitedVetexs = {};
        var stack = new Stack();


        stack.push({
            parent : undefined,
            vetex  : startVetex
        });

        while(!stack.empty()) {
            // debugger;
            var stVetex = stack.pop();
            var vetex = stVetex.vetex;
            var vetexParent = stVetex.parent;

            if(visitedVetexs[vetex.id]) {
                return true;
            }

            visitedVetexs[vetex.id] = true;

            var index = this.id2Index(vetex.id);
            var outputs = this.getOuputAdjByIndex(index);

            for (var j = 0; j < outputs.length; j++) {

                if(outputs[j] !=  vetexParent) {
                    stack.push({
                        parent : vetex ,
                        vetex  : outputs[j]
                    });
                }
            }
        }
    }

    return false;
}

/**
 * 克鲁斯卡尔算法 - 求解无向图的最小生成树
 * 相比普里姆方法更适合于稀疏图
 */
AdjMatris.prototype.miniSpanKruskal = function() {

    //先构造一个无边的网络存储当前的最小生成树
    var miniAdjMatris = new AdjMatris(this.vertexs , []);
    var miniEdgeNum = 0;
    var edges = this.edges;
    var excepts = [];
    var miniEdge = undefined;

    var spanResult = [];
    var spanCost = 0;

    while(miniEdgeNum < this.vertexs.length) {

        miniEdge = this.getMiniEdge(edges , excepts);

        if (!miniEdge) {
            break;
        }

        var fromEdge = {
            fromId : miniEdge.fromId,
            toId   : miniEdge.toId,
            weight : miniEdge.weight
        } , toEdge = {
            fromId : miniEdge.toId,
            toId   : miniEdge.fromId,
            weight : miniEdge.weight
        };

        //选择过的最小边以后就不能再选了，由于是无向图，所以双向都得添加
        excepts.push(fromEdge);
        excepts.push(toEdge);

        miniAdjMatris.addEdge(fromEdge);
        miniAdjMatris.addEdge(toEdge);

        // 判断是否有回路
        // 如果产生回路，放弃该边
        // 如果没有回路，改边加入最小生成树
        if (miniAdjMatris.hasLoop()) {
            miniAdjMatris.delEdge(fromEdge);
            miniAdjMatris.delEdge(toEdge);
        } else {
            // debugger;
            var from = this.vertexs[this.id2Index(fromEdge.fromId)];
            var to = this.vertexs[this.id2Index(fromEdge.toId)];
            spanCost += fromEdge.weight;

            miniEdgeNum++;
            spanResult.push({
                from : from,
                to   : to,
                cost : fromEdge.weight
            });
        }
    }

    return {
        spanCost   : spanCost,
        spanResult : spanResult
    };
}


/**
 * 求解最短路径 -- 迪杰斯特拉算法
 */
AdjMatris.prototype.shortestPath = function(id) {

    var startIndex = this.id2Index(id);

    var doneMap = {};
    var path    = [];
    var dist    = [];
    var self    = this;

    //已经找到的最短路径数量
    var doneCount = 0;

    var findShortestVertex = function() {

        var miniDist  = Number.MAX_VALUE;
        var miniIndex = -1;

        for (var i = 0; i < self.vertexs.length; i++) {
            if(!doneMap[i] && dist[i] < miniDist) {
                miniIndex = i;
                miniDist = dist[i];
            }
        }

        return miniIndex;
    }

    var searchDirectVertexs = function(fromIndex) {
        var arr = [];
        for (var i = 0; i < self.vertexs.length; i++) {

            if(!doneMap[i] && self.matris[fromIndex][i] != Number.MAX_VALUE) {
                arr.push(i);
            }
        };
        return arr;
    }

    var copyPath = function(index) {
        var srcPath = path[index];
        var tarPath = [];
        for (var i = 0; i < srcPath.length; i++) {
            tarPath.push(srcPath[i]);
        };
        return tarPath;
    }

    for (var i = 0; i < this.vertexs.length; i++) {
        path.push([]);
        dist.push(this.matris[startIndex][i]);
        path[i].push(this.vertexs[startIndex]);
    }

    doneMap[startIndex] = true;

    while(doneCount < this.vertexs.length - 1) {

        var miniIndex = findShortestVertex();

        if(miniIndex == -1) {
            break;
        }

        doneMap[miniIndex] = true;
        path[miniIndex].push(this.vertexs[miniIndex]);
        doneCount++;

        var directVertexs = searchDirectVertexs(miniIndex);

        for (var i = 0; i < directVertexs.length; i++) {
            var toIndex = directVertexs[i];

            if(dist[miniIndex] + this.matris[miniIndex][toIndex] < dist[toIndex]) {
                dist[toIndex] = dist[miniIndex] + this.matris[miniIndex][toIndex];
                path[toIndex] = copyPath(miniIndex);
            }
        };
    }

    var result = [];

    for (var i = 0; i < path.length; i++) {

        result.push({
            from : this.vertexs[startIndex],
            to   : this.vertexs[i],
            path : path[i],
            dist : startIndex == i ? 0 : dist[i]
        });
    }

    return result;
}

