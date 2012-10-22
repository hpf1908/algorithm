var heapSort = function(arr){
 
    var adjust=function(arr,i,n){
        var j = 2*i+1,temp=arr[i];
        while( j<n ){
            if( j<n-1 && arr[j]<arr[j+1])
                j++;
            if(temp >= arr[j])
                break;
            arr[Math.floor((j-1)/2)] = arr[j];
            j = 2*j+1;
        }
        arr[Math.floor((j-1)/2)]=temp;
    }

    var n=arr.length,
        i=Math.floor((n-1)/2),
        temp;
    for(; i >= 0; i--){
        adjust(arr,i,n);
    }

    for( i =n-2; i>=0; i--){
        temp=arr[i+1];
        arr[i+1]=arr[0];
        arr[0]=temp;
        adjust(arr,0,i);
    }

    return arr;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};