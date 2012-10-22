var PrefixCompute=function(P){
    var m=P.length,
        supportArr=[],
        k=0;
    supportArr[0]=0;
    for (var q = 1; q < m; q++){
        while(k>0&&P[k]!=P[q]){
            k=supportArr[k];
        }
        if(P[k]==P[q])
            k++;
        supportArr[q]=k;
    }
    return supportArr;
 }

 var KmpMatcher=function(T,P){
     var n=T.length,
         m=P.length,
         supportArr=PrefixCompute(P),
         q=0,
         result = [];

     for (var i = 0; i < n; i++){
         while(q>0&&P[q]!=T[i])
            q=supportArr[q];
         if(P[q]==T[i])
            q++;
         if(q==m){
            // console.log('Pattern occurs with shift index:'+(i-m + 1));
            result.push(i-m + 1);
            q=supportArr[q-1];
         }
     }

     return result;
 }
 
var input  = 'hello world hpf china hahaha world';
var output = KmpMatcher(input,'world');

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};