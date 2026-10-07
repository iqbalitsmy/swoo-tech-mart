/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
//source https://youtu.be/Dr4PpNa7AYo?si=GNNab4JM0Xluh1nJ
public class PatternPractice {
    
    void solidRectangle(int row, int col) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    void hollowRectacngle(int row, int col) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (i == 0 || i == row - 1 || j == 0 || j == col - 1) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println("");
        }
    }
    
    void halfPyramid(int row) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    void invertedHalfPyramid(int row) {
        for (int i = row; i >= 0; i--) {
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    void rotatedHalfPyramid(int row) {
        for (int i = 1; i <= row; i++) {
            for (int j = 1; j <= row; j++) {
                if (j <= row - i) {
                    System.out.print(" ");
                } else {
                    System.out.print("*");
                }
            }
            System.out.println("");
        }
    }
    
    void halfPyramidNumber(int row) {
        for (int i = 0; i < row; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(j + 1);
            }
            System.out.println("");
        }
    }
    
    void invertedHalfPyramidNumber(int row) {
        for (int i = row; i >= 0; i--) {
            for (int j = 0; j < i; j++) {
                System.out.print(j + 1);
            }
            System.out.println("");
        }
    }
    
    void floydTriangle(int row) {
        int sum = 1;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < i; j++) {
                System.out.print(sum++ + " ");
            }
            System.out.println("");
        }
    }
    
    void zeroOneTriangle(int row) {
        for (int i = 1; i <= row; i++) {
            for (int j = 1; j <= i; j++) {
                if ((i + j) % 2 == 0) { //even
                    System.out.print("1");
                } else { //odd
                    System.out.print("0");
                }
            }
            System.out.println("");
        }
    }
    
    void butterflyPattern(int n) {
        for (int i = 1; i <= n; i++) {
//            first pyramid
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
//            space print
            int space = 2 * (n - i);
            for (int j = 1; j <= space; j++) {
                System.out.print(" ");
            }
//            second pyramid
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
        for (int i = n; i >= 0; i--) {
//            first pyramid
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
//            space print
            int space = 2 * (n - i);
            for (int j = 1; j <= space; j++) {
                System.out.print(" ");
            }
//            second pyramid
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    void solidRhombus(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < n; j++) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    void holowRhombus(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < n; j++) {
                if (j == 0 || j == n - 1 || i == 0 || i == n - 1) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println("");
        }
    }
    
    void numberPyramid(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.print(" ");
                System.out.print(i + 1);
            }
            System.out.println("");
        }
    }
    
    void palindromicPattern(int n) {
        for (int i = 0; i < n; i++) {
//            space print
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
//            left side numbers
            for (int j = i; j >= 0; j--) {
                System.out.print(j + 1);
            }
//            right side numbers
            for (int j = 1; j <= i; j++) {
                System.out.print(j + 1);
            }
            System.out.println("");
        }
    }
    
    void diamondPattern(int n) {
//        top pyramid
        for (int i = 0; i < n; i++) {
//            space print
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
//            left side pyramid
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
//            right side pyramid
            for (int j = i; j >= 0; j--) {
                System.out.print("*");
            }
            System.out.println("");
        }
//        bottom pyramid
        for (int i = n; i >= 0; i--) {
//            space print
            for (int j = 0; j < n - i; j++) {
                System.out.print(" ");
            }
//            left side pyramid
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
//            right side pyramid
            for (int j = i; j >= 0; j--) {
                System.out.print("*");
            }
            System.out.println("");
        }
    }
    
    //leetcode 2091(Own). Removing Minimum and Maximum From Array
    int minimumDeletions(int[] nums) {  //TC O(n)
        int maxIdx = 0;
        int minIdx = 0;
        
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            } else if (nums[i] < nums[minIdx]) {
                minIdx = i;
            }
        }
        
        int left = Math.min(maxIdx, minIdx);
        int right = Math.max(maxIdx, minIdx);
        
        int removeLeft = right + 1;
        int removeRight = nums.length - left;
        int removeBoth = left + 1 + nums.length - right;
        
        return Math.min(removeLeft, Math.min(removeRight, removeBoth));
    }
    
}
