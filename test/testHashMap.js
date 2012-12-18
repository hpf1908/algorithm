
var hashMap = new HashMap();

hashMap.put(1,'hello');
hashMap.put(2,'world');
hashMap.put(3,'fly');

console.log(hashMap.get(1));
console.log(hashMap.get(2));
console.log(hashMap.get(3));

hashMap.put(1,'heihei');
hashMap.put(2,'hoho');
hashMap.put(3,'yaya');

console.log(hashMap.get(1));
console.log(hashMap.get(2));
console.log(hashMap.get(3));

hashMap.put('lilei','李雷');
hashMap.put('李雷','lilei');

console.log(hashMap.get('lilei'));
console.log(hashMap.get('李雷'));