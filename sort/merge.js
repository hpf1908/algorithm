var mergeSort = function(array){
 
    var MERGE=function(arrSrc,arrCopy,s,u,v){
        var i=s,j=u+1,q=s;
        while(i<=u && j<=v){
            if(arrSrc[i]<=arrSrc[j])
                arrCopy[q++]=arrSrc[i++];
            else
                arrCopy[q++]=arrSrc[j++];
        }
        while(i<=u)
            arrCopy[q++]=arrSrc[i++];
        while(j<=v)
            arrCopy[q++]=arrSrc[j++];
    }

    var MPASS=function(arrSrc,arrCopy,n,t){
        var i=0,j;
        while( n-i >=2*t){
            MERGE(arrSrc,arrCopy,i,i+t-1,i+2*t-1);
            i=i+2*t;
        }
        if(n-i >t)
            MERGE(arrSrc,arrCopy,i,i+t-1,n-1);
        else
            for(j=i;j<n;j++)
                arrCopy[j]=arrSrc[j];
    }

    var tempArray=[],t=1,n=array.length,result;
    while(t<n){
        MPASS(array,tempArray,n,t);
        result=tempArray;
        t *=2;
        if(t<=n){
            MPASS(tempArray,array,n,t);
            result=array;
        }
        t *=2;
    }
    return result;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};