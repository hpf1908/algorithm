/**
 * b- 树javascript实现
 */

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
    var index = this.findInsertIndex(bTreeNode.key);
    this.nodes.splice(index , 0 , bTreeNode);
    this.links.splice(index , 0 , null);
}

BMinusTreeNode.prototype.deleteBTreeNodeAtIndex = function(index) {
    if(index >= 0 && index < this.nodes.length) {
        this.nodes.splice(index , 1);
        this.links.splice(index , 1);
    }
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

BMinusTreeNode.prototype.findKeyIndex = function(key) {
    var arr = this.nodes;
    var low = 0;
    var heigh = arr.length - 1;
    var keyIndex = -1;

    while(low <= heigh) {
        var mid = Math.floor((low + heigh) / 2);
        var midkey = arr[mid].key;
        if(midkey == key) {
            keyIndex = mid;
            return keyIndex;
        } else if(midkey < key) {
            low = mid + 1;
        } else {
            heigh = mid - 1;
        }
    } 
    return keyIndex;
}

BMinusTreeNode.prototype.findKey = function(key) {
    var index = this.findKeyIndex(key);
    return index == -1 ? null : this.nodes[index];
}

BMinusTreeNode.prototype.lastNode = function() {
    return this.nodes.length > 0 ? this.nodes[this.nodes.length - 1] : null;
}

BMinusTreeNode.prototype.firstNode = function() {
    return this.nodes.length > 0 ? this.nodes[0] : null;
}

BMinusTreeNode.prototype.setLastNode = function(bTreeNode) {
    if(this.nodes.length > 0) {
        this.nodes[this.nodes.length - 1] = bTreeNode;
    }
}

BMinusTreeNode.prototype.setFirstNode = function(bTreeNode) {
    if(this.nodes.length > 0) {
        this.nodes[0] = bTreeNode;
    }
}

BMinusTreeNode.prototype.setNodeAtIndex = function(index , bTreeNode) {
    if(index >= 0 && index < this.nodes.length) {
        this.nodes[index] = bTreeNode;
    }
}

BMinusTreeNode.prototype.getNodeAtIndex = function(index) {
    if(index >= 0 && index < this.nodes.length) {
        return this.nodes[index];
    } else {
        return null;
    }
}

BMinusTreeNode.prototype.getLeftChildAtIndex = function(index) {
    if(index >= 0 && index < this.nodes.length) {
        return this.links[index];
    } else {
        return null;
    }
}

BMinusTreeNode.prototype.getRightChildAtIndex = function(index) {
    if(index >= 0 && index < this.nodes.length) {
        return this.links[index + 1];
    } else {
        return null;
    }
}

BMinusTreeNode.prototype.lastLink = function() {
    return this.links.length > 0 ? this.links[this.links.length - 1] : null;
}

//父亲节点指定index的关键字与子节点最大值交换位置
BMinusTreeNode.prototype._swapLeft = function(index) {

    var leftMinusChild = this.getLeftChildAtIndex(index);
    var temp = this.getNodeAtIndex(index);

    this.setNodeAtIndex(index , leftMinusChild.lastNode());
    leftMinusChild.setLastNode(temp);
    return leftMinusChild;
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

//删除指定关键字的节点
//step 1:找到要删除的节点
//step 2:假设叶节点之前的层次深度为h，判断删除节点深度是否为h, 如果是直接进入3,不是则与下一层交换直到深度为h
//step 3:删除节点 , 区分三种情况
//       删除节点分支小于 m/2
//       删除节点分支与兄弟节点分支都等于m/2
//       删除节点分支等于 m/2,兄弟节点大于m/2  
BMinusTree.prototype.del = function(key) {

    var p = this.head;
    var deleteMinusNode = null , deleteIndex = -1;
    var branchIndex ;
    var indexStack = new Stack();
    var parentStack = new Stack();
    var minDegree = Math.ceil(this.degree / 2);

    while(p) {
        deleteIndex = p.findKeyIndex(key);

        if(deleteIndex != -1) {
            deleteMinusNode = p;
            break;
        } else {
            branchIndex = p.findInsertIndex(key);

            //父节点进栈保存
            indexStack.push(branchIndex);
            parentStack.push(p);
            p = p.links[branchIndex];
        }
    }

    if(deleteMinusNode) {

        //删除非叶节点需要将该节点与前序或者后序的节点进行交换直到叶节点
        if(!deleteMinusNode.isLeaf()) {
            while(deleteMinusNode) {
                if(deleteMinusNode.isLeaf()) {
                    break;
                } else {

                    indexStack.push(deleteIndex);
                    parentStack.push(deleteMinusNode);

                    deleteMinusNode = deleteMinusNode._swapLeft(deleteIndex);
                    deleteIndex = deleteMinusNode.nodes.length - 1;
                }
            }
        }

        if(this.head.isLeaf()) {
            //待删除的节点是头节点，并且当前btree只有一个节点，直接删除
            deleteMinusNode.deleteBTreeNodeAtIndex(deleteIndex);
        } else if(deleteMinusNode.branchCount() == minDegree) {
            //分支等于miniDegree，区分是否有兄弟节点等于minDegree
            deleteMinusNode.deleteBTreeNodeAtIndex(deleteIndex);

            //当前被删除的节点进栈，依次向上判断分支是否小于minDegree
            parentStack.push(deleteMinusNode);
            indexStack.push(-1);

            while(!parentStack.empty()) {
                deleteMinusNode = parentStack.pop();
                indexStack.pop();

                var lastBranchIndex = indexStack.pop(); 
                var lastBranchNode  = parentStack.pop();
                var parentNode = lastBranchNode;
                var linksLength = lastBranchNode.links.length;

                //保存左兄弟与右兄弟
                var leftSibling = null, rightSibling = null;

                if(lastBranchIndex - 1 >= 0 && lastBranchIndex - 1 < linksLength){
                    leftSibling = lastBranchNode.links[lastBranchIndex - 1];
                }

                if(lastBranchIndex + 1 >= 0 && lastBranchIndex + 1 < linksLength){
                    rightSibling = lastBranchNode.links[lastBranchIndex + 1];
                }

                if(leftSibling) {

                    if(leftSibling.branchCount() == minDegree) {
                        //合并节点
                        var newNodes = leftSibling.nodes.concat(parentNode.getNodeAtIndex(lastBranchIndex - 1));
                        newNodes = newNodes.concat(deleteMinusNode.nodes);

                        var newLinks = leftSibling.links.concat(deleteMinusNode.links);
                        var newMinusNode = new BMinusTreeNode(newNodes , newLinks);

                        parentNode.links[lastBranchIndex - 1] = newMinusNode;

                        //父节点删除
                        parentNode.nodes.splice(lastBranchIndex - 1, 1);
                        parentNode.links.splice(lastBranchIndex , 1);

                        //合并到了根节点不需要向上遍历了
                        if(parentStack.empty()) {
                            this.head = newMinusNode;
                        } else {
                            indexStack.push(lastBranchIndex);
                            parentStack.push(lastBranchNode);
                        }
                    } else {
                        var leftMaxNode = leftSibling.lastNode();
                        var lastMaxLink = leftSibling.lastLink();

                        //父节点下移到右子节点
                        deleteMinusNode.nodes.splice(0, 0, parentNode.getNodeAtIndex(lastBranchIndex - 1));

                        //左兄弟节点移动
                        deleteMinusNode.links.splice(0, 0, lastMaxLink);
                        parentNode.setNodeAtIndex(lastBranchIndex - 1, leftMaxNode);

                        //删除左兄弟的节点
                        leftSibling.nodes.splice(leftSibling.nodes.length - 1, 1);
                        leftSibling.links.splice(leftSibling.links.length - 1, 1);
                        break;
                    }

                } else if(rightSibling) {

                    if(rightSibling.branchCount() == minDegree) {
                        //合并节点
                        deleteMinusNode.nodes.push(parentNode.getNodeAtIndex(lastBranchIndex));
                        var newNodes = deleteMinusNode.nodes;
                        newNodes = newNodes.concat(rightSibling.nodes);

                        var newLinks = deleteMinusNode.links.concat(rightSibling.links);
                        var newMinusNode = new BMinusTreeNode(newNodes , newLinks);

                        parentNode.links[lastBranchIndex] = newMinusNode;

                        //父节点删除
                        parentNode.nodes.splice(lastBranchIndex, 1);
                        parentNode.links.splice(lastBranchIndex + 1, 1);

                        //合并到了根节点不需要向上遍历了
                        if(parentStack.empty()) {
                            this.head = newMinusNode;
                        } else {
                            indexStack.push(lastBranchIndex);
                            parentStack.push(lastBranchNode);
                        }
                    } else {
                        var rightMinNode = rightSibling.lastNode();
                        var rightMinLink = rightSibling.lastLink();

                        //父节点下移到左子节点
                        deleteMinusNode.nodes.splice(deleteMinusNode.nodes.length - 1, 0, parentNode.getNodeAtIndex(lastBranchIndex));

                        //右兄弟节点移动
                        deleteMinusNode.links.splice(deleteMinusNode.links.length - 1, 0, rightMinLink);
                        parentNode.setNodeAtIndex(lastBranchIndex, rightMinNode);

                        //删除右兄弟的节点
                        rightSibling.nodes.splice(0, 1);
                        rightSibling.links.splice(0, 1);

                        break;
                    }
                }
            }

        } else {
            //分支大于minDegree，直接删除
            deleteMinusNode.deleteBTreeNodeAtIndex(deleteIndex);
        }
    }

}



