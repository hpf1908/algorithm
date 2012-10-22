var quickSort = function(array){

    var i = 0;
    var j = array.length - 1;
    var Sort = function(i, j){

        // 结束条件
        if(i == j ){ return };

        var key = array[i];
        var stepi = i; // 记录开始位置
        var stepj = j; // 记录结束位置

        while(j > i){
            // j <<-------------- 向前查找
            if(array[j] >= key){
                j--;
            }else{
                array[i] = array[j]
                //i++ ------------>>向后查找
                while(j > ++i){
                    if(array[i] > key){
                        array[j] = array[i];
                        break;
                    }
                }
            }
        }

        // 如果第一个取出的 key 是最小的数
        if(stepi == i){
            Sort(++i, stepj);
            return ;
        }

        // 最后一个空位留给 key
        array[i] = key;

        // 递归
        Sort(stepi, i);
        Sort(j, stepj);
    }

    Sort(i, j);

    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};