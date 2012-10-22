var bubbleSort = function(array){

    var len = array.length,
        i = len ,
        j, d ,flag = 1;

    while(i>=0 && flag==1){
        flag=0;
        for(j=0; j<i; j++){
            if(array[j+1] < array[j]){
                d = array[j];
                array[j] = array[j+1];
                array[j+1] = d;
                flag =1;
            }
        }
        i--;
    }
    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};