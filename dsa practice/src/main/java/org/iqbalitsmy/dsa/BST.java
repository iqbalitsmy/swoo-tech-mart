/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.ArrayList;

/**
 *
 * @author AORUS
 */
public class BST {

    void call() {
//        int values[] = {5, 1, 3, 4, 2, 7};
        int values[] = {8, 5, 3, 6, 10, 11, 14};
//        int values[] = {1,1,1};

//        Node root = null;
//
//        for (int i = 0; i < values.length; i++) {
//            root = insert(root, values[i]);
//        }
//        inorder(root);
//        System.out.println(search(root, 7));
//        root = delete(root, 5);
//        System.out.println("");
//        inorder(root);
//        printInRange(root, 5, 12);
//        printRoot2Leaf(root, new ArrayList<Integer>());
//        System.out.println(isValid(root, null, null));
//        mirror(root);
//        preorder(root);
//        System.out.println("");
//        int arr[] = {3, 5, 6, 8, 10, 11, 12};
//        root = createBalacedBST(arr, 0, arr.length - 1);
//        preorder(root);
//        //imbalance BST
//        Node root = new Node(8);
//        root.left = new Node(6);
//        root.left.left = new Node(5);
//        root.left.left.left = new Node(3);
//        root.right = new Node(10);
//        root.right.right = new Node(11);
//        root.right.right.right = new Node(12);
//
//        inorder(root);
//        System.out.println("");
//        root = balanceBST(root);
//        inorder(root);
        // for largest BST in BT
        Node root = new Node(50);
        root.left = new Node(30);
        root.left.left = new Node(5);
        root.left.right = new Node(20);

        root.right = new Node(60);
        root.right.left = new Node(45);
        root.right.right = new Node(70);
        root.right.right.left = new Node(65);
        root.right.right.right = new Node(80);

        largestBST(root);
//        System.out.println(maxBst);

        Node root1 = new Node(2);
        root1.left = new Node(1);
        root1.right = new Node(4);

        Node root2 = new Node(9);
        root2.left = new Node(3);
        root2.right = new Node(12);

        inorder(mergeBST(root1, root2));

    }

    class Node {

        int data;
        Node left;
        Node right;

        Node(int data) {
            this.data = data;
        }
    }

    Node insert(Node root, int val) {
        if (root == null) {
            return new Node(val);
        }

        if (root.data > val) {
            //left subtree
            root.left = insert(root.left, val);
        } else {
            //right subtree
            root.right = insert(root.right, val);
        }
        return root;
    }

