/**
 * @todo 实现aov网络的拓扑排序
 * @todo 计算aov网络的关键路径
 */

AovMatris = function(vertexs , edges) {
    AdjMatris.apply(this , arguments);
 }

AovMatris.prototype = new AdjMatris([],[]);
AovMatris.prototype.constructor = AovMatris;

AdjMatris.prototype.getInputAdjByIndexWithMap = function(index , rangedMap) {

    var res = [];

    for (var i = 0; i < this.vertexs.length; i++) {
        var vertex = this.vertexs[i];

        if(rangedMap[vertex.id]) {
            continue;
        }

        var fMartis = this.matris[i];
        if(fMartis && fMartis[index] != Number.MAX_VALUE && this.vertexs[i]) {
            res.push(this.vertexs[i]);
        }
    };
    return res;
}

//查找没有入度的节点
AovMatris.prototype.findVertexHasNoInput = function(rangedMap) {

    for (var i = 0; i < this.vertexs.length; i++) {
        var vertex = this.vertexs[i];

        if(rangedMap[vertex.id]) {
            continue;
        }

        var index = this.id2Index(vertex.id);
        var inputs = this.getInputAdjByIndexWithMap(index , rangedMap);

        if(inputs.length == 0) {
            return vertex;
        }
    }

    return null;
}

AovMatris.prototype.topoSort = function() {

    //已经排序过的节点的标志位
    var hasRanged = {};
    var result = [];
    var tempAovMatris = new AovMatris(this.vertexs, this.edges);

    for (var i = 0; i < this.vertexs.length; i++) {
        var vertexNoInput = tempAovMatris.findVertexHasNoInput(hasRanged);

        if(vertexNoInput == null) {
            break;
        }

        hasRanged[vertexNoInput.id] = true;
        result.push(vertexNoInput);
    }

    if(result.length == this.vertexs.length) {
        return result;
    } else {
        return null;
    }
}

AovMatris.prototype.getEarlestTime = function(inputVertex , earlestMap) {

    var ealestTime = - Number.MAX_VALUE;
    var index = this.id2Index(inputVertex.id);

    for (var i = 0; i < this.vertexs.length; i++) {
        var vertex = this.vertexs[i];
        var fMartis = this.matris[i];

        if(fMartis && fMartis[index] != Number.MAX_VALUE) {
            var tempVertex = this.vertexs[i];
            var tempEe = earlestMap[tempVertex.id];
            var ee = tempEe + fMartis[index];

            if( ee  > ealestTime) {
                ealestTime = ee;
            }
        }
    }

    return ealestTime < 0 ? 0 : ealestTime;
}

AovMatris.prototype.getLatestTime = function(inputVertex , earlestMap , latestMap) {

    var latestTime = Number.MAX_VALUE;
    var index = this.id2Index(inputVertex.id);
    var fMartis = this.matris[index];

    for (var i = 0; i < this.vertexs.length; i++) {
        if(fMartis && fMartis[i] != Number.MAX_VALUE && this.vertexs[i]) {
            var tempVertex = this.vertexs[i];
            var tempLe = latestMap[tempVertex.id];
            var le = tempLe - fMartis[i];

            if(le < latestTime) {
                latestTime = le;
            }
        }
    }

    return latestTime == Number.MAX_VALUE ? earlestMap[inputVertex.id] : latestTime;
}

AovMatris.prototype.criticalPath = function() {

    var topoResult = this.topoSort();


    if(!topoResult) {
        return;
    }

    var eeMap = {} , leMap = {};

    for (var i = 0; i < topoResult.length; i++) {
        var vertex = topoResult[i];
        var ee = this.getEarlestTime(vertex , eeMap);
        eeMap[vertex.id] = ee;
    }

    for (var i = topoResult.length -1; i >= 0; i--) {
        var vertex = topoResult[i];
        var le = this.getLatestTime(vertex , eeMap , leMap);
        leMap[vertex.id] = le;
    }

    var edgeEe = {} , edgeLe = {} , criticalPath = [];

    for (var i = 0; i < this.edges.length; i++) {
        var edge = this.edges[i];
        edgeEe[i] = eeMap[edge.fromId];
        edgeLe[i] = leMap[edge.toId] - edge.weight;

        if(edgeEe[i] == edgeLe[i]) {
            criticalPath.push(edge);
        }
    }

    console.log(eeMap);
    console.log(leMap);

    console.log(edgeEe);
    console.log(edgeLe);

    return criticalPath;
}

