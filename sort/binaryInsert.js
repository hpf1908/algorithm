var binaryInsertSort = function(array){

    var i,j,low,high,mid,temp,n=array.length;

    for(i=1;i<n;i++){
        temp = array[i];
        low = 0;
        high = i-1;
        while(low <= high){
            mid = Math.floor((low + high) /2);
            if(temp <array[mid])
                high = mid -1;
            else
                low = mid +1;
        }

        for(j=i-1;j>=low;j--){
            array[j+1]=array[j];
        }
        array[low]=temp;
    }
    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};