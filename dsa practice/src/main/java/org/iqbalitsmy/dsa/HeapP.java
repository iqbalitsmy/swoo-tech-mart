/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.ArrayList;

/**
 *
 * @author AORUS
 */
public class HeapP {
    
    void call() {
//        PriorityQueue<Student> pq = new PriorityQueue<>(Comparator.reverseOrder());
//        pq.add(new Student("C", 15));
//        pq.add(new Student("A", 0));
//        pq.add(new Student("B", 5));
//
//        while (!pq.isEmpty()) {
//            System.out.println("Name: " + pq.peek().name + " Rank: " + pq.remove().rank);
////            pq.remove();
//        }

        Heap h = new Heap();
        h.add(3);
        h.add(4);
        h.add(1);
        h.add(5);

//        while (!h.isEmpty()) {
//            System.out.print(h.peek() + " ");
//            h.remove();
//        }
        int arr[] = {1, 2, 4, 5, 3};
        heapSort(arr);
//        for (int i = 0; i < arr.length; i++) {
//            System.out.print(arr[i] + " ");
//        }
//        nearbyCar(new int[][]{{3, 3}, {5, -1}, {-2, 4}}, 2);
//        connectNRopes(new int[]{2, 3, 3, 4, 6});
        int[][] army = {{1, 0, 0, 0}, {1, 1, 1, 1}, {1, 0, 0, 0}, {1, 0, 0, 0}};
//        weakestSoldier(army, 2);
        slidingWindow(new int[]{1, 3, -1, -3, 5, 3, 6, 7}, 3);
    }
    
    class Student implements Comparable<Student> {  //which data field to compare

        String name;
        int rank;
        
        Student(String name, int rank) {
            this.name = name;
            this.rank = rank;
        }
        
        @Override
        public int compareTo(Student o) {
            return this.rank - o.rank;
        }
        
    }
    
    void heapify(int arr[], int i, int size) {  //TC O(log(n))
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int maxIdx = i;
        
        if (left < size && arr[maxIdx] < arr[left]) {
            maxIdx = left;
        }
        if (right < size && arr[maxIdx] < arr[right]) {
            maxIdx = right;
        }
        
        if (maxIdx != i) {
            //swap
            int temp = arr[i];
            arr[i] = arr[maxIdx];
            arr[maxIdx] = temp;
            
            heapify(arr, maxIdx, size);
        }
    }
    
