var insertSort = function(array){
    var i, j, key,
        len = array.length;

    for(i=1 ; i < len; i++){
        key = array[i];
        j = i-1;
        while(j>-1 && key <array[j]){
            array[j+1] = array[j--];
        }
        array[j+1] = key;
    }

    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};