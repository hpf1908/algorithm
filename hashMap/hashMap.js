
/**
 * 哈希表实现，冲突时处理的方法采用链地址法
 */
var HashMap = function(capacity , hashCodeMethod) {

    //默认取1000以下最大的质数，取质数是为了减少冲突
    capacity = capacity ? capacity : 997;
    this.capacity = capacity;
    this.keyLinks = this.initArray(capacity);
    this.hashCodeMethod = typeof(hashCodeMethod) == 'function' ? hashCodeMethod : null;
}

HashMap.prototype.createKeyObject = function(key , value) {
    return {
        key : key,
        value : value
    }
}

HashMap.prototype.initArray= function(count , callback) {

    var arr = [];
    for (var i = 0; i < count; i++) {
        arr.push(undefined);
    }

    return arr;
}

//将key逐个转为charCode的数字对其取余数再求和得到数字
HashMap.prototype.converKeyToInt= function(key) {
    key = key + '';
    var code = 0;
    for (var i = 0; i < key.length; i++) {
        code += key.charCodeAt(i) % this.capacity;
    }
    return code;
}

//哈希值的计算，此处采用平方取余数法
HashMap.prototype.hashCode = function(key) {

    if(this.hashCodeMethod) {
        return this.hashCodeMethod.call(this, key , this.capacity);
    }

    var codeInt = this.converKeyToInt(key);
    return codeInt * codeInt % this.capacity;
}

HashMap.prototype.put = function(key , value) {

    var hashCode = this.hashCode(key);
    var keysLinkHead = this.keyLinks[hashCode];

    // console.log('hashCode:' + hashCode);

    if(!keysLinkHead) {
        var keyObject = this.createKeyObject(key , value);
        var linkList = createLinkList([keyObject]);
        this.keyLinks[hashCode] = linkList;
    } else {

        var linkList = keysLinkHead;
        var keyObject = null;
        var pnode = linkList;
        var isKeyInList = false;

        while(pnode) {
            keyObject = pnode.data;

            if(keyObject && keyObject.key == key) {
                keyObject.value = value;
                isKeyInList = true;
                break;
            } else {
                //如果到这里说明冲突了
                // console.log('collision found key:'+ key+ ' hashCode:' +  hashCode );
            }
            pnode = pnode.link;
        }

        if(!isKeyInList) {
            keyObject = this.createKeyObject(key , value);
            linkList  = insertNodeAtHead(keyObject, linkList);
            this.keyLinks[hashCode] = linkList;
        }
    }
}

HashMap.prototype.get = function(key) {

    var hashCode = this.hashCode(key);
    var keysLinkHead = this.keyLinks[hashCode];

    if(!keysLinkHead) {
        return undefined;
    }

    var pnode = keysLinkHead;
    var keyObject = null;

    while(pnode) {
        keyObject = pnode.data;
        if(keyObject && keyObject.key == key) {
            return keyObject.value;
        }
        pnode = pnode.link;
    }

    return undefined;
}




