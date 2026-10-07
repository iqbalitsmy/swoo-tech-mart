/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.dsa;

import com.mycompany.dsa.PatternPractice;
import com.mycompany.dsa.Recursion;
import com.mycompany.dsa.MethodAndFunction;
import com.mycompany.dsa.Backtracking;
import com.mycompany.dsa.Sorting;
import com.mycompany.dsa.Strings;
import com.mycompany.dsa.Oop;
import com.mycompany.dsa.ArrayListPractice;
import com.mycompany.dsa.LinkListPractice;
import com.mycompany.dsa.StackPractice;
import com.mycompany.dsa.QueueP;
import com.mycompany.dsa.GreedyAlgo;
import com.mycompany.dsa.BinnaryTreeP;
import com.mycompany.dsa.BST;
import com.mycompany.dsa.HeapP;
import com.mycompany.dsa.HashMapImplementation;
import com.mycompany.dsa.HashP;
import com.mycompany.dsa.TrieP;
import com.mycompany.dsa.GraphP;
import com.mycompany.dsa.DP;

/**
 *
 * @author AORUS
 */
public class Dsa {

    public static void main(String[] args) {
        PatternPractice pattern = new PatternPractice();
//        pattern.solidRectangle(4, 5);
//        pattern.hollowRectacngle(4, 5);
//        pattern.halfPyramid(4);
//        pattern.invertedHalfPyramid(4);
//        pattern.rotatedHalfPyramid(4);
//        pattern.halfPyramidNumber(4);
//        pattern.invertedHalfPyramidNumber(4);
//        pattern.floydTriangle(10);
//        pattern.zeroOneTriangle(5);
//        pattern.butterflyPattern(4);
//        pattern.solidRhombus(4);
//        pattern.numberPyramid(5);
//        pattern.palindromicPattern(5);
//        pattern.diamondPattern(5);
//        pattern.holowRhombus(5);
        ImmutablesStringBuilder strBuilder = new ImmutablesStringBuilder();
//        strBuilder.reverseString();

        Recursion recursion = new Recursion();
//        recursion.recursionMain();
        MethodAndFunction methodAndFunction = new MethodAndFunction();
//        methodAndFunction.fun();
        Backtracking backtracking = new Backtracking();
//        backtracking.callFun();
        ArrayPart arrayPart = new ArrayPart();
//        arrayPart.callFun();
        Sorting sorting = new Sorting();
//        sorting.callFun();

        TwoDArray twoDArray = new TwoDArray();
//        twoDArray.call();
        Strings str = new Strings();
//        str.call();
        BitManipulation bitManipulation = new BitManipulation();
//        bitManipulation.call();
        Oop oop = new Oop();
//        oop.call();
        ArrayListPractice arrayListPractice = new ArrayListPractice();
//        arrayListPractice.call();
        LinkListPractice linkList = new LinkListPractice();
//        linkList.call();
        StackPractice stackPractice = new StackPractice();
//        stackPractice.call();
        QueueP queue = new QueueP();
//        queue.call();
        GreedyAlgo greedyAlgo = new GreedyAlgo();
//        greedyAlgo.call();
        BinnaryTreeP binaryTree = new BinnaryTreeP();
//        binaryTree.call();
        BST bst = new BST();
//        bst.call();
        HeapP heapP = new HeapP();
//        heapP.call();
        HashMapImplementation hashMapImplementation = new HashMapImplementation();
//        hashMapImplementation.call();
        HashP hasmapP = new HashP();
//        hasmapP.call();
        TrieP trieP = new TrieP();
//        trieP.call();
        GraphP graphP = new GraphP();
//        graphP.call();
        DP dp = new DP();
//        dp.call();
        Revision revision = new Revision();
        revision.call();
    }
}

//strign builder
class ImmutablesStringBuilder {

    void reverseString() {
        StringBuilder str = new StringBuilder("hello");
        System.out.println(str);
        for (int i = 0; i < str.length() / 2; i++) {
            int front = i;
            int back = str.length() - 1 - i;

            char frontChar = str.charAt(front);
            char backChar = str.charAt(back);

            str.setCharAt(front, backChar);
            str.setCharAt(back, frontChar);
        }
        System.out.println(str);
    }
}
