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

