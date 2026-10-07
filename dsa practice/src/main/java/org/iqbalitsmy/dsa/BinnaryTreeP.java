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
public class BinnaryTreeP {

    void call() {
        int nodes[] = {1, 2, 4, -1, -1, 5, -1, -1, 3, -1, 6, -1, -1};
        BinaryTree binaryTree = new BinaryTree();
        Node root = binaryTree.buildTree(nodes);
        Node subRoot = new Node(2);
        subRoot.left = new Node(4);
        subRoot.right = new Node(5);
//        System.out.println(root.data);
//        binaryTree.preOrder(root);
//        System.out.println();
//        binaryTree.inOrder(root);
//        System.out.println();
//        binaryTree.postOrder(root);
        binaryTree.levelOrder(root);
//        System.out.println(binaryTree.heightOfTree(root));
//        System.out.println(binaryTree.countOfNoods(root));
//        System.out.println(binaryTree.sumOfNoods(root));
//        System.out.println(binaryTree.diameter(root).diam);
//        System.out.println(binaryTree.isSubTree(root, subRoot));
//        binaryTree.topView(root);
//        binaryTree.kLevel(root, 0, 2);
//        System.out.println(lca(root, 4, 5).data);
//        System.out.println(lca2(root, 4, 5).data);
//        System.out.println(minDist(root, 4, 6));
//        kAncestor(root, 4, 1);
        transform(root);
        binaryTree.levelOrder(root);
//        binaryTree.preOrder(root);

    }

    class Node {

        int data;
        Node left;
        Node right;

        Node(int data) {
            this.data = data;
            left = null;
            right = null;
        }
    }

    class BinaryTree {

        static int idx = -1;
//        always return the root
//        Preorder

        Node buildTree(int nodes[]) {
            idx++;
            if (nodes[idx] == -1) {
                return null;
            }

            Node newNode = new Node(nodes[idx]);
            newNode.left = buildTree(nodes);
            newNode.right = buildTree(nodes);

            return newNode;
        }
        //     root>>left>>right
        //     TC O(n) SC O(n)

        void preOrder(Node root) {
            if (root == null) {
                return;
            }
            System.out.print(root.data + " ");

            preOrder(root.left);
            preOrder(root.right);
        }
//      left>>root>>right

        void inOrder(Node root) {
            if (root == null) {
                return;
            }
            inOrder(root.left);
            System.out.print(root.data + " ");
            inOrder(root.right);
        }

        //      left>>right>>root
        void postOrder(Node root) {
            if (root == null) {
                return;
            }
            postOrder(root.left);
            postOrder(root.right);
            System.out.print(root.data + " ");
        }

//        level order traversal
        void levelOrder(Node root) {
            if (root == null) {
                return;
            }
            Queue<Node> q = new LinkedList<>();
            q.add(root);
            q.add(null);
            while (!q.isEmpty()) {
                Node cur = q.remove();
                if (cur == null) {
                    System.out.println();
                    if (q.isEmpty()) {
                        break;
                    } else {
                        q.add(null);
                    }
                } else {
                    System.out.print(cur.data + " ");
                    if (cur.left != null) {
                        q.add(cur.left);
                    }
                    if (cur.right != null) {
                        q.add(cur.right);
                    }
                }
            }
        }

        int heightOfTree(Node root) {
            if (root == null) {
                return 0;
            }

            return Math.max(heightOfTree(root.left), heightOfTree(root.right)) + 1;
        }

        // total nodes = left side of root + right side of root + 1;
        // TC O(n)
        int countOfNoods(Node root) {
            if (root == null) {
                return 0;
            }

            return countOfNoods(root.left) + countOfNoods(root.right) + 1;
        }

        int sumOfNoods(Node root) {
            if (root == null) {
                return 0;
            }

            return sumOfNoods(root.left) + sumOfNoods(root.right) + root.data;
        }

        // Diameter of tree -> number of node in the longest path between 2 leaves
        // TC O(n^2)
        int diameter2(Node root) {
            if (root == null) {
                return 0;
            }

            int ld = diameter2(root.left);
            int lh = heightOfTree(root.left);
            int rd = diameter2(root.right);
            int rh = heightOfTree(root.right);
            int selfDiameter = lh + rh + 1;
            return Math.max(ld, Math.max(rd, selfDiameter));

        }

        class DiameterInfo {

            int diam;
            int ht;

            DiameterInfo(int diam, int ht) {
                this.diam = diam;
                this.ht = ht;
            }

        }
//        diameter using Object
//        TC O(n)

        DiameterInfo diameter(Node root) {
            if (root == null) {
                return new DiameterInfo(0, 0);
            }

            DiameterInfo leftInfo = diameter(root.left);
            DiameterInfo rightInfo = diameter(root.right);

            int diam = Math.max(leftInfo.diam, Math.max(rightInfo.diam, leftInfo.ht + rightInfo.ht + 1));
            int ht = Math.max(leftInfo.ht, rightInfo.ht) + 1;

            return new DiameterInfo(diam, ht);
        }

