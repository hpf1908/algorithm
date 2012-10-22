 var RabinKappMatcher= function(T,P,d,q){
    var n=T.length,
        m=P.length,
        h=Math.pow(d, m-1)%q,
        p=0,
        t=[],
        result = [];

    t[0]= 0;
    for (var i = 0; i < m; i++){
        p=(d*p+P.charCodeAt(i))%q;
        t[0]=(d*t[0]+T.charCodeAt(i))%q;
    }

    for (var s = 0; s <= n-m; s++){
        // console.log(t[s]);
        if(p==t[s]){
            if(T.slice(s,s+m)==P) {
                result.push(s);
                // console.log('pattern accurs at index:'+s);
            }
        }
        if(s<n-m)
            t[s+1]=(d*(t[s]-T.charCodeAt(s)*h)+T.charCodeAt(s+m))%q;
    }

    return result;
}

var input  = 'hello world hpf china hahaha world';
var output = RabinKappMatcher(input,'world',128,69999977777);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};