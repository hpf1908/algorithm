/**
 *
 *  
    解析几何  -- 微积分  -- 线性代数  -- 自动机理论
     |              -
     |                -
    汇编  -- 计算机组成原理  数值分析
     |   -
     |       -  
    计算机导论  - - 高级语言
 *
 */

var inputVertexs = [];

inputVertexs.push(new Vertex(1 , '解析几何'));
inputVertexs.push(new Vertex(2 , '汇编'));
inputVertexs.push(new Vertex(3 , '计算机导论'));
inputVertexs.push(new Vertex(4 , '微积分'));
inputVertexs.push(new Vertex(5 , '计算机组成原理'));
inputVertexs.push(new Vertex(6 , '高级语言'));
inputVertexs.push(new Vertex(7 , '线性代数'));
inputVertexs.push(new Vertex(8 , '数值分析'));
inputVertexs.push(new Vertex(9 , '自动机理论'));

var inputEdges = [];

inputEdges.push(new Edge(1 , 2, 5));
inputEdges.push(new Edge(1 , 4, 5));

inputEdges.push(new Edge(2 , 5, 5));
inputEdges.push(new Edge(2 , 6, 5));

inputEdges.push(new Edge(3 , 2, 5));
inputEdges.push(new Edge(3 , 6, 5));

inputEdges.push(new Edge(4 , 7, 5));
inputEdges.push(new Edge(4 , 8, 5));

// inputEdges.push(new Edge(5 , 6, 5));

inputEdges.push(new Edge(6 , 5, 5));

inputEdges.push(new Edge(7 , 9, 5));

console.log('topoSort ---- test');

var avoMatris = new AovMatris(inputVertexs,inputEdges);

console.log(avoMatris.topoSort());


