/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;
import java.util.PriorityQueue;

/**
 *
 * @author AORUS
 */
public class GraphP {

    /*
            (5)
      0 -------- 1
                / \
            (1)/   \(3)
              /     \
             2 ----- 3
              \ (1)
            (2)\ 
                \ 
                 4
     */
    void call() {
        int V = 5;

        ArrayList<Edge>[] graph = new ArrayList[V]; //null -> empty arraylist

//        for (int i = 0; i < V; i++) {
//            graph[i] = new ArrayList<>();
//        }
////        0 -> vertix
//        graph[0].add(new Edge(0, 1, 5));
//
////        1 -> vertix
//        graph[1].add(new Edge(1, 0, 5));
//        graph[1].add(new Edge(1, 2, 1));
//        graph[1].add(new Edge(1, 3, 3));
//
////        2-> vertix
//        graph[2].add(new Edge(2, 1, 1));
//        graph[2].add(new Edge(2, 3, 1));
//        graph[2].add(new Edge(2, 4, 2));
//
////        3-> vertix
//        graph[3].add(new Edge(3, 1, 3));
//        graph[3].add(new Edge(3, 2, 1));
//
////        4-> vertix
//        graph[4].add(new Edge(4, 2, 2));
//        vertixNeigbors(graph, 2);
        createGraph(graph);
//        bfs(graph);
//        System.out.println("");
//        dfs(graph);
//        System.out.println("");
//        System.out.println(hasPath(graph, 0, 5, new boolean[V]));
//        System.out.println(detectCycle(graph));
//        System.out.println(isBipartie(graph));

//        System.out.println(isCycle(graph));
//        System.out.println("");
//        topologicalSort(graph);
//        bfsTopSort(graph);
//        printAllPath(graph, 5, 1, "");
//        dijkastra(graph, 0);
//        bellmanFord(graph, 0);
//        primsMST(graph);
//        System.out.println(cheapestFlight(4, new int[][]{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 1));
        int[][] cities = {
            {0, 1, 2, 3, 4},
            {1, 0, 5, 0, 7},
            {2, 5, 0, 6, 0},
            {3, 0, 6, 0, 0},
            {4, 7, 0, 0, 0}
        };

//        connectingCities(cities);
        Disjoint disjoint = new Disjoint();
        disjoint.call();
    }

