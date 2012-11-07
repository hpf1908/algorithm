//暂时不考虑通用性
var createHuffmanTree = function(bTrees) {
	
	var trees = bTrees;

	while(trees.length > 1) {

		var minIndex1 = 0;
		var minIndex2 = 1;

		for (var i = 2; i < trees.length; i++) {
			var minNode1 = trees[minIndex1];
			var minNode2 = trees[minIndex2];
 
			if(trees[i].weight < minNode1.weight) {
				minIndex1 = i;
				continue;
			}

			if(trees[i].weight < minNode2.weight) {
				minIndex2 = i;
				continue;
			}
		}

		var mergeNode1 = trees[minIndex1];
		var mergeNode2 = trees[minIndex2];

		var newNode = new BinaryTreeNode();
		newNode.weight = mergeNode1.weight + mergeNode2.weight;

		newNode.leftChild = mergeNode1;
		newNode.rightChild = mergeNode2;
		mergeNode1.parent = newNode;
		mergeNode2.parent = newNode;
		newNode.parent = null;

		trees.splice(Math.max(minIndex1 , minIndex2) , 1);
		trees.splice(Math.min(minIndex1 , minIndex2) , 1);

		//最后添加tree
		trees.push(newNode);
	}

	return trees[0];
}

var buildWeightTrees = function(str){
	var weightMap = {};

	for (var i = 0; i < str.length; i++) {
		var c = str.charAt(i);

		if(!weightMap[c]) {
			weightMap[c] = 1;
		} else {
			weightMap[c]++;
		}
	};

	var trees = [];

	for (var key in weightMap) {
		var node = new BinaryTreeNode();
		node.weight = weightMap[key];
		node.alpha = key;
		trees.push(node);
	};

	return trees;
}

var getHuffmanCodes = function(node) {
	var codes = [];
	while(node.parent) {
		if(node.parent.leftChild == node) {
			codes.splice(0 , 0 , 0);
		} else {
			codes.splice(0 , 0 , 1);
		}
		node = node.parent;
	}

	if(codes.length == 0) {
		codes[0] = '0';
	}
	return codes;
}

var encodeHuffumanCodes = function(head) {
	var codeTables = {};

	preOrderTravel(head , function(node) {
		if(!node.leftChild && !node.rightChild) {
			codeTables[node.alpha] = getHuffmanCodes(node);
		}
	});
	return codeTables;
}

var decodeHuffumanCodes = function(bits , tables , len) {
	var temp = '';
	var result = '';
	var dLen = 0;
	for (var i = 0; i < bits.length; i++) {
		temp += bits.charAt(i);


		if(tables[temp]) {
			// console.log(temp);
			result+= tables[temp];
			dLen++;

			if(dLen >= len) {
				break;
			}
			temp = '';
		}
	}

	return result;
}

var huffmanEncodeStringByTables = function(str , tables){
	var arr = [];
	for (var i = 0; i < str.length; i++) {
		var code = tables[str.charAt(i)].join('') + '';
		arr.push(code);
	};
	return arr.join('');
}

var decodeHuffmanHeaderString = function(str){
	var codesTable = {};
	var arr = str.split('~');

	for (var i = 0; i < str.length; i++) {
		if(arr[i]) {
			var alpha = arr[i].substring(0 , 1);
			var code = arr[i].substring(1 , arr[i].length);
			codesTable[code] = alpha;
		}
	};
	return codesTable;
}

var encodeHuffmanHeaderString = function(tables) {
	var arr = [];
	for (var key in tables) {
		arr.push(key + tables[key].join(''));
	};
	return arr.join('~');
}

var huffmanEncodeString = function(str , needTable) {

	var trees = buildWeightTrees(str);
	var huffmanTreeRoot = createHuffmanTree(trees);
	// console.log(huffmanTreeRoot);
	var codesTables = encodeHuffumanCodes(huffmanTreeRoot);
	// console.log(codesTables);
	var result = huffmanEncodeStringByTables(str , codesTables);
	return result;
}

//将二进制位表示的按照8bit分隔转为二进制字符串
var convertBitsToString = function(code) {
	var result = '';
	var devide = Math.floor(code.length / 4);
	var tailStart = devide * 4; 

	var fixLowerBit = function(str) {
		for (var j = str.length; j < 4; j++) {
			str += '0';
		}
		return str;
	}

	// console.log('codes:' + code);
	for (var i = 0; i < devide; i++) {
		var temp = code.substring(i * 4, (i + 1) * 4);
		str = fixLowerBit(temp);
		result+= hexConvertN2M(2 , 16, str);
	}

	if(tailStart < code.length) {
		var temp = code.substring(tailStart, code.length);
		// console.log('tailbits:' + temp);
		str = fixLowerBit(temp);
		result+= hexConvertN2M(2 , 16, str);
	}

	return result;
}

var convertStringToBits = function(code) {

	var result = '';

	var fixHighBit = function(str) {
		for (var j = str.length; j < 4; j++) {
			str = '0' + str;
		}
		return str;
	}

	for (var i = 0; i < code.length; i++) {
		var temp = code.charAt(i);
		// console.log(temp + ' ' + i);
		temp = hexConvertN2M(16 , 2, temp);
		// console.log(temp);
		result+= fixHighBit(temp);
	}

	return result;
}

//压缩字符串:没什么实际用途，只是为了学习
var huffmanCompressString = function(str) {
	var trees = buildWeightTrees(str);
	var huffmanTreeRoot = createHuffmanTree(trees);
	var codesTables = encodeHuffumanCodes(huffmanTreeRoot);
	var result = huffmanEncodeStringByTables(str , codesTables);
	var splitChars = '|-|';
	var lengthHeader = str.length;
	var compressHeader = lengthHeader + splitChars + encodeHuffmanHeaderString(codesTables);
	var compressResult = convertBitsToString(result);
	return compressHeader + splitChars + compressResult;
}

//解压缩字符串
var huffmanDeCompressString = function(str) {
	var splitChars = '|-|'
	var splitArr = str.split(splitChars);
	var lenghtHeader = splitArr[0];
	var compressHeader = splitArr[1];
	var compressResult = splitArr[2];

	// console.log(lenghtHeader);
	// console.log(compressHeader);
	// console.log(compressResult);

	//数据长度
	var len = parseInt(lenghtHeader , 10);
	var codesTables = decodeHuffmanHeaderString(compressHeader);
	var bits = convertStringToBits(compressResult);
	console.log(bits);
	var decodeResult = decodeHuffumanCodes(bits , codesTables , len);
	return decodeResult;
}
