var selectSort = function(array){
    var i,j,d,temp,n=array.length;
    for(i=0;i<n;i++){
        d=i;
        for(j=i+1;j<n;j++){
            if(array[j]<array[d])
                d=j;
        }
        if(d!=i){
            temp=array[d];
            array[d]=array[i];
            array[i]=temp;
        }
    }
    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};