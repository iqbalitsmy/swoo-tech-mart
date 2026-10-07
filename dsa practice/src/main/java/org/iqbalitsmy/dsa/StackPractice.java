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
public class StackPractice {

    void call() {
        StackP stack = new StackP();
        stack.push(50);
        stack.push(62);
        stack.push(100);
//        System.out.println(stack.list);
//        stack.printStack();
        StackLL stackLL = new StackLL();
        stackLL.push(50);
        stackLL.push(55);
        stackLL.push(5);
//        stackLL.printStackLL();

//        Stack<Integer> s = new Stack<>();
//        s.push(20);
//        s.push(2);
//        s.push(70);
//        s.push(80);
//        System.out.println(s);
//        pushAtBottom(s, 5);
//        System.out.println(s);
//        System.out.println(reverseString("abc"));
//        reverseStack(s);
//        System.out.println(s);
        int stock[] = {100, 80, 60, 70, 60, 85, 100};
        int span[] = new int[stock.length];
//        stockSpan(stock, span);
        int arr[] = {6, 8, 0, 1, 3};
//        int grater[] = nextGratter(arr);

        String str = "({})[]]]";
//        System.out.println(validParanthesis(str));
//        System.out.println(isParanthesisDuplicate("((a)+(b))"));

//        System.out.println(maxArea(new int[]{2, 1, 5, 6, 2, 3}));

//        for (int i = 0; i < grater.length; i++) {
//            System.out.println(grater[i] + " ");
//
//        }

    }
//  push in bottom of the stack

    void pushAtBottom(Stack<Integer> s, int data) {
        if (s.isEmpty()) {
            s.push(data);
            return;
        }
        int top = s.pop();
        pushAtBottom(s, data);
        s.push(top);
    }

//    reverse stack
    void reverseStack(Stack<Integer> s) {
        if (s.isEmpty()) {
            return;
        }
        int top = s.pop();
        reverseStack(s);
        pushAtBottom(s, top);
    }
//  reverse a string using stack

    String reverseString(String str) {
        Stack<Character> s = new Stack<>();
        int indx = 0;
        while (indx < str.length()) {
            s.push(str.charAt(indx));
            indx++;
        }

        StringBuilder stringBuilder = new StringBuilder("");
        while (!s.isEmpty()) {
            stringBuilder.append(s.pop());
        }
        return stringBuilder.toString();
    }

//    Stock span problem
    void stockSpan(int stock[], int span[]) {
//        s store index of stock
        Stack<Integer> s = new Stack<>();
        span[0] = 1;
        s.push(0);
        for (int i = 1; i < stock.length; i++) {
            int currPrice = stock[i];
            while (!s.isEmpty() && currPrice > stock[s.peek()]) {
                s.pop();
            }
            if (s.isEmpty()) {
                span[i] = i + 1;
            } else {
                int prevHigh = s.peek();
                span[i] = i - prevHigh;
            }
            s.push(i);
        }
    }

//    find next grater from right side
//    TC O(n). beacuse in stack only one value store one time in stack. So, O(n+n)
//    we can use this logic, next grater from left side, next smaller right or left side
    int[] nextGratter(int arr[]) {
        Stack<Integer> s = new Stack<>();
        int grater[] = new int[arr.length];
        for (int i = arr.length - 1; i >= 0; i--) {
            while (!s.isEmpty() && arr[i] >= arr[s.peek()]) {
                s.pop();
            }
            if (s.isEmpty()) {
                grater[i] = -1;
            } else {
                grater[i] = arr[s.peek()];
            }
            s.push(i);
        }
        return grater;
    }

    boolean validParanthesis(String str) {
        Stack<Character> s = new Stack<>();

        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if ('(' == ch || '[' == ch || '{' == ch) { //opening
                s.push(ch);
            } else {  //closing
                if (s.isEmpty()) {
                    return false;
                }
                if (('(' == s.peek() && ')' == ch)
                        || ('[' == s.peek() && ']' == ch)
                        || ('{' == s.peek() && '}' == ch)) {
                    s.pop();
                } else {
                    return false;
                }
            }
        }
        if (!s.isEmpty()) {
            return false;
        }
        return true;
    }

    /*Duplicate Parentheses Given a balanced expression, find if it contains duplicate parentheses or not. 
    A set of parentheses are duplicate if the same subexpression is surrounded by multiple parentheses. 
    Return a true if it contains duplicates else return false. */
//    input always valid
//    TC O(n)
    boolean isParanthesisDuplicate(String str) {
        Stack<Character> s = new Stack<>();
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
//            closing
            if (')' == ch) {
                int count = 0;
                while (!s.isEmpty() && '(' != s.pop()) {
                    count++;
                }
                if (count < 1) {
                    return false;
                }
            } else {   //opening
                s.push(ch);
            }
        }
        return true;
    }

    int maxArea(int arr[]) {
        int maxArea = Integer.MIN_VALUE;
        int nsr[] = new int[arr.length];
        int nsl[] = new int[arr.length];

//        Next smaller right -> O(n)
        Stack<Integer> s = new Stack<>();

        for (int i = arr.length - 1; i >= 0; i--) {
            while (!s.isEmpty() && arr[i] <= arr[s.peek()]) {
                s.pop();
            }
            if (s.isEmpty()) {
                nsr[i] = arr.length;
            } else {
                nsr[i] = s.peek();
            }
            s.push(i);
        }
        //        Next smaller left -> O(n)
        s = new Stack<>();
        for (int i = 0; i < arr.length; i++) {
            while (!s.isEmpty() && arr[i] <= arr[s.peek()]) {
                s.pop();
            }
            if (s.isEmpty()) {
                nsl[i] = -1;
            } else {
                nsl[i] = s.peek();
            }
            s.push(i);
        }

//        current area
        for (int i = 0; i < arr.length; i++) {
            int height = arr[i];
            int width = nsr[i] - nsl[i] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        return maxArea;

    }

    class StackP {

        private ArrayList<Integer> list = new ArrayList<>();

        boolean isEmpty() {
            return list.size() == 0;
        }

//        push
        void push(int data) {
            list.add(data);
        }

        int pop() {
            if (isEmpty()) {
                return -1;
            }
            int top = list.get(list.size() - 1);
            list.remove(list.size() - 1);
            return top;
        }

        int peek() {
            if (isEmpty()) {
                return -1;
            }
            return list.get(list.size() - 1);
        }

        void printStack() {
            while (!isEmpty()) {
                System.out.println(peek() + " ");
                pop();
            }
        }
    }
//  using Link List

    class Node {

        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    class StackLL {

        Node head = null;

        boolean isEmpty() {
            return head == null;
        }

        void push(int data) {
            Node newNode = new Node(data);
            if (isEmpty()) {
                head = newNode;
                return;
            }
            newNode.next = head;
            head = newNode;
        }

        int pop() {
            if (isEmpty()) {
                return -1;
            }
            int top = head.data;
            head = head.next;
            return top;
        }

        int peek() {
            if (isEmpty()) {
                return -1;
            }
            int top = head.data;
            return top;
        }

        void printStackLL() {
            if (isEmpty()) {
                System.out.println("Stack is empty");
            }
            while (!isEmpty()) {
                System.out.print(pop() + " ");
            }
        }
    }
}