    /*
            1 ---- 3
           /       | \
          0        |   5 -- 6
           \       |  /
            2 ---- 4

     */
    void createGraph(ArrayList<Edge>[] graph) {
        for (int i = 0; i < graph.length; i++) {
            graph[i] = new ArrayList<>();
        }

//        graph[0].add(new Edge(0, 1, 1));
//        graph[0].add(new Edge(0, 2, 1));
//
//        graph[1].add(new Edge(1, 0, 1));
//        graph[1].add(new Edge(1, 3, 1));
//
//        graph[2].add(new Edge(2, 0, 1));
//        graph[2].add(new Edge(2, 4, 1));
//
//        graph[3].add(new Edge(3, 1, 1));
//        graph[3].add(new Edge(3, 4, 1));
//        graph[3].add(new Edge(3, 5, 1));
//
//        graph[4].add(new Edge(4, 2, 1));
//        graph[4].add(new Edge(4, 3, 1));
//        graph[4].add(new Edge(4, 5, 1));
//
//        graph[5].add(new Edge(5, 3, 1));
//        graph[5].add(new Edge(5, 4, 1));
//        graph[5].add(new Edge(5, 6, 1));
//
//        graph[6].add(new Edge(6, 5, 1));
        /*
            0 ----- 2
            /       /
           1       4
             \   /
               3
            FALSE
         */
//        graph[0].add(new Edge(0, 1, 0));
//        graph[0].add(new Edge(0, 2, 0));
//
//        graph[1].add(new Edge(1, 0, 0));
//        graph[1].add(new Edge(1, 3, 0));
//
//        graph[2].add(new Edge(2, 0, 0));
//        graph[2].add(new Edge(2, 4, 0));
//
//        graph[3].add(new Edge(3, 1, 0));
//        graph[3].add(new Edge(3, 4, 0));
//
//        graph[4].add(new Edge(4, 2, 0));
//        graph[4].add(new Edge(4, 3, 0));

        /*
            1 → 0 → 2
                 ↑   ↓
                 ←  3
         */
//        graph[0].add(new Edge(0, 2, 0));
//
//        graph[1].add(new Edge(1, 0, 0));
//
//        graph[2].add(new Edge(2, 3, 0));
//
//        graph[3].add(new Edge(3, 0, 0));

        /*
              0
             / \
            2   1
             \ /
              3
         */
//        graph[0].add(new Edge(0, 1, 0));
//        graph[0].add(new Edge(0, 2, 0));
//
//        graph[1].add(new Edge(1, 3, 0));
//
//        graph[2].add(new Edge(2, 3, 0));

        /*
             5 → 0 ← 4
             ↓        ↓
             2 → 3 → 1  
         */
//        graph[0].add(new Edge(0, 3, 0));
//        
//        graph[2].add(new Edge(2, 3, 0));
//        
//        graph[3].add(new Edge(3, 1, 0));
//        
//        graph[4].add(new Edge(4, 0, 0));
//        graph[4].add(new Edge(4, 1, 0));
//        
//        graph[5].add(new Edge(5, 0, 0));
//        graph[5].add(new Edge(5, 2, 0));

        /*
            Edges with weights:
            0 -> 1 (2), 0 -> 2 (4)
            1 -> 2 (1), 1 -> 3 (7)
            2 -> 4 (3)
            3 -> 5 (1)
            4 -> 3 (2), 4 -> 5 (5)
         */
//        graph[0].add(new Edge(0, 1, 2));
//        graph[0].add(new Edge(0, 2, 4));
//        
//        graph[1].add(new Edge(1, 2, 1));
//        graph[1].add(new Edge(1, 3, 7));
//        
//        graph[2].add(new Edge(2, 4, 3));
//        
//        graph[3].add(new Edge(3, 5, 1));
//        
//        graph[4].add(new Edge(4, 3, 2));
//        graph[4].add(new Edge(4, 5, 5));
        //------ new graph--------
//        graph[0].add(new Edge(0, 1, 2));
//        graph[0].add(new Edge(0, 2, 4));
//
//        graph[1].add(new Edge(1, 2, -4));
//
//        graph[2].add(new Edge(2, 3, 2));
//
//        graph[3].add(new Edge(3, 4, 4));
//
//        graph[4].add(new Edge(4, 1, -1));
        //------new graph-----
        graph[0].add(new Edge(0, 1, 10));
        graph[0].add(new Edge(0, 2, 15));
        graph[0].add(new Edge(0, 3, 30));

        graph[1].add(new Edge(1, 0, 10));
        graph[1].add(new Edge(1, 3, 40));

        graph[2].add(new Edge(2, 0, 15));
        graph[2].add(new Edge(2, 3, 50));

        graph[3].add(new Edge(3, 1, 40));
        graph[3].add(new Edge(3, 2, 50));

    }

    class Edge {

        int src;
        int dest;
        int wt;

        public Edge(int src, int dest, int wt) {
            this.src = src;
            this.dest = dest;
            this.wt = wt;
        }
    }

//    print neighbors
    void vertixNeigbors(ArrayList<Edge>[] graph, int vertix) {
        for (int i = 0; i < graph[vertix].size(); i++) {
            Edge e = graph[vertix].get(i);
            System.out.println(e.dest);
        }
    }

    //    Only connected graph
//    void bfs(ArrayList<Edge>[] graph) {     //TC O(V+E)
//        Queue<Integer> q = new LinkedList<>();
//        boolean visited[] = new boolean[graph.length];
//        q.add(0);   //source = 0
//
//        while (!q.isEmpty()) {
//            int curr = q.remove();
//
//            if (!visited[curr]) {
//                System.out.print(curr + " ");
//                visited[curr] = true;
//
//                for (int i = 0; i < graph[curr].size(); i++) {
//                    Edge e = graph[curr].get(i);
//                    q.add(e.dest);
//                }
//            }
//        }
//    }
//    Only connected graph
//    void dfs(ArrayList<Edge>[] graph, int curr, boolean visited[]) {    //TC O(V+E)
//        //visit 
//        System.out.print(curr + " ");
//        visited[curr] = true;
//
//        for (int i = 0; i < graph[curr].size(); i++) {  //check all neighbour
//            Edge e = graph[curr].get(i);
//            if (!visited[e.dest]) {
//                dfs(graph, e.dest, visited);
//            }
//        }
//    }

