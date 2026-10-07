/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author AORUS
 */
public class Backtracking {

    void callFun() {
//        printPermutation("ABC", "");
//        System.out.println(solveNQueens(4));
        int arr[] = new int[5];
//        chageArray(arr, 0, 1);
//        printArr(arr);
//        findSubset("abc", "", 0);
//        printPermutation("abc", "");
//        n queen problem
        int n = 5;
        char board[][] = new char[n][n];
//        initialize
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = 'x';
            }
        }
//        nQueens(board, 0);
//        first solution print
//        if (firstNQueen(board, 0)) {
//            System.out.println("Solution Possible");
//            printBoard(board);
//        } else {
//            System.out.println("Solution is not possible");
//        }
//        System.out.println(gridWays(0, 0, 3, 3));
//        System.out.println(optimizeGridWays(3, 3));
//        suduku problem
        int sudoku[][] = {{0, 0, 8, 0, 0, 0, 0, 0, 0},
        {4, 9, 0, 1, 5, 7, 0, 0, 2},
        {0, 0, 3, 0, 0, 4, 1, 9, 0},
        {1, 8, 5, 0, 6, 0, 0, 2, 0},
        {0, 0, 0, 0, 2, 0, 0, 6, 0},
        {9, 6, 0, 4, 0, 5, 3, 0, 0},
        {0, 3, 0, 0, 7, 2, 0, 0, 4},
        {0, 4, 9, 0, 3, 0, 0, 5, 7},
        {8, 2, 7, 0, 0, 9, 0, 1, 3}};
        sudokuSolver(sudoku, 0, 0);
        printSuduku(sudoku);
    }

    void printArr(int arr[]) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
        }
        System.out.println("");
    }

//    basic backtracking
    void chageArray(int arr[], int i, int val) {
//        base case
        if (i == arr.length) {
            printArr(arr);
            return;
        }
        arr[i] = val;
        chageArray(arr, i + 1, val + 1);
        arr[i] = val - 2;
    }

//    print subsets from string
//    TC O(n*2^n), SC O(n)
//    for 1 subset TC is O(1*2^n), for n is O(n*2^n)
    void findSubset(String str, String ans, int i) {
//        base case
        if (i == str.length()) {
            if (ans.length() == 0) {
                System.out.println("null");
            } else {
                System.out.println(ans);
            }
            return;
        }
        findSubset(str, ans + str.charAt(i), i + 1);
        findSubset(str, ans, i + 1);
    }

//    permutation means arrang, arrange the string differnt index
//    n element permutation is n! (factorial)
//    TC O(n*n!)
    void printPermutation(String str, String perm) {
        if (str.length() == 0) {
            System.out.println(perm);
            return;
        }
        for (int i = 0; i < str.length(); i++) {
            char curChar = str.charAt(i);
            // "abcd" pick c, newStr="ab"+"d"
            String newStr = str.substring(0, i) + str.substring(i + 1);
            printPermutation(newStr, perm + curChar);
        }
    }
//  TC O(n!)

    void nQueens(char board[][], int row) {
//        base 
        if (row == board.length) {
            return;
        }
//        column loop
        for (int i = 0; i < board.length; i++) {
            if (isSafe(row, i, board)) {
                board[row][i] = 'Q';
                nQueens(board, row + 1);    //function call
                board[row][i] = 'x';    //backtracking steps
            }
        }
    }

//    print n queen first solution 
    boolean firstNQueen(char board[][], int row) {
        //        base 
        if (row == board.length) {
            return true;
        }
//        column loop
        for (int i = 0; i < board.length; i++) {
            if (isSafe(row, i, board)) {
                board[row][i] = 'Q';
                if (firstNQueen(board, row + 1)) {
                    return true;
                }
                board[row][i] = 'x';    //backtracking steps
            }
        }
        return false;
    }

    void printBoard(char board[][]) {
        System.out.println("---chase board---");
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board.length; j++) {
                System.out.print(board[i][j] + " ");
            }
            System.out.println("");
        }
    }