        boolean isIdentical(Node node, Node subRoot) {
            if (null == node && null == subRoot) {  //both null
                return true;
            } else if (null == node || null == subRoot || node.data != subRoot.data) {  //one of them are null
                return false;
            }
            if (!isIdentical(node.left, subRoot.left)) {
                return false;
            }
            if (!isIdentical(node.right, subRoot.right)) {
                return false;
            }
            return true;
        }
//  is sub-tree

        boolean isSubTree(Node root, Node subRoot) {
            if (root == null) {
                return false;
            }
            if (root.data == subRoot.data) {
                if (isIdentical(root, subRoot)) {
                    return true;
                }
            }

            return isSubTree(root.left, subRoot) || isSubTree(root.right, subRoot);
        }

        class TopViewInfo {

            Node node;
            int hd;

            TopViewInfo(Node node, int hd) {
                this.node = node;
                this.hd = hd;
            }
        }

        // Top view of the tree
        void topView(Node root) {
            Queue<TopViewInfo> q = new LinkedList<>();  //level order traverse
            HashMap<Integer, Node> map = new HashMap<>();

            int min = 0, max = 0;
            q.add(new TopViewInfo(root, 0));
            q.add(null);    //level finish

            while (!q.isEmpty()) {
                TopViewInfo cur = q.remove();
                if (cur == null) {
                    if (q.isEmpty()) {
                        break;
                    } else {
                        q.add(null);
                    }
                } else {
                    if (!map.containsKey(cur.hd)) {   //first time hd is occurring
                        map.put(cur.hd, cur.node);
                    }
                    //left child
                    if (cur.node.left != null) {
                        q.add(new TopViewInfo(cur.node.left, cur.hd - 1));
                        min = Math.min(min, cur.hd - 1);
                    }
                    // right child
                    if (cur.node.right != null) {
                        q.add(new TopViewInfo(cur.node.right, cur.hd + 1));
                        max = Math.max(max, cur.hd + 1);
                    }
                }

            }

            for (int i = min; i <= max; i++) {
                System.out.print(map.get(i).data + " ");
            }
        }

        // k level data
        void kLevel(Node root, int level, int k) {
            if (root == null) {
                return;
            }

            if (level == k) {
                System.out.print(root.data + " ");
                return;
            }
            kLevel(root.left, level + 1, k);
            kLevel(root.right, level + 1, k);
        }
    }

    //Lowesr common ancestor -> last common anchestor
    Node lca(Node root, int n1, int n2) {   // TC O(n)
        ArrayList<Node> path1 = new ArrayList<>();
        ArrayList<Node> path2 = new ArrayList<>();

        getPath(root, n1, path1);
        getPath(root, n2, path2);

        // find last common acencestor
        int i = 0;
        for (; i < path1.size() && i < path2.size(); i++) {
            if (path1.get(i) != path2.get(i)) {
                break;
            }
        }

        return path1.get(i - 1);
    }

    //get path of common ancestor
    boolean getPath(Node root, int n, ArrayList<Node> path) {
        if (root == null) {
            return false;
        }

        path.add(root);

        if (root.data == n) {
            return true;
        }

        boolean foundLeft = getPath(root.left, n, path);
        boolean foundRight = getPath(root.right, n, path);

        if (foundLeft || foundRight) {
            return true;
        }
        path.remove(path.size() - 1);

        return false;
    }

    // lowest common ancestor approach 2
    Node lca2(Node root, int n1, int n2) {

        if (root == null || root.data == n1 || root.data == n2) {
            return root;
        }

        Node leftLca = lca2(root.left, n1, n2);
        Node rightLca = lca2(root.right, n1, n2);

        if (rightLca == null) {
            return leftLca;
        }
        if (leftLca == null) {
            return rightLca;
        }

        return root;
    }

    int lcaDist(Node root, int n) {
        if (root == null) {
            return -1;
        }
        if (root.data == n) {
            return 0;
        }

        int leftDist = lcaDist(root.left, n);
        int rightDist = lcaDist(root.right, n);

        if (leftDist == -1 && rightDist == -1) {
            return -1;
        } else if (leftDist == -1) {
            return rightDist + 1;
        } else {
            return leftDist + 1;
        }
    }

    // minmum distance
    int minDist(Node root, int n1, int n2) {
        Node lca = lca2(root, n1, n2);
        int dist1 = lcaDist(lca, n1);
        int dist2 = lcaDist(lca, n2);

        return dist1 + dist2;
    }

    int kAncestor(Node root, int n, int k) {
        if (null == root) {
            return -1;
        }
        if (root.data == n) {
            return 0;
        }

        int leftDist = kAncestor(root.left, n, k);
        int rightDist = kAncestor(root.right, n, k);

        if (leftDist == -1 && rightDist == -1) {
            return -1;
        }
        int max = Math.max(leftDist, rightDist);

        if (max + 1 == k) {
            System.out.println(root.data);
        }
        return max + 1;
    }

    //transform to sum tree
    int transform(Node root) {
        if (root == null) {
            return 0;
        }
        int leftChild = transform(root.left);
        int rightChild = transform(root.right);

        int data = root.data;
        int newLeft = root.left == null ? 0 : root.left.data;
        int newRight = root.right == null ? 0 : root.right.data;

        root.data = leftChild + newLeft + rightChild + newRight;
        return data;
    }
}
