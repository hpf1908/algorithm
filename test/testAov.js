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

inputEdges.push(new Edge(1 , 2, 15));
inputEdges.push(new Edge(1 , 4, 2));

inputEdges.push(new Edge(2 , 5, 3));
inputEdges.push(new Edge(2 , 6, 5));

inputEdges.push(new Edge(3 , 2, 1));
inputEdges.push(new Edge(3 , 6, 2));

inputEdges.push(new Edge(4 , 7, 4));
inputEdges.push(new Edge(4 , 8, 8));

// inputEdges.push(new Edge(5 , 6, 5));

inputEdges.push(new Edge(6 , 5, 5));

inputEdges.push(new Edge(7 , 9, 5));

console.log('topoSort ---- test');

var avoMatris = new AovMatris(inputVertexs,inputEdges);

console.log(avoMatris.topoSort());

/**
 *
 *  
                                 10 后台编码完成  3
    做网站  3 需求分析完成 5 设计完成                  联调完成 10 测试上线
                                 7  前台编码完成  3
 *
 */

var inputVertexs = [];

inputVertexs.push(new Vertex(1 , '做网站'));
inputVertexs.push(new Vertex(2 , '需求分析完成'));
inputVertexs.push(new Vertex(3 , '设计完成'));
inputVertexs.push(new Vertex(4 , '后台编码完成'));
inputVertexs.push(new Vertex(5 , '前台编码完成'));
inputVertexs.push(new Vertex(6 , '联调完成'));
inputVertexs.push(new Vertex(7 , '测试上线'));

var inputEdges = [];

inputEdges.push(new Edge(1 , 2, 3));

inputEdges.push(new Edge(2 , 3, 5));

inputEdges.push(new Edge(3 , 4, 10));
inputEdges.push(new Edge(3 , 5, 7));

inputEdges.push(new Edge(4 , 6, 3));

inputEdges.push(new Edge(5 , 6, 3));

inputEdges.push(new Edge(6 , 7, 10));

console.log('topoSort ---- criticalPath');

var avoMatris = new AovMatris(inputVertexs,inputEdges);

console.log(avoMatris.criticalPath());