    /*
        Has Path?
        For given src & dest, tell if a path exists from src to dest 
     */
    boolean hasPath(ArrayList<Edge>[] graph, int src, int dest, boolean visited[]) {    //TC O(V+E)
        if (src == dest) {
            return true;
        }
        visited[src] = true;

        for (int i = 0; i < graph[src].size(); i++) {
            Edge e = graph[src].get(i);

            if (!visited[e.dest] && hasPath(graph, e.dest, dest, visited)) {
                return true;
            }
        }
        return false;
    }

//    -------- part 2 ---------
//    if graph is not connected
    void bfs(ArrayList<Edge>[] graph) {
        boolean visited[] = new boolean[graph.length];

        for (int i = 0; i < graph.length; i++) {
            if (!visited[i]) {
                bfsUtil(graph, visited);
            }

        }
    }

    void bfsUtil(ArrayList<Edge>[] graph, boolean visited[]) {     //TC O(V+E)
        Queue<Integer> q = new LinkedList<>();

        q.add(0);   //source = 0

        while (!q.isEmpty()) {
            int curr = q.remove();

            if (!visited[curr]) {   //visited curr
                System.out.print(curr + " ");
                visited[curr] = true;

                for (int i = 0; i < graph[curr].size(); i++) {
                    Edge e = graph[curr].get(i);
                    q.add(e.dest);
                }
            }
        }
    }

//     if graph is not connected
    void dfs(ArrayList<Edge>[] graph) {    //TC O(V+E)

        boolean visited[] = new boolean[graph.length];

        for (int i = 0; i < graph.length; i++) {
            dfsUtil(graph, i, visited);
        }
    }

    void dfsUtil(ArrayList<Edge>[] graph, int curr, boolean visited[]) {    //TC O(V+E)
        //visit 
        System.out.print(curr + " ");
        visited[curr] = true;

        for (int i = 0; i < graph[curr].size(); i++) {  //check all neighbour
            Edge e = graph[curr].get(i);
            if (!visited[e.dest]) {
                dfsUtil(graph, e.dest, visited);
            }
        }
    }

    boolean detectCycle(ArrayList<Edge>[] graph) {
        boolean visited[] = new boolean[graph.length];

        for (int i = 0; i < graph.length; i++) {
            if (!visited[i]) {
                if (detectCycleUtil(graph, visited, i, -1)) {
                    return true;
                }
            }
        }
        return false;
    }

    // if vertix already visited and its not parent than cycle exist
    boolean detectCycleUtil(ArrayList<Edge>[] graph, boolean visited[], int curr, int par) {
        visited[curr] = true;

        for (int i = 0; i < graph[curr].size(); i++) {
            Edge e = graph[curr].get(i);

            if (!visited[e.dest]) {   //case3
                if (detectCycleUtil(graph, visited, e.dest, curr)) {
                    return true;
                }
            } else if (visited[e.dest] && e.dest != par) {   //case 1
                return true;
            }
            //case 2 -> do nothing -> continue
        }

        return false;
    }

//    ** If graph doesn't have cycle -> BIPARTITE
    boolean isBipartie(ArrayList<Edge>[] graph) {   //TC O(V+E)
        int[] colour = new int[graph.length];   //0 yellow, 1 blue

        Arrays.fill(colour, -1);    //no colour

        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < graph.length; i++) {
            if (colour[i] == -1) {  //BFS
                q.add(i);
                colour[i] = 0;   //yellow

                while (!q.isEmpty()) {
                    int curr = q.remove();
                    for (int j = 0; j < graph[curr].size(); j++) {
                        Edge e = graph[curr].get(j);    //neighbours
                        if (colour[e.dest] == -1) {
                            int nextCol = colour[curr] == 0 ? 1 : 0;
                            colour[e.dest] = nextCol;
                            q.add(e.dest);
                        } else if (colour[e.dest] == colour[curr]) {
                            return false;   //not bipatie
                        }
                    }
                }
            }
        }
        return true;
    }

    // directed graph cycle detect
    boolean isCycle(ArrayList<Edge>[] graph) {      //TC O(V+E)
        boolean visited[] = new boolean[graph.length];
        boolean stack[] = new boolean[graph.length];

        for (int i = 0; i < graph.length; i++) {
            if (!visited[i]) {
                if (isCycleUtil(graph, i, visited, stack)) {
                    return true;
                }
            }
        }
        return false;
    }

    boolean isCycleUtil(ArrayList<Edge>[] graph, int curr, boolean visited[], boolean stack[]) {
        visited[curr] = true;
        stack[curr] = true;

        for (int i = 0; i < graph[curr].size(); i++) {
            Edge e = graph[curr].get(i);
            if (stack[e.dest]) { //cycle
                return true;
            }
            if (!visited[e.dest] && isCycleUtil(graph, e.dest, visited, stack)) {
                return true;
            }
        }
        stack[curr] = false;
        return false;
    }

    /*
        Topological Sorting
        Directed Acyclic Graph(DAG) is a directed graph with no cycles. 
        Topological sorting is used only for DAGs (not for non-DAGs)
        It is a linear order of vertices such that every directed edge u -> v, the vertex u comes before v in the order.
     */