    //left->root->right
    void inorder(Node root) {
        if (root == null) {
            return;
        }
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    //root->left->right
    void preorder(Node root) {
        if (root == null) {
            return;
        }
        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    boolean search(Node root, int key) {    //TC O(h)
        if (root == null) {
            return false;
        }

        if (root.data == key) {
            return true;
        }

        if (root.data > key) {
            return search(root.left, key);
        } else {
            return search(root.right, key);
        }
    }

    Node delete(Node root, int val) {
        //find the val
        if (root.data > val) {
            root.left = delete(root.left, val);
        } else if (root.data < val) {
            root.right = delete(root.right, val);
        } else { //voila
            //case1 -> leaf node
            if (root.left == null && root.right == null) {
                return null;
            }
            //case2 -> have a single child
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            //case3 -> have both child
            //find In Order Successor -> replace the delete node -> delete the IS node
            Node IS = findInOrderSuccessor(root.right);

            root.data = IS.data;
            root.right = delete(IS, IS.data);
        }
        return root;
    }

    // find left most node
    Node findInOrderSuccessor(Node root) {
        while (root.left != null) {
            root = root.left;
        }
        return root;
    }

    // print in k1 and k2 range
    void printInRange(Node root, int k1, int k2) {
        if (root == null) {
            return;
        }
        if (k1 < root.data && k2 > root.data) {
            printInRange(root.left, k1, k2);
            System.out.print(root.data + " ");
            printInRange(root.right, k1, k2);
        } else if (root.data < k1) {
            printInRange(root.left, k1, k2);
        } else {
            printInRange(root.right, k1, k2);
        }
    }

    // print root to left
    void printRoot2Leaf(Node root, ArrayList<Integer> path) {
        if (root == null) {
            return;
        }
        path.add(root.data);
        //print path if found leaf nood
        if (root.left == null && root.right == null) {
            System.out.println(path);
        }

        printRoot2Leaf(root.left, path);
        printRoot2Leaf(root.right, path);
        path.remove(path.size() - 1);
    }

    // is valid BST
    // max value from left subtree < root < minmum value from right subtree
    boolean isValid(Node root, Node min, Node max) {
        if (root == null) {
            return true;
        }
        if (min != null && min.data >= root.data) {
            return false;
        } else if (max != null && max.data <= root.data) {
            return false;
        }
        return isValid(root.left, min, root) && isValid(root.right, root, max);
    }

    // mirror of BST  ->TC O(n)
    Node mirror(Node root) {
        if (root == null) {
            return null;
        }
        Node leftSub = mirror(root.left);
        Node rightSub = mirror(root.right);

        root.left = rightSub;
        root.right = leftSub;

        return root;
    }

    //sorted array to balanced BST
    //make it minimum height for balance
    // balance BST is left side and right side have mostly same number of node 
    Node createBalacedBST(int arr[], int start, int end) {
        if (start > end) {
            return null;
        }

        int mid = (start + end) / 2;
        Node root = new Node(arr[mid]);

        root.left = createBalacedBST(arr, start, mid - 1);
        root.right = createBalacedBST(arr, mid + 1, end);
        return root;
    }

    //convert BST to balanced BST
    Node balanceBST(Node root) {    //TC O(n)
        //inorder sequece
        ArrayList<Integer> inorder = new ArrayList<>();
        getInorder(root, inorder);

        //sorte inorder -> balanced BST
        root = createBST(inorder, 0, inorder.size() - 1);
        return root;
    }

    //genarate of inorder sequence
    void getInorder(Node root, ArrayList<Integer> inorder) {    //TC O(n)
        if (root == null) {
            return;
        }

        getInorder(root.left, inorder);
        inorder.add(root.data);
        getInorder(root.right, inorder);
    }

    Node createBST(ArrayList<Integer> inorder, int st, int end) {   //TC O(n)
        if (end < st) {
            return null;
        }
        int mid = (st + end) / 2;
        Node root = new Node(inorder.get(mid));
        root.left = createBST(inorder, st, mid - 1);
        root.right = createBST(inorder, mid + 1, end);

        return root;
    }

    //size of largest BST in BT
    class SizeInfo {

        boolean isBST;
        int size;
        int min;
        int max;

        SizeInfo(boolean isBST, int size, int min, int max) {
            this.isBST = isBST;
            this.size = size;
            this.min = min;
            this.max = max;
        }
    }
    static int maxBst = 0;

    //size of largest BST in BT
    SizeInfo largestBST(Node root) {
        if (root == null) {
            return new SizeInfo(true, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);
        }

        SizeInfo leftInfo = largestBST(root.left);
        SizeInfo rightInfo = largestBST(root.right);

        int size = leftInfo.size + rightInfo.size + 1;
        int min = Math.min(root.data, Math.min(leftInfo.min, rightInfo.min));
        int max = Math.max(root.data, Math.max(leftInfo.max, rightInfo.max));
        //is valid BST
        if (root.data <= leftInfo.max || root.data >= rightInfo.min) {
            return new SizeInfo(false, size, min, max);
        }
        if (leftInfo.isBST && rightInfo.isBST) {
            maxBst = Math.max(maxBst, size);
            return new SizeInfo(true, size, min, max);
        }

        return new SizeInfo(false, size, min, max);
    }
    // merge two BST
    // TC O(n+m) -> liniar
    Node mergeBST(Node root1, Node root2) {
        ArrayList<Integer> arr1 = new ArrayList<>();
        ArrayList<Integer> arr2 = new ArrayList<>();
        getInorder(root1, arr1);
        getInorder(root2, arr2);

        //merge 
        int i = 0, j = 0;
        ArrayList<Integer> finalArr = new ArrayList<>();
        while (i < arr1.size() && j < arr2.size()) {
            if (arr1.get(i) <= arr2.get(j)) {
                finalArr.add(arr1.get(i));
                i++;
            } else {
                finalArr.add(arr2.get(j));
                j++;
            }
        }
        while (i < arr1.size()) {
            finalArr.add(arr1.get(i));
            i++;
        }
        while (j < arr2.size()) {
            finalArr.add(arr2.get(j));
            j++;
        }
        return createBST(finalArr, 0, finalArr.size() - 1);
    }

}
