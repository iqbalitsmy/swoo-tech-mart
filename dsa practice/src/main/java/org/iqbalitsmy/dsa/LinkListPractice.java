/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class LinkListPractice {

    void call() {
        LinkListPractice ll = new LinkListPractice();
//        ll.addFirst(5);
//        ll.addFirst(10);
//        ll.addLast(50);
//        ll.addLast(5);
//        ll.addLast(10);

//        ll.add(4, 20);
//        printNode();
//        ll.removeFirst();
//        ll.removeLast();
//        ll.reverse();
//        ll.deleteFromTail(3);
//        ll.printNode();
//        System.out.println(ll.size);
//        System.out.println(ll.recursiveKeySearch(ll.head, 10, 0));
//        System.out.println(ll.keySearch(50));
//        System.out.println(ll.checkPalidrome());
//        head = new Node(10);
//        head.next = new Node(1);
//        Node temp = new Node(15);
//        head.next.next = temp;
//        head.next.next.next = temp;
//        head.next.next = head.next;
//        System.out.println(isCycle());
//        removeCycle();
//        System.out.println(isCycle());
//        printNode();
        ll.addFirst(20);
        ll.addFirst(40);
        ll.addFirst(50);
        ll.addFirst(60);
        ll.addFirst(70);
        ll.addFirst(80);
        ll.addFirst(90);
//        ll.printNode();
//        ll.head = ll.mergeSort(ll.head);
//        ll.printNode();
//        ll.zigZag();
//        ll.printNode();
        DubleLL dubleLL = new DubleLL();
        dubleLL.call();
    }

    class Node {

        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    Node head;
    Node tail;
    int size;
//  TC O(1)

    void addFirst(int data) {
//            step1 = creat new node
        Node newNode = new Node(data);
        size++;
        if (head == null) {
            head = tail = newNode;
            return;
        }
//            step2- newNode next = head
        newNode.next = head;
//            step3- head = newNode
        head = newNode;
    }
//  TC O(1)

    void addLast(int data) {
//            step1 = creat new node
        Node newNode = new Node(data);
        size++;
        if (head == null) {
            head = tail = newNode;
            return;
        }
//            step2- newNode next = head
        tail.next = newNode;
//            step3- head = newNode
        tail = newNode;
    }
//  TC O(n)

    void printNode() {
        if (head == null) {
            System.out.println("Link List is empty");
            return;
        }
        Node temp = head;
        while (temp != null) {
            System.out.print(temp.data + " ");
            temp = temp.next;
        }
        System.out.println("");
    }

    void add(int indx, int data) {
        if (indx == 0) {
            addFirst(data);
            return;
        }
        Node temp = head;
        int i = 0;
        while (indx - 1 > i) {
            temp = temp.next;
            if (temp == null) {
                System.out.println("Index is not exist");
                return;
            }
            i++;
        }
        Node newNode = new Node(data);
        size++;
        newNode.next = temp.next;
        temp.next = newNode;
    }

    int removeFirst() {
        if (0 == size) {
            System.out.println("Link list is empty");
            return Integer.MIN_VALUE;
        } else if (1 == size) {
            int val = head.data;
            head = tail = null;
            size = 0;
            return val;
        }

        int value = head.data;
        head = head.next;
        size--;
        return value;
    }
//  TC O(n)

    int removeLast() {
        if (0 == size) {
            System.out.println("Link list is empty");
            return Integer.MIN_VALUE;
        } else if (1 == size) {
            int val = head.data;
            head = tail = null;
            size = 0;
            return val;
        }
        Node prev = head;
        for (int i = 0; i < size - 2; i++) {
            prev = prev.next;
        }
        int val = prev.next.data;   //tail data
        prev.next = null;
        tail = prev;
        size--;
        return val;
    }

//    Search (Iterative) 
//    Search for a key in a Linked List. 
//    Return the position where it is found.
//    Add in the Middle of LL video If not found, return -1.
//    TC O(n)
    int keySearch(int key) {
        Node temp = head;
        int idx = 0;
        while (temp != null) {
            if (temp.data == key) {
                return idx;
            }
            idx++;
            temp = temp.next;
        }
        return -1;
    }
//TC O(n) SC O(n)

    int recursiveKeySearch(Node temp, int key, int idx) {
        if (temp == null) {
            return -1;
        }
        if (temp.data == key) {
            return idx;
        }
        return recursiveKeySearch(temp.next, key, idx + 1);
    }

    void reverse() {
        Node prev = null, current = tail = head; //incase size is one
        Node next;
        while (null != current) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }

//    Find & Remove Nth node from End 
//    Iterative Approach
//    TC O(n)
    void deleteFromTail(int idx) {
//        Calculate size
        int sz = 0;
        Node temp = head;
        while (null != temp) {
            temp = temp.next;
            sz++;
        }
//           delete first node only
        if (idx == sz) {
            head = head.next;
            return;
        }

        Node prev = head;
        int i = 0;
        while (i < sz - idx) {
            prev = prev.next;
            i++;
        }
        prev.next = prev.next.next;
    }
//  Slow fast approach

    Node findMid(Node head) {
        Node slow = head;
        Node fast = head;

        while (null != fast && fast.next != null) {
            slow = slow.next;   //+1
            fast = fast.next.next; //+2
        }
        return slow;
    }

    boolean checkPalidrome() {
        if (null == head || null == head.next) {
            return true;
        }

//        find mid
        Node midNode = findMid(head);

//        reverse 2nd half
        Node prev = null, curr = midNode, next;
        while (curr != null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        Node right = prev; //right half head
        Node left = head; //left half head
//        check left half and right half
        while (null != right) {
            if (left.data != right.data) {
                return false;
            }
            right = right.next;
            left = left.next;
        }
        return true;
    }

//    check for cycle in Link List
//    Floyd's Cycle finding algorithm
    boolean isCycle() {
        Node slow = head;
        Node fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {     //they can meet any point
                return true;    //cycle is exist
            }
        }
        return false;   //cycle not exist
    }

//    in cycle last node never point to head node
    void removeCycle() {
        Node slow = head;
        Node fast = head;
//        detect cycle
        boolean cycle = false;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                cycle = true;
                break;
            }
        }
        if (false == cycle) {
            return;
        }
//        find meeting point
        slow = head;
        Node prev = null;
        while (fast != slow) {
            prev = fast;
            slow = slow.next;
            fast = fast.next;
        }
//      remove cycle
        prev.next = null;
    }

    Node mergeSort(Node head) {
        if (head == null || head.next == null) {
            return head;
        }
//        find mid
        Node mid = getMid(head);

//        left and right MS
        Node rightHead = mid.next;
        mid.next = null;
        Node newLeft = mergeSort(head);
        Node newRight = mergeSort(rightHead);

//        merge
        return merge(newLeft, newRight);
    }

    Node merge(Node head1, Node head2) {
        Node mergedLL = new Node(-1);
        Node temp = mergedLL;

        while (head1 != null && head2 != null) {
            if (head1.data <= head2.data) {
                temp.next = head1;
                head1 = head1.next;
                temp = temp.next;
            } else {
                temp.next = head2;
                head2 = head2.next;
                temp = temp.next;
            }
        }

//        rest of data
        while (head1 != null) {
            temp.next = head1;
            head1 = head1.next;
            temp = temp.next;
        }
        while (head2 != null) {
            temp.next = head2;
            head2 = head2.next;
            temp = temp.next;
        }

        return mergedLL.next;
    }
