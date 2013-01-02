var BTreeNode = function(key , value) {
    this.key   = key;
    this.value = value;
}

/////////////////////BMinusTreeNode/////////////////////////////
var BMinusTreeNode = function(nodes , links) {
    this.nodes = nodes || [];       //保存关键字
    this.links = links || [null];   //保存节点链接
}

BMinusTreeNode.prototype.findInsertIndex = function(key) {

    var targetIndex = this.nodes.length;

    for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        if(key < node.key) {
            targetIndex = i;
            break;
        }
    }
    return targetIndex;
}

BMinusTreeNode.prototype.nextChild = function(key) {
    var index = this.findInsertIndex(key);
    return this.links[index];
}

BMinusTreeNode.prototype.insertBTreeNodeOnLeaf = function(bTreeNode) {
    var index = this.findInsertIndex(bTreeNode);
    this.nodes.splice(index , 0 , bTreeNode);
    this.links.splice(index , 0 , null);
}

BMinusTreeNode.prototype.branchCount = function() {
    return this.nodes.length + 1;
}

BMinusTreeNode.prototype.isLeaf = function() {
    return !this.links[0];
}

//是否分支超出了阶数
BMinusTreeNode.prototype.isBTreeNodeBranchExceed = function(degree) {
    return this.branchCount() > degree;
}

//分裂
BMinusTreeNode.prototype.splitToParent = function(parentNode , linkIndex) {

    var mid = this.nodes.length % 2 == 0 ? this.nodes.length / 2 - 1 
                                         : Math.floor(this.nodes.length / 2);

    var upNode = this.nodes[mid];

    var leftNodes = this.nodes.slice(0 , mid );
    var leftLinks = this.links.slice(0 , mid + 1);

    var leftNode  = new BMinusTreeNode(leftNodes , leftLinks);

    var rightNodes = this.nodes.slice(mid + 1);
    var rightLinks = this.links.slice(mid + 1);
    var rightNode  = new BMinusTreeNode(rightNodes , rightLinks);

    //合并到上层节点
    parentNode.nodes.splice(linkIndex, 0 , upNode);
    parentNode.links[linkIndex] = leftNode;
    parentNode.links.splice(linkIndex + 1, 0 , rightNode);
}

BMinusTreeNode.prototype.findKey = function(key) {
    var arr = this.nodes;
    var low = 0;
    var heigh = arr.length;

    while(low < heigh) {
        var mid = Math.floor((low + heigh) / 2);
        var midkey = arr[mid].key;
        if(midkey == key) {
            return arr[mid];
        } else if(midkey < key) {
            low = mid + 1;
        } else {
            heigh = mid - 1;
        }
    } 
    return null;
}

//////////////////////BMinusTree////////////////////////////
var BMinusTree = function(degree) {
    this.degree = degree;   //阶数
    this.head   = new BMinusTreeNode();     //头节点
}

//添加节点
BMinusTree.prototype.add = function(bTreeNode) {

    var nodeStack = new Stack();
    var linkStack = new Stack();

    var p = this.head;
    var key = bTreeNode.key;

    while(p) {
        var linkIndex = p.findInsertIndex(key);
        nodeStack.push(p);
        linkStack.push(linkIndex);
        p = p.links[linkIndex];
    }

    var insertNode = nodeStack.pop();
    insertNode.insertBTreeNodeOnLeaf(bTreeNode);
    nodeStack.push(insertNode);
    linkStack.pop();

    while(!nodeStack.empty()) {
        var minusTreeNode = nodeStack.pop();
        var linkIndex = linkStack.empty() ? -1 : linkStack.pop();

        if(minusTreeNode.isBTreeNodeBranchExceed(this.degree)) {
            //should split
            var parentNode = nodeStack.pop();

            //合并到上层节点，如果到根节点，则增加一层
            if(parentNode) {
                minusTreeNode.splitToParent(parentNode , linkIndex);
                nodeStack.push(parentNode);
            } else {
                parentNode = new BMinusTreeNode();
                linkIndex  = 0;
                minusTreeNode.splitToParent(parentNode , linkIndex);
                this.head = parentNode;
                break;
            }
        } else {
            break;
        }
    }
}

//删除指定关键字的节点
BMinusTree.prototype.del = function(key) {

}

//搜索指定关键字的节点
BMinusTree.prototype.search = function(key) {

    var p = this.head;
    var result = null;

    while(p) {
        result = p.findKey(key);

        if(result) {
            return result;
        } else {
            p = p.nextChild(key);
        }
    }
    return result;
}

