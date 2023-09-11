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
  dijkstra(src, dest) {
    let dist = new Array(this.noOfVertices);
    let sptSet = new Array(this.noOfVertices);
    let prev = new Array(this.noOfVertices);

    for (let i = 0; i < this.noOfVertices; i++) {
      dist[i] = Number.MAX_VALUE;
      sptSet[i] = false;
      prev[i] = -1;
    }

    dist[src] = 0;

    for (let count = 0; count < this.noOfVertices - 1; count++) {
      const u = this.minDistance(dist, sptSet);

      sptSet[u] = true;

      const neighbors = this.AdjList.get(u);
      if (neighbors) {
        for (let i = 0; i < neighbors.length; i++) {
          const v = neighbors[i];
          const weight = 1;
          if (
            !sptSet[v] &&
            dist[u] !== Number.MAX_VALUE &&
            dist[u] + weight < dist[v]
          ) {
            dist[v] = dist[u] + weight;
            prev[v] = u;
          }
        }
      }
    }

    const shortestPath = this.reconstructPath(prev, src, dest);
    return shortestPath;
  }

  reconstructPath(prev, src, dest) {
    const path = [];
    let current = dest;

    while (current !== -1) {
      path.unshift(current);
      current = prev[current];
    }

    if (path[0] === src) {
      return path;
    } else {
      return [];
    }
  }
  minDistance(dist, sptSet) {
    let min = Number.MAX_VALUE;
    let minIndex = -1;

    for (let v = 0; v < this.noOfVertices; v++) {
      if (!sptSet[v] && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  shortestPathBFS(src, dest) {
    const visited = {};
    const queue = new Queue();
    const prev = {};

    queue.enqueue(src);
    visited[src] = true;
    prev[src] = null;

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (current === dest) {
        return this.reconstructPathBFS(prev, src, dest);
      }

      const neighbors = this.AdjList.get(current);

      if (neighbors) {
        for (let i = 0; i < neighbors.length; i++) {
          const neighbor = neighbors[i];

          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.enqueue(neighbor);
            prev[neighbor] = current;
          }
        }
      }
    }

    return [];
  }

  reconstructPathBFS(prev, src, dest) {
    const path = [];
    let current = dest;

    while (current !== null) {
      path.unshift(current); 
      current = prev[current];
    }

    if (path[0] === src) {
      return path; 
    } else {
      return [];
    }
  }
}

let g = new Graph(6);

let vertices = [0, 1, 2, 3, 4, 5];

for (let i = 0; i < vertices.length; i++) {
  g.addVertex(vertices[i]);
}

g.addEdge(0, 1);
g.addEdge(0, 3);
g.addEdge(0, 4);
g.addEdge(1, 2);
g.addEdge(3, 4);
g.addEdge(4, 0);
g.addEdge(4, 2);
g.addEdge(2, 5);
g.printGraph();

console.log("BFS");
g.bfs(0);

console.log("DFS");
g.dfs(0);

let shortestPath = g.dijkstra(0, 5);

if (shortestPath.length > 0) {
  console.log("Shortest Path:", shortestPath);
} else {
  console.log("No path found.");
}


let shortestPathBFS = g.shortestPathBFS(0, 5);

if (shortestPathBFS.length > 0) {
    console.log("Shortest Path (BFS):", shortestPathBFS);
} else {
    console.log("No path found.");
}