//  find the mid

    Node getMid(Node head) {
        Node slow = head;
        Node fast = head.next;  // for geting always left end node for even numbers of node

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    void zigZag() {
//        find midel
        Node mid = getMid(head);
//        reverse 2nd half
        Node curr = mid.next, prev = null, next;
        mid.next = null;

        while (null != curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
//        alt merge -> zig zag marge
        Node left = head, right = prev, nextL, nextR;
        while (left != null && right != null) {

            nextL = left.next;
            left.next = right;
            nextR = right.next;
            right.next = nextL;

//            update
            left = nextL;
            right = nextR;
        }
    }

//    Duble Link List
    class DubleLL {

        void call() {
            DubleLL dubleLL = new DubleLL();
            dubleLL.addFirst(45);
            dubleLL.addFirst(5);
            dubleLL.addFirst(4);
            dubleLL.printLL();
//            dubleLL.removeFirst();
            dubleLL.reverse();
            dubleLL.printLL();
        }

        Node head, tail;
        int size = 0;

        class Node {

            int data;
            Node next;
            Node prev;

            Node(int data) {
                this.data = data;
                this.next = this.prev = null;
            }
        }

        void addFirst(int data) {
            Node node = new Node(data);
            size++;

            if (head == null) {
                head = tail = node;
                return;
            }
            node.next = head;
            head.prev = node;
            head = node;
        }

        void printLL() {
            if (head == null) {
                System.out.println("Duble link list is empty");
                return;
            }
            Node temp = head;
            while (temp != null) {
                System.out.print(temp.data + " ");
                temp = temp.next;
            }
            System.out.println("");
        }

        void removeFirst() {
            Node temp = head;
            if (temp == null) {
                System.out.println("Duble link list is empty");
                return;
            } else if (temp.next == null) {
                head = tail = null;
                size--;
                return;
            }
            head = temp.next;
            head.prev = null;
            size--;
        }

        void reverse() {
            Node curr = head, prev = null, next;
            while (curr != null) {
                next = curr.next;
                curr.next = prev;
                curr.prev = next;

                prev = curr;
                curr = next;
            }
            head = prev;
        }
    }
}