//    DFS
    void topologicalSort(ArrayList<Edge>[] graph) {     //TC O(V+E)
        boolean visited[] = new boolean[graph.length];
        Stack<Integer> s = new Stack<>();

        for (int i = 0; i < graph.length; i++) {
            if (!visited[i]) {
                topologicalSortUtil(graph, i, visited, s);  //modified dfs
            }
        }

        while (!s.empty()) {
            System.out.print(s.pop() + " ");
        }
        System.out.println();

    }

    void topologicalSortUtil(ArrayList<Edge>[] graph, int curr, boolean visited[], Stack<Integer> s) {
        visited[curr] = true;

        for (int i = 0; i < graph[curr].size(); i++) {
            Edge e = graph[curr].get(i);
            if (!visited[e.dest]) {
                topologicalSortUtil(graph, e.dest, visited, s);
            }
        }

        s.push(curr);
    }

//    BFS
    void calcIndeg(ArrayList<Edge>[] graph, int[] indeg) {
        for (int i = 0; i < graph.length; i++) {
            int v = i;
            for (int j = 0; j < graph[v].size(); j++) {
                Edge e = graph[v].get(j);
                indeg[e.dest]++;
            }
        }
    }

    void bfsTopSort(ArrayList<Edge>[] graph) {
        int indeg[] = new int[graph.length];
        calcIndeg(graph, indeg);
        Queue<Integer> q = new LinkedList<>();

        for (int i = 0; i < indeg.length; i++) {
            if (indeg[i] == 0) {
                q.add(i);
            }
        }

        while (!q.isEmpty()) {
            int curr = q.remove();
            System.out.print(curr + " "); //topological sort print

            for (int i = 0; i < graph[curr].size(); i++) {
                Edge e = graph[curr].get(i);
                indeg[e.dest]--;
                if (indeg[e.dest] == 0) {
                    q.add(e.dest);
                }
            }
        }

        System.out.println();
    }

    void printAllPath(ArrayList<Edge>[] graph, int src, int dest, String path) {    //TC exponential O(V^V)
        if (src == dest) {
            System.out.println(src + " " + path);
            return;
        }

        for (int i = 0; i < graph[src].size(); i++) {
            Edge e = graph[src].get(i);
            printAllPath(graph, e.dest, dest, src + " " + path);
        }
    }

    //dijkastra
    class Pair implements Comparable<Pair> {

        int node;
        int path;

        public Pair(int node, int path) {
            this.node = node;
            this.path = path;
        }

        @Override
        public int compareTo(Pair o) {
            return this.path - o.path;      //path based sorting for my pairs
        }
    }

    // sortest path (weight)-> greedy algorithm
    // not work for negative weight
    void dijkastra(ArrayList<Edge>[] graph, int src) {  //TC O(V+Elog(V)) PQ sorting TC O(Elog(V))
        int[] dist = new int[graph.length];

        for (int i = 0; i < graph.length; i++) {
            if (i != src) {
                dist[i] = Integer.MAX_VALUE;
            }
        }
        boolean visited[] = new boolean[graph.length];
        PriorityQueue<Pair> pq = new PriorityQueue<>();

        pq.add(new Pair(src, 0));

        while (!pq.isEmpty()) {
            Pair curr = pq.remove();
            if (!visited[curr.node]) {
                visited[curr.node] = true;
                //neighbours
                for (int i = 0; i < graph[curr.node].size(); i++) {
                    Edge e = graph[curr.node].get(i);
                    int u = e.src;
                    int v = e.dest;
                    int wt = e.wt;

                    if (dist[u] + wt < dist[v]) {    //update distance of src to v
                        dist[v] = dist[u] + wt;
                        pq.add(new Pair(v, dist[v]));
                    }
                }
            }
        }

        //print all source to vertices shortest distance
        for (int i = 0; i < dist.length; i++) {
            System.out.print(dist[i] + " ");
        }
        System.out.println();
    }

    // sortest path (weight)-> DP algorithm
    // doesn't work for negative cycle -> in cycle every iteration reduce the distance.
    void bellmanFord(ArrayList<Edge>[] graph, int src) {    //TC O(VE)
        int dist[] = new int[graph.length];

        for (int i = 0; i < dist.length; i++) {
            if (i != src) {
                dist[i] = Integer.MAX_VALUE;
            }
        }

        for (int i = 0; i < graph.length - 1; i++) {    //V-1
            //edges -> O(E)
            for (int j = 0; j < graph.length; j++) {
                for (int k = 0; k < graph[j].size(); k++) {
                    Edge e = graph[j].get(k);
                    //u,v,wt
                    int u = e.src;
                    int v = e.dest;
                    int wt = e.wt;
                    //relaxation
                    if (dist[u] != Integer.MAX_VALUE && dist[u] + wt < dist[v]) {
                        dist[v] = dist[u] + wt;
                    }
                }

            }
        }
    }

    //Minimum spannung tree
    void primsMST(ArrayList<Edge>[] graph) {
        boolean visited[] = new boolean[graph.length];
        int totalWeight = 0; //result

        PriorityQueue<Pair> pq = new PriorityQueue<>();
        pq.add(new Pair(0, 0));

        while (!pq.isEmpty()) {
            Pair curr = pq.remove();
            if (!visited[curr.node]) {
                totalWeight += curr.path;
                visited[curr.node] = true;

                for (int i = 0; i < graph[curr.node].size(); i++) {
                    Edge e = graph[curr.node].get(i);

                    pq.add(new Pair(e.dest, e.wt));
                }
            }
        }
        System.out.println("Fiinal(min) cost of MST = " + totalWeight);
    }

    /*
        Cheapest Flights within K Stops
        There are n cities connected by some number of flights. You are given an array flights where flights[i] = [from, to, price] indicates that there is a flight.
        You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops.
        If there is no such route, return -1.
        all values are positive
        flights = [[0,1,100], [1,2,100], [0,2,500]]
        src = 0, dst = 2, k = 1
        ans = 200
     */
    class Info {

        int v;
        int cost;
        int stops;

        Info(int v, int cost, int stops) {
            this.v = v;
            this.cost = cost;
            this.stops = stops;
        }
    }

    int cheapestFlight(int n, int flights[][], int src, int dest, int k) {
        ArrayList<Edge> graph[] = new ArrayList[n];
        createGraph(graph, flights);

        int dist[] = new int[n];

        for (int i = 0; i < dist.length; i++) {
            if (i != src) {
                dist[i] = Integer.MAX_VALUE;
            }
        }

        Queue<Info> q = new LinkedList<>();
        q.add(new Info(src, 0, 0));

        while (!q.isEmpty()) {
            Info curr = q.remove();

            if (curr.stops > k) {
                break;
            }

            for (int i = 0; i < graph[curr.v].size(); i++) {
                Edge e = graph[curr.v].get(i);
                int u = e.src;
                int v = e.dest;
                int wt = e.wt;

//                if (dist[u] != Integer.MAX_VALUE && dist[u] + wt < dist[v] && curr.stops <= k) {
                if (curr.cost + wt < dist[v] && curr.stops <= k) {
                    dist[v] = curr.cost + wt;
                    q.add(new Info(v, dist[v], curr.stops + 1));
                }
            }
        }

        if (dist[dest] == Integer.MAX_VALUE) {
            return -1;
        } else {
            return dist[dest];
        }
    }

    void createGraph(ArrayList<Edge>[] graph, int[][] flights) {
        for (int i = 0; i < graph.length; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < flights.length; i++) {
            int src = flights[i][0];
            int dest = flights[i][1];
            int wt = flights[i][2];

            Edge e = new Edge(src, dest, wt);
            graph[src].add(e);
        }
    }

    /*
        Connecting Cities with Minimum Cost
        Find the minimum cost for connecting all cities on the map.
        cities[][] = {{0, 1, 2, 3, 4),
                    (1, 0, 5, 0, 7),
                    (2, 5, 0, 6, 0},
                    {3, 0, 6, 0, 0),
                    {4, 7, 0, 0, 0}}
        ans = 10
     */
    void connectingCities(int cities[][]) {
        ArrayList<Edge>[] graph = new ArrayList[cities.length];

        createCitiesGraph(cities, graph);

        primsMST(graph);
    }

    void createCitiesGraph(int[][] cities, ArrayList<Edge>[] graph) {

        for (int i = 0; i < graph.length; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int i = 0; i < cities.length; i++) {
            for (int j = 0; j < cities[i].length; j++) {
                if (cities[i][j] != 0) {
                    graph[i].add(new Edge(i, j, cities[i][j]));
                }
            }
        }
    }

    //Disjoint
    class Disjoint {

        int n = 7;
        int par[] = new int[n];
        int rank[] = new int[n];

        void init() {
            for (int i = 0; i < par.length; i++) {
                par[i] = i;
            }
        }

        void call() {
//            init();
//            System.out.println(find(3));
//            union(1, 3);
//            System.out.println(find(3));
//            union(2, 4);
//            union(3, 6);
//            union(1, 4);
//            System.out.println(find(3));
//            System.out.println(find(4));

            int V = 4;
            ArrayList<Edge> edges = new ArrayList<>();
            createGraph(edges);

            System.out.println(kruskal(edges, V));

        }

        int find(int x) {   //TC mathametically O(4K) -> O(1)
            if (x == par[x]) {
                return x;
            }
//            return find(par[x]);
            return par[x] = find(par[x]);     //path compression

        }

        void union(int a, int b) {  //TC mathametically O(4K) -> O(1)
            int parA = find(a);
            int parB = find(b);

            if (rank[parA] == rank[parB]) {
                par[parB] = par[parA];
                rank[parA] += 1;
            } else if (rank[parA] > rank[parB]) {
                par[parB] = par[parA];
            } else if (rank[parA] < rank[parB]) {
                par[parA] = par[parB];
            }
        }

        //kruskal's algorithm
        int kruskal(ArrayList<Edge> edges, int V) {     //TC O(V+Elog(E))
            init();
            Collections.sort(edges);    //O(Elog(E))

            int mstCost = 0;
            int count = 0;

            for (int i = 0; count < V - 1; i++) {   // TC O(V)
                Edge e = edges.get(i);

                if (find(e.src) != find(e.dest)) { //no cycle
                    union(e.src, e.dest);
                    mstCost += e.wt;
                    count++;
                }
            }
            return mstCost;
        }

        class Edge implements Comparable<Edge> {

            int src;
            int dest;
            int wt;

            public Edge(int src, int dest, int wt) {
                this.src = src;
                this.dest = dest;
                this.wt = wt;
            }

            @Override
            public int compareTo(Edge o) {
                return this.wt - o.wt;
            }

        }

        void createGraph(ArrayList<Edge> edge) {
            edge.add(new Edge(0, 1, 10));
            edge.add(new Edge(0, 2, 15));
            edge.add(new Edge(0, 3, 30));
            edge.add(new Edge(1, 3, 40));
            edge.add(new Edge(2, 3, 50));

        }
    }

    // leatcode 733
    int[][] floodFill(int[][] image, int sr, int sc, int color) {   //TC O(m*n)
        boolean vis[][] = new boolean[image.length][image[0].length];
        utilFloodFill(image, sr, sc, color, vis, image[sr][sc]);
        return image;
    }

    void utilFloodFill(int[][] image, int sr, int sc, int color, boolean[][] vis, int orgCol) {
        if (sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length || vis[sr][sc] || image[sr][sc] != orgCol) {
            return;
        }
        vis[sr][sc] = true;
        image[sr][sc] = color;

        //left 
        utilFloodFill(image, sr, sc - 1, color, vis, orgCol);
        //right
        utilFloodFill(image, sr, sc + 1, color, vis, orgCol);
        //up
        utilFloodFill(image, sr - 1, sc, color, vis, orgCol);
        //down
        utilFloodFill(image, sr + 1, sc, color, vis, orgCol);
    }
}
