/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class TwoDArray {

    void call() {
        int[][] twoDArr = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
//        spiralOrder(twoDArr);
        System.out.println(diagonalSum(twoDArr));
    }
// time O(n/2)

    void spiralOrder(int[][] matrix) {
        int startCol = 0;
        int startRow = 0;
        int endCol = matrix[0].length - 1;
        int endRow = matrix.length - 1;

        while (startCol <= endCol && startRow <= endRow) {
//            top
            for (int i = startCol; i <= endCol; i++) {
                System.out.print(matrix[startRow][i]);
            }
//            right
            for (int i = startRow + 1; i <= endRow; i++) {
                System.out.print(matrix[i][endCol]);
            }
//            bottom
            for (int i = endCol - 1; i >= 0; i--) {
                if (startRow == endRow) {
                    break;
                }
                System.out.print(matrix[endRow][i]);
            }
//            left
            for (int i = endRow - 1; i >= 1; i--) {
                if (startCol == endCol) {
                    break;
                }
                System.out.print(matrix[i][startCol]);
            }
            startCol++;
            startRow++;
            endCol--;
            endRow--;
        }
    }

//    nXn matrix must
    int diagonalSum(int[][] matrix) {
        int sum = 0;
//        brute force method
//        for (int i = 0; i < matrix.length; i++) {
//            for (int j = 0; j < matrix[0].length; j++) {
////                primary diagonal
//                if (i == j) {
//                    sum += matrix[i][j];
////               secondary diagonal
//                } else if (i + j == matrix.length - 1) {
//                    sum += matrix[i][j];
//                }
//            }
//        }

//      optimise way
        for (int i = 0; i < matrix.length; i++) {
//          primary diagonal
            sum += matrix[i][i];
//          secondary diagonal
//          j= n - i
            if (i != matrix.length - 1 - i) {   // for odd n, for avoid middle (i=j) value will add 2 times
                sum += matrix[i][matrix.length - 1 - i];
            }
        }

        return sum;
    }

//     Search a 2D Matrix 72
//    Each row and colum is sorted in non-decreasing order.
//    time complexity O(n+m). if n>>m is n, if m>>n is m
    boolean searchMatrix(int[][] matrix, int target) {
//        for right top corner value
        int row = 0, col = matrix[0].length - 1;
        while (col >= 0 && row < matrix.length) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }
//        for left bottom corner value
//        int row = matrix.length-1, col = 0;
//        while (row >= 0 && col < matrix[0].length ) {
//            if (matrix[row][col] == target) {
//                return true;
//            } else if (matrix[row][col] > target) {
//                row--;
//            } else {
//                col++;
//            }
//        }
        return false;
    }

    public int[][] transpose(int[][] matrix) {
        int[][] transposeMatrix = new int[matrix[0].length][matrix.length];

        for (int i = 0; i < transposeMatrix.length; i++) {
            for (int j = 0; j < transposeMatrix[i].length; j++) {
                transposeMatrix[i][j] = matrix[j][i];
            }
        }
        return transposeMatrix;
    }
}
