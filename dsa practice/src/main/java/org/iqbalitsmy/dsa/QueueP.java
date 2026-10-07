/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.*;

/**
 *
 * @author AORUS
 */
public class QueueP {

    void call() {
//        QueueCircular queueCircular = new QueueCircular(5);
//        queueCircular.add(20);
//        queueCircular.add(30);
//
//        while (!queueCircular.isEmpty()) {
//            System.out.println(queueCircular.peek());
//            queueCircular.remove();
//        }

//        QueueLL queueLL = new QueueLL();
//        queueLL.add(20);
//        queueLL.add(30);
//
//        while (!queueLL.isEmpty()) {
//            System.out.println(queueLL.peek());
//            queueLL.remove();
//        }
//        Queue<Integer> q = new LinkedList<>();
//        Queue<Integer> q = new ArrayDeque<>();
//        q.add(20);
//        q.add(30);
//        q.add(60);
//        q.add(70);
//
//        while (!q.isEmpty()) {
//            System.out.println(q.peek());
//            q.remove();
//        }
//        QueueS qs = new QueueS();
//        qs.add(20);
//        qs.add(30);
//        qs.add(60);
//        qs.add(70);
//
//        while (!qs.isEmpty()) {
//            System.out.println(qs.peek());
//            qs.remove();
//        }
//        Stack2 s = new Stack2();
//        s.push(20);
//        s.push(30);
//        s.push(60);
//        s.push(70);
//
//        printNonRepeating("aabccxb");
        Queue<Integer> q = new LinkedList<>();
        q.add(1);
        q.add(2);
        q.add(3);
        q.add(4);
        q.add(5);
        q.add(6);
        q.add(7);
        q.add(8);
        q.add(9);
        q.add(10);

//        interleave(q);
        reverseQueue(q);

        while (!q.isEmpty()) {
            System.out.println(q.remove());
        }

    }
//    First non-repeating Letter in a stream of characters. (characters are small character)
//    TC O(n)

    void printNonRepeating(String str) {
        int freq[] = new int[26];
        Queue<Character> q = new LinkedList<>();

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            q.add(ch);
            freq[ch - 'a']++;

            while (!q.isEmpty() && freq[q.peek() - 'a'] > 1) {
                q.remove();
            }
            if (q.isEmpty()) {
                System.out.print(-1 + " ");
            } else {
                System.out.print(q.peek() + " ");
            }
        }

    }

    /* Interleave 2 Halves of a Queue (*even length) 
    input:  1234567 8 9 10 
    output: 1627384 9 5 10 */
//    TC O(n) SC O(n)
    void interleave(Queue<Integer> q) {
        Queue<Integer> firstQueue = new LinkedList<>();
        int mid = q.size() / 2;

        for (int i = 0; i < mid; i++) {
            firstQueue.add(q.remove());
        }

        while (!firstQueue.isEmpty()) {
            q.add(firstQueue.remove());
            q.add(q.remove());
        }

    }
//  TC O(n) SC O(n)

    void reverseQueue(Queue<Integer> q) {
        Stack<Integer> s = new Stack<>();

        while (!q.isEmpty()) {
            s.push(q.remove());
        }

        while (!s.isEmpty()) {
            q.add(s.pop());
        }
    }

    class QueueCircular {

        int arr[];
        int size;
        int rear;
        int front;

        QueueCircular(int n) {
            arr = new int[n];
            size = n;
            rear = -1;
            front = -1;
        }

//        is empty queue
        boolean isEmpty() {
            return rear == -1 && front == -1;
        }

        boolean isFull() {
            return (rear + 1) == size;
        }
//        add in queue
//        O(1)

        void add(int data) {
            if (isFull()) {
                System.out.println("Queue is full!!");
                return;
            }
//            add first element
            if (front == -1) {
                front = 0;
            }
            rear = (rear + 1) % size;
            arr[rear] = data;
        }
//        remove
//        O(1)

        int remove() {
            if (isEmpty()) {
                System.out.println("Queue is empty!!");
                return -1;
            }
            int val = arr[front];
//            last element
            if (rear == front) {
                rear = front = -1;
            } else {
                front = (front + 1) % size;
            }

            return val;
        }
//      O(1)

        int peek() {
            if (isEmpty()) {
                System.out.println("Queue is empty!!");
                return -1;
            }
            return arr[front];
        }

    }

    class Node {

        int data;
        Node next;

        Node(int data) {
            this.data = data;
            next = null;
        }
    }

    class QueueLL {

        Node head = null;
        Node tail = null;

        boolean isEmpty() {
            return head == null && tail == null;
        }

        void add(int n) {
            Node newNode = new Node(n);
            if (null == head) {
                head = tail = newNode;
                return;
            }
            tail.next = newNode;
            tail = newNode;
        }

        int remove() {
            if (isEmpty()) {
                System.out.println("Queue is empty!!");
                return -1;
            }
            int front = head.data;
//            single element
            if (tail == head) {
                tail = head = null;
            } else {
                head = head.next;
            }
            return front;
        }

        int peek() {
            if (isEmpty()) {
                System.out.println("Queue is empty!!");
                return -1;
            }
            return head.data;
        }
    }

//    Queue is implement using 2 stack
    class QueueS {

        Stack<Integer> s1 = new Stack<>();
        Stack<Integer> s2 = new Stack<>();

        boolean isEmpty() {
            return s1.isEmpty();
        }

        // add O(n)
        void add(int data) {
            while (!s1.isEmpty()) {
                s2.push(s1.pop());
            }
            s2.push(data);
            while (!s2.isEmpty()) {
                s1.push(s2.pop());
            }
        }

        // remove O(1)
        int remove() {
            if (isEmpty()) {
                System.out.println("Queue is empty");
                return -1;
            }
            return s1.pop();
        }

        //peek O(1)
        int peek() {
            if (isEmpty()) {
                System.out.println("Queue is empty");
                return -1;
            }
            return s1.peek();
        }
    }
//    stack using 2 queue

    class Stack2 {

        Queue<Integer> q1 = new LinkedList<>();
        Queue<Integer> q2 = new LinkedList<>();

        boolean isEmpty() {
            return q1.isEmpty() && q2.isEmpty();
        }

        void push(int data) {
            if (!q1.isEmpty()) {
                q1.add(data);
            } else {
                q2.add(data);
            }
        }
//        O(n)

        int pop() {
            if (isEmpty()) {
                System.out.println("Stack is empty!!");
                return -1;
            }
            int top = -1;

            if (!q1.isEmpty()) {
                while (!q1.isEmpty()) {
                    top = q1.remove();
                    if (q1.isEmpty()) {
                        break;
                    }
                    q2.add(top);
                }
            } else {
                while (!q2.isEmpty()) {
                    top = q2.remove();
                    if (q2.isEmpty()) {
                        break;
                    }
                    q1.add(top);
                }
            }
            return top;
        }
//        O(n)

        int peek() {
            if (isEmpty()) {
                System.out.println("Stack is empty!!");
                return -1;
            }
            int top = -1;

            if (!q1.isEmpty()) {
                while (!q1.isEmpty()) {
                    top = q1.remove();
                    q2.add(top);
                }
            } else {
                while (!q2.isEmpty()) {
                    top = q2.remove();
                    q1.add(top);
                }
            }
            return top;
        }
    }
}
