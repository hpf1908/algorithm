
/**
 * n进制转为m进制数
 */
var hexConvertN2M = function(n , m , hexNum){
	var input  = hexConvertNto10(n , hexNum);
	var output = hexConvert10toN(m , input);
	return output;
}

var hexConvertNto10 = function(n , hexNum){
	var result = 0;
	var asciiCodeA = 'a'.charCodeAt(0);
	var asciiCode0 = '0'.charCodeAt(0);
	var asciiCode9 = '9'.charCodeAt(0);

	hexNum += "";
	for(var i = hexNum.length - 1, j = 0; i >= 0; i--,j++) {
		var asciiCode = hexNum.charCodeAt(i) , num;
		if(asciiCode >= asciiCode0 && asciiCode <= asciiCode9) {
			num = asciiCode - asciiCode0;
		} else if(asciiCode >= asciiCodeA) {
			num = asciiCode - asciiCodeA + 10;
		} else {
			return -1;
		}
		result += num * Math.pow(n , j);
	}
	return result;
}

var hexConvert10toN = function(n , hexNum) {
	var stack = new Stack();
	var asciiCodeA = 'a'.charCodeAt(0);
	var result = "";
	hexNum += "";
	do {
		stack.push(hexNum % n);
		hexNum = Math.floor(hexNum / n);
	} while(hexNum != 0);

	while(stack.top >=0) {
		var num = stack.pop();
		if(num >= 0 && num <=9) {
			result += num;
		} else {
			result += String.fromCharCode(num - 10 + asciiCodeA);
		}
	}

	return result;
}