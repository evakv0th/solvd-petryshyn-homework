import { Queue } from "./queue.js";

class Graph {
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }
  addVertex(v) {
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    this.AdjList.get(v).push(w);

    this.AdjList.get(w).push(v);
  }

  printGraph() {
    let get_keys = this.AdjList.keys();

    for (let i of get_keys) {
      let get_values = this.AdjList.get(i);
      let conc = "";

      for (let j of get_values) conc += j + " ";

      console.log(i + " -> " + conc);
    }
  }
  bfs(startingNode) {
    const visited = {};

    const q = new Queue();

    visited[startingNode] = true;
    q.enqueue(startingNode);

    while (!q.isEmpty()) {
      const getQueueElement = q.dequeue();

      console.log(getQueueElement);

      const get_List = this.AdjList.get(getQueueElement);

      for (let i in get_List) {
        const neigh = get_List[i];

        if (!visited[neigh]) {
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
    }
  }

  dfs(startingNode) {
    const visited = {};

    this.DFSUtil(startingNode, visited);
  }

  DFSUtil(vert, visited) {
    visited[vert] = true;
    console.log(vert);

    const get_neighbours = this.AdjList.get(vert);

    for (let i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
    }
  }
}

let g = new Graph(6);

let verticals = ["A", "B", "C", "D", "E", "F"];

for (let i = 0; i < verticals.length; i++) {
  g.addVertex(verticals[i]);
}

g.addEdge("A", "B");
g.addEdge("A", "D");
g.addEdge("A", "E");
g.addEdge("B", "C");
g.addEdge("D", "E");
g.addEdge("E", "F");
g.addEdge("E", "C");
g.addEdge("C", "F");
g.printGraph();

console.log("BFS");
g.bfs("A");

console.log("DFS");
g.dfs("A");