    void heapSort(int arr[]) {  //TC O(nlog(n)) SC O(1)
        //build max heap
        //for max heap just heafipy the non leaf
        int n = arr.length;
        for (int i = n / 2; i >= 0; i--) {//TC O(n)
            heapify(arr, i, n);     //TC O(log(n))
        }

        //push largest at end and assume they don't exist
        for (int i = n - 1; i > 0; i--) {   //TC O(n)
            //swap (largest first with last)
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, 0, i); //TC O(log(n))
        }
    }
    
    class Heap {
        
        ArrayList<Integer> arr = new ArrayList<>();
        
        void add(int data) {    //TC O(log(n))
            //add at last idx
            arr.add(data);

            //correction of tree
            int x = arr.size() - 1;  //x is child idx
            int par = (x - 1) / 2;  //parent idx

            while (arr.get(x) < arr.get(par)) {   // TC O(log(n))
                //swap
                int temp = arr.get(x);
                arr.set(x, arr.get(par));
                arr.set(par, temp);
                x = par;
                par = (x - 1) / 2;
            }
        }
        
        void hepify(int i) {
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            int minIdx = i;
            
            if (left < arr.size() && arr.get(left) < arr.get(minIdx)) {
                minIdx = left;
            }
            if (right < arr.size() && arr.get(right) < arr.get(minIdx)) {
                minIdx = right;
            }
            
            if (minIdx != i) {
                //swap
                int temp = arr.get(i);
                arr.set(i, arr.get(minIdx));
                arr.set(minIdx, temp);
                hepify(minIdx);
            }
        }
        
        int remove() {
            int data = arr.get(0);

            //swap fast and last
            int temp = arr.get(0);
            arr.set(0, arr.get(arr.size() - 1));
            arr.set(arr.size() - 1, temp);

            //remove last element
            arr.remove(arr.size() - 1);

            //hepify    TC O(log(n))
            hepify(0);
            
            return data;
        }
        
        int peek() {
            return arr.get(0);
        }
        
        boolean isEmpty() {
            return arr.size() == 0;
        }
        
    }

    //Nearby car
    class Point implements Comparable<Point> {
        
        int x;
        int y;
        int distSqr;
        
        public Point(int x, int y, int distSqr) {
            this.x = x;
            this.y = y;
            this.distSqr = distSqr;
        }
        
        @Override
        public int compareTo(Point o) {
            return this.distSqr - o.distSqr;    //asencding order
        }
    }

    /*We are given N points in a 2D plane which are locations of N cars. 
    If we are at the origin, print the nearest K cars.
     */
    void nearbyCar(int[][] pts, int k) {
        PriorityQueue<Point> pq = new PriorityQueue<>();
        
        for (int i = 0; i < pts.length; i++) {
            int distSqr = pts[i][0] * pts[i][0] + pts[i][1] * pts[i][1];
            pq.add(new Point(pts[i][0], pts[i][1], distSqr));
        }

        //nearset K car
        for (int i = 0; i < k; i++) {
            System.out.println("C" + pq.remove().distSqr);
        }

        /*Connect N Ropes Given are N ropes of different lengths, 
        the task is to connect these ropes into one rope with minimum cost, 
        such that the cost to connect two ropes is equal to the sum of their lengths.
         */
    }

    /*Connect N Ropes Given are N ropes of different lengths, 
    the task is to connect these ropes into one rope with minimum cost, 
    such that the cost to connect two ropes is equal to the sum of their lengths.
     */
    void connectNRopes(int[] rope) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int i = 0; i < rope.length; i++) {
            pq.add(rope[i]);
        }
        int cost = 0;
        while (pq.size() > 1) {
            int min1 = pq.remove();
            int min2 = pq.remove();
            
            cost += min1 + min2;
            pq.add(min1 + min2);
        }
        
        System.out.println("cost of connecting n ropes: " + cost);
    }

    /*  Sliding Window Maximum
    We are given an mxn binary matrix of 1's (soldiers) and O's (civilians). 
    The soldiers are positioned in front of the civilians. 
    That is, all the 1's will appear to the left of all the O's in each row.
    
    A row i is weaker than a row j if one of the following is true:
    The number of soldiers in row i is less than the number of soldiers in row j.
    Both rows have the same number of soldiers and i < j.
    Find the K weakest rows.
     */
    void weakestSoldier(int[][] army, int k) {
        PriorityQueue<Row> pq = new PriorityQueue<>();
        
        for (int i = 0; i < army.length; i++) {
            int cout = 0;
            for (int j = 0; j < army[i].length; j++) {
                cout += army[i][j] == 1 ? 1 : 0;
            }
            pq.add(new Row(cout, i));
        }
        
        for (int i = 0; i < k; i++) {
            System.out.println("K:" + pq.remove().idx);
        }
    }
    
    class Row implements Comparable<Row> {
        
        int soldier;
        int idx;
        
        Row(int soldier, int idx) {
            this.soldier = soldier;
            this.idx = idx;
        }
        
        @Override
        public int compareTo(Row o) {
            if (this.soldier == o.soldier) {
                return this.idx - o.idx;
            } else {
                return this.soldier - o.soldier;
            }
        }
        
    }
    
    void slidingWindow(int arr[], int k) {  //TC O(nlog(k))
        int res[] = new int[arr.length - k + 1];
        PriorityQueue<Pair> pq = new PriorityQueue<>();

        //1st window
        for (int i = 0; i < k; i++) {
            pq.add(new Pair(arr[i], i));
        }
        
        res[0] = pq.peek().val;
        
        for (int i = k; i < arr.length; i++) {
            while (pq.size() > 0 && pq.peek().idx <= (i - k)) { //remove non-window element from top of Priority Queue
                pq.remove();
            }
            pq.add(new Pair(arr[i], i));
            res[i - k + 1] = pq.peek().val;
        }

        //print result
        for (int i = 0; i < res.length; i++) {
            System.out.print(res[i]+" ");
        }
        System.out.println("");
    }
    
    class Pair implements Comparable<Pair> {
        
        int val;
        int idx;
        
        Pair(int val, int idx) {
            this.val = val;
            this.idx = idx;
        }
        
        @Override
        public int compareTo(Pair o) {
            //desending order
            return o.val - this.val;
        }
        
    }
}
