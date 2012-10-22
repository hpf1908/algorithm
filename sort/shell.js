var shellSort = function(array){
 
    var stepArr = [1750, 701, 301, 132, 57, 23, 10, 4, 1]; // reverse() 在维基上看到这个最优的步长 较小数组
    //var stepArr = [1031612713, 217378076, 45806244, 9651787, 2034035, 428481, 90358, 19001, 4025, 836, 182, 34, 9, 1]//针对大数组的步长选择
    var i = 0;
    var stepArrLength = stepArr.length;
    var len = array.length;
    var len2 =  parseInt(len/2);

    for(;i < stepArrLength; i++){
        if(stepArr[i] > len2){
            continue;
        }

        stepSort(stepArr[i]);
    }

    // 排序一个步长
    function stepSort(step){

        //console.log(step) 使用的步长统计

        var i = 0, j = 0, f, tem, key;
        var stepLen = len%step > 0 ?  parseInt(len/step) + 1 : len/step; 

        for(;i < step; i++){// 依次循环列

            for(j=1;/*j < stepLen && */step * j + i < len; j++){//依次循环每列的每行
                tem = f = step * j + i;
                key = array[f];

                while((tem-=step) >= 0){// 依次向上查找
                    if(array[tem] > key){
                        array[tem+step] = array[tem];
                    }else{
                        break;
                    }
                }

                array[tem + step ] = key;

            }
        }

    }

    return array;
}

var input  = [9,8,71,13,45,5,98,12,43,14,11];
var output = bubbleSort(input);

for (var i = 0; i < output.length; i++) {
    console.log(output[i]);
};