//    for check weher queens safe
    boolean isSafe(int row, int col, char[][] board) {
//            horizontal check
        for (int j = 0; j < board.length; j++) {
            if (board[row][j] == 'Q') {
                return false;
            }
        }
        //            vetical check
        for (int i = 0; i < board[0].length; i++) {
            if (board[i][col] == 'Q') {
                return false;
            }
        }

        //            uper left check
        int r = row;
        for (int c = col; c >= 0 && r >= 0; c--, r--) {
            if (board[r][c] == 'Q') {
                return false;
            }
        }

        //            uper right check
        r = row;
        for (int c = col; c < board.length && r >= 0; c++, r--) {
            if (board[r][c] == 'Q') {
                return false;
            }
        }
        //            lower left check
        r = row;
        for (int c = col; c >= 0 && r < board.length; c--, r++) {
            if (board[r][c] == 'Q') {
                return false;
            }
        }
        //            lower right check
        r = row;
        for (int c = col; c < board.length && r < board.length; c++, r++) {
            if (board[r][c] == 'Q') {
                return false;
            }
        }
        return true;
    }
//    Check Knight Tour Configuration 2596

    boolean checkKnightTourValid(int[][] grid) {
        if (grid[0][0] != 0) {
            return false;
        }

        return helper(grid, 0, 0, 0);
    }

    boolean helper(int[][] grid, int row, int col, int num) {
        int n = grid.length;
        if (grid[row][col] == n * n - 1) {
            return true;
        }

        int i, j;
//      2 up right
        i = row - 2;
        j = col + 1;
        if ((i >= 0 && j < n) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//        2 up left
        i = row - 2;
        j = col - 1;
        if ((i >= 0 && j >= 0) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 down right
        i = row + 2;
        j = col + 1;
        if ((i < n && j < n) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 down left
        i = row + 2;
        j = col - 1;
        if ((i < n && j >= 0) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 right up
        i = row - 1;
        j = col + 2;
        if ((i >= 0 && j < n) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 right down
        i = row + 1;
        j = col + 2;
        if ((i < n && j < n) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 left up
        i = row - 1;
        j = col - 2;
        if ((i >= 0 && j >= 0) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }
//      2 left down
        i = row + 1;
        j = col - 2;
        if ((i < n && j >= 0) && grid[i][j] == num + 1) {
            return helper(grid, i, j, num + 1);
        }

        return false;
    }

//    TC O(2^(n+m))
    int gridWays(int i, int j, int n, int m) {
//        base case
        if (i == n - 1 && j == m - 1) {
            return 1;
        } else if (i == n || j == m) {  //corner case
            return 0;
        }
        int w1 = gridWays(i + 1, j, n, m);
        int w2 = gridWays(i, j + 1, n, m);
        return w1 + w2;
    }

    int factorial(int n) {
//        base case
        if (n == 0) {
            return 1;
        }
        return n * factorial(n - 1);
    }
//  optimize using permutation way

    int optimizeGridWays(int n, int m) {
        return (factorial(n - 1 + m - 1)) / (factorial(n - 1) * factorial(m - 1));
    }

//    sudoku problem
    boolean sudokuSolver(int sudoku[][], int row, int col) {
//        base case
        if (9 == row) {
            return true;
        }
//          recuesion
        int nextRow = row, nextCol = col + 1;
        if (9 == col + 1) {
            nextRow = row + 1;
            nextCol = 0;
        }

        if (0 != sudoku[row][col]) {
            return sudokuSolver(sudoku, nextRow, nextCol);
        }

        for (int digit = 0; digit <= 9; digit++) {
            if (isSafeSuduku(sudoku, row, col, digit)) {
                sudoku[row][col] = digit;
                if (sudokuSolver(sudoku, nextRow, nextCol)) {
                    return true;
                }
                sudoku[row][col] = 0;
            }
        }
        return false;
    }

    boolean isSafeSuduku(int suduku[][], int row, int col, int digit) {
//        column
        for (int i = 0; i < 9; i++) {
            if (suduku[i][col] == digit) {
                return false;
            }
        }

        //        row
        for (int i = 0; i < 9; i++) {
            if (suduku[row][i] == digit) {
                return false;
            }
        }

//        grid check
        int sr = (row / 3) * 3;
        int sc = (col / 3) * 3;
        for (int i = sr; i < sr + 3; i++) {
            for (int j = sc; j < sc + 3; j++) {
                if (suduku[i][j] == digit) {
                    return false;
                }
            }

        }
        return true;
    }

    void printSuduku(int sudoku[][]) {
        for (int i = 0; i < sudoku.length; i++) {
            for (int j = 0; j < sudoku[i].length; j++) {
                System.out.print(sudoku[i][j] + " ");
            }
            System.out.println("");
        }
    }
}
