/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class Recursion {

    void recursionMain() {
        //        summation(1, 5, 0);
        //System.out.println(factorial(3));
//        fibonacciSequence(0, 1, 5);
//        System.out.println(sumOfFib(25));
//        System.out.println(lastOccure(new int[]{15, 20, 15, 70, }, 0, 15));
//        System.out.println(xSquare(2, 4));
        //        towerOfHanoi(2, "S", "H", "D");
        //        printReverseString("abc", "abc".length() - 1);
        //        findLastAndFirstOccurance("abbaba", 0, 'a', -1, -1);
//        System.out.println(isSorted(new int[]{1, 3, 4, 5}, new int[]{1, 3, 4, 5}.length - 1));
//        System.out.println(xMoveLast("Hxexlccx", 'x', 1));
//        removeDuplicate("abbccda", 0, new StringBuilder(""), new boolean[26]);
//        System.out.println(tilingProblem(4));
//        System.out.println(friendsPairing(4));
        printBinString(3, 0, "");

    }
// time O(n) space O(n)

    void summation(int i, int n, int sum) {
        if (i == n) {
            sum += i;
            System.out.println(sum);
            return;
        }
        summation(i + 1, n, sum += i);
    }
// time O(n) space O(n)

    int factorial(int n) {
        if (n == 0) {
            return 1;
        }
        return (n * factorial(n -= 1));
    }
// time (exponential time) O(2^n) space O(n)
// time increse exponentially because every lavel number of call is (2^level) in graph

    int sumOfFib(int n) {
        if (n == 0 || n == 1) {
            return n;
        }
        return sumOfFib(n - 1) + sumOfFib(n - 2);
    }

    void printFib(int a, int b, int n) {
        if (n == 0) {
            return;
        }
        int c = a + b;
        System.out.print(c + " ");
        printFib(b, c, n -= 1);
    }
// time O(n) space O(n)

    void fibonacciSequence(int a, int b, int n) {
        System.out.print(a + " ");
        System.out.print(b + " ");

        printFib(a, b, n);
    }
// time O(log(n)) space O(log(n))

    int xSquare(int x, int n) {
        if (n == 0) {
            return 1;
        }
        if (x == 0) {
            return 0;
        }
        int half = xSquare(x, n / 2);
        if (n % 2 == 0) {
            return half * half;
        } else {
            return half * half * x;
        }
    }

    void towerOfHanoi(int n, String src, String helper, String dest) {
        if (n == 1) {
            System.out.println("transfer disk " + n + " from " + src + " to " + dest);
            return;
        }
        towerOfHanoi(n - 1, src, dest, helper);
        System.out.println("transfer disk " + n + " from " + src + " to " + dest);
        towerOfHanoi(n - 1, helper, src, dest);
    }

    void printReverseString(String str, int indx) {
        if (indx == 0) {
            System.out.print(str.charAt(indx));
            return;
        }
        System.out.print(str.charAt(indx));
        printReverseString(str, indx - 1);
    }

    void findLastAndFirstOccurance(String str, int indx, char c, int first, int last) {
        if (indx == str.length()) {
            System.out.println(first + " " + last);
            return;
        }
        if (str.charAt(indx) == c) {
            if ((first == -1)) {
                first = indx;
            } else {
                last = indx;
            }
        }
        findLastAndFirstOccurance(str, indx + 1, c, first, last);
    }
//fist traverse full array, than find fist time key in the array return the index

    int lastOccure(int arr[], int i, int key) {
        if (i == arr.length) {
            return -1;
        }

        int isFound = lastOccure(arr, i + 1, key);
        if (isFound != -1) {
            return isFound;
        }
        if (arr[i] == key) {
            return i;
        }
        return isFound;
    }

// TC O(n) SC O(n+n)
    boolean isSorted(int[] arr, int indx) {
        if (indx == 0) {
            return true;
        }
        if (arr[indx - 1] >= arr[indx]) {
            return false;
        } else {
            return isSorted(arr, indx - 1);

        }
    }

    String xMoveLast(String str, char cha, int indx) {
        if (indx == str.length() - 1) {
            return str;
        }
        if (str.charAt(indx) == cha) {
            str += str.charAt(indx);
            str = str.replaceFirst(String.valueOf(str.charAt(indx)), "");
        }
        return xMoveLast(str, cha, indx + 1);
    }

    void removeDuplicate(String str, int indx, StringBuilder result, boolean[] map) {
        if (indx == str.length()) {
            System.out.println(result);
            return;
        }
        char ch = str.charAt(indx);
        if (map[ch - 'a'] == true) {
            removeDuplicate(str, indx + 1, result, map);
        } else {
            map[ch - 'a'] = true;
            removeDuplicate(str, indx + 1, result.append(ch), map);
        }
    }
//    2xn floor tiles 2x1, find way of placing tiles
//    vertically height 2, horizontal widht n

    int tilingProblem(int n) {
//        base case
        if (n == 0 || n == 1) {
            return 1;
        }
//        vertical f(n-1), horizontal f(n-2)
        return tilingProblem(n - 1) + tilingProblem(n - 2);
    }

//    Friends pairing problem
    /*
    Given n friends, each one can remain single or can be paired up with
    some other friend. Each friend can be paired only once. Find out the 
    total number of ways in Iqbal which friends can remain single or can be paired up.
     */
//    friendsPairing(n - 1) for single, (n - 1) * friendsPairing(n - 2) for pairs
//    (O(N) time and O(N) space
    int friendsPairing(int n) {
        if (n == 1 || n == 2) {
            return n;
        }
        return friendsPairing(n - 1) + (n - 1) * friendsPairing(n - 2);
    }
//    Binary string problem
//    Print all binary strings of size N without consecutive ones.
//    Consecutive ones mean "1" can't appear twice in a row.
    void printBinString(int n, int lastPlace, String str) {
//        base case
        if (n == 0) {
            System.out.println(str);
            return;
        }
        printBinString(n - 1, 0, str + "0");

        if (lastPlace == 0) {
            printBinString(n - 1, 1, str + "1");
        }
    }
}
