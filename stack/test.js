var st = new Stack();

st.push(1);
st.push(2);
st.push(3);

console.log(st.pop());
console.log(st.pop());
console.log(st.pop());

console.log(st.top);

var input = "123";
var hex = 16;

var hex10 = hexConvertNto10(hex , "123");

console.log("input:" + input + " hex:" + hex + " to10:" + hex10 );

var hexOrigin = hexConvert10toN(hex , hex10);

console.log("input:" + hex10 + " hex:10" + " to" + hex + ":" + hexOrigin);

var output = hexConvertN2M(10 , 16 , 123);
console.log(output);