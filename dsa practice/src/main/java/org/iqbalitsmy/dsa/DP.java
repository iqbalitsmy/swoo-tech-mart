/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.Arrays;

/**
 *
 * @author AORUS
 */
public class DP {

    void call() {
        int n = 6;
        int[] f = new int[n + 1];
//        System.out.println(fib(n));
        int[] ways = new int[n];
        Arrays.fill(ways, -1);
//        System.out.println(countWays(5, ways));
//        System.out.println(countWays(5));
        // recursion
        System.out.println(knapsack(new int[]{15, 14, 10, 45, 30}, new int[]{2, 5, 1, 3, 4}, 7, 5));
        // memoization
        int[][] dp = new int[5 + 1][7 + 1];
        for (int i = 0; i < dp.length; i++) {
            for (int j = 0; j < dp[i].length; j++) {
                dp[i][j] = -1;
            }
        }
        System.out.println(knapsack(new int[]{15, 14, 10, 45, 30}, new int[]{2, 5, 1, 3, 4}, 7, 5, dp));
        System.out.println(knapsack(new int[]{15, 14, 10, 45, 30}, new int[]{2, 5, 1, 3, 4}, 7));

    }

    // skewed tree
    //memoization
    int fib(int n, int[] f) {   //TC O(n) SC O(n+1)
        if (n == 0 || n == 1) {
            return n;
        }
        if (f[n] != 0) {
            return f[n];
        }
        f[n] = fib(n - 1, f) + fib(n - 2, f);

        return f[n];
    }

    //tabulation
    int fib(int n) {
        int dp[] = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    //Count ways to reach the nth stair. The person can climb either 1 stair or 2 stairs at a time.
    int countWays(int n, int ways[]) {  //memoization way TC O(n) | recursion TC O(2^n)

        if (n == 0) {
            return 1;
        } else if (n < 0) {
            return 0;
        }

        if (ways[n] != -1) {
            return ways[n];
        }

        return ways[n] = countWays(n - 1, ways) + countWays(n - 2, ways);   // for x ways just add countWays(n - x, ways)
    }

    int countWays(int n) {  //tabulation TC O(n)
        int dp[] = new int[n + 1];

        dp[0] = 1;
        dp[1] = 1;

        for (int i = 2; i < dp.length; i++) {
            if (i == 1) {
                dp[i] = dp[i - 1];
                continue;
            }
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }

    // 0-1 knapsack
    int knapsack(int[] val, int wt[], int W, int n) {

        if (n == 0 || W == 0) {
            return 0;
        }

        if (wt[n - 1] <= W) { //valid
            //include
            int ans1 = val[n - 1] + knapsack(val, wt, W - wt[n - 1], n - 1);
            //exclude
            int ans2 = knapsack(val, wt, W, n - 1);
            return Math.max(ans1, ans2);
        } else { //not valid
            return knapsack(val, wt, W, n - 1);
        }
    }

    // memoization
    int knapsack(int[] val, int wt[], int W, int n, int dp[][]) {

        if (n == 0 || W == 0) {
            return 0;
        }

        if (dp[n][W] != -1) {
            return dp[n][W];
        }

        if (wt[n - 1] <= W) { //valid
            //include
            int ans1 = val[n - 1] + knapsack(val, wt, W - wt[n - 1], n - 1);
            //exclude
            int ans2 = knapsack(val, wt, W, n - 1);
            dp[n][W] = Math.max(ans1, ans2);
            return dp[n][W];
        } else { //not valid
            dp[n][W] = knapsack(val, wt, W, n - 1);
            return dp[n][W];
        }
    }

    // tabulation
    int knapsack(int[] val, int wt[], int W) {
        int n = val.length;
        int dp[][] = new int[n + 1][W + 1];

        for (int i = 0; i < dp.length; i++) {   //0th column
            dp[i][0] = 0;
        }

        for (int j = 0; j < dp[0].length; j++) {    // 0th row
            dp[0][j] = 0;
        }

        for (int i = 1; i < dp.length; i++) {
            for (int j = 1; j < dp[i].length; j++) {
                int v = val[i - 1]; //ith item value
                int w = wt[i - 1];  //ith item weight
                if (w <= j) {   //valid
                    int incProfit = v + dp[i - 1][j - w];
                    int exProfit = dp[i - 1][j];

                    dp[i][j] = Math.max(incProfit, exProfit);
                } else {    //invalid
                    int exProfit = dp[i - 1][j];
                    dp[i][j] = exProfit;
                }
            }
        }
        return dp[n][W];
    }

}
