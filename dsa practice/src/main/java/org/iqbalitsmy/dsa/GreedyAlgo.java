/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.ArrayList;
import java.util.*;

/**
 *
 * @author AORUS
 */
public class GreedyAlgo {

    void call() {
//        activity(new int[]{1, 3, 0, 5, 8, 5}, new int[]{2, 4, 6, 7, 9, 9});
//        System.out.println(knapsack(new int[]{60, 100, 120}, new int[]{10, 20, 30}, 50));
//        System.out.println(minAbsDef(new int[]{4, 1, 8, 7}, new int[]{2, 3, 6, 5}));
//        System.out.println(maxPairOfChain(new int[][]{{5, 24}, {39, 60}, {5, 28}, {27, 40}, {50, 90}}));
//        System.out.println(coinChange(new Integer[]{1, 2, 5, 10, 20, 50, 100, 500, 1000}, 550));
//        maxJobs(new int[][]{{4, 20}, {1, 10}, {1, 40}, {1, 30}});
        System.out.println(minCutCostOfChocola(4, 6, new Integer[]{2, 1, 3, 1, 4}, new Integer[]{4, 1, 2}));
    }

    /*Activity Selection You are given n activities with their start and end times. 
    Select the maximum number of activities that can be performed by a single person, 
    assuming that a person can only work on a single activity at a time. 
    Activities are sorted according to end time.
     */
//    end time sorted
//    TC O(n)
    void activityOne(int start[], int end[]) {
        ArrayList<Integer> ans = new ArrayList<>();
        int maxAct = 0;

//        first acctivity
        maxAct++;
        int lastEnd = end[0];
        ans.add(0);
        for (int i = 1; i < end.length; i++) {
            if (start[i] >= lastEnd) {
//                activity select
                maxAct++;
                ans.add(i);
                lastEnd = end[i];
            }
        }
        System.out.println("Max Activity:" + maxAct);
        System.out.println(ans);
    }
    //    end time unsorted
    //    TC O(nlog(n))

    void activity(int start[], int end[]) {
        ArrayList<Integer> ans = new ArrayList<>();
        int maxAct = 0;

//        sorting
        int activities[][] = new int[start.length][3];

        for (int i = 0; i < activities.length; i++) {
            activities[i][0] = i;
            activities[i][1] = start[i];
            activities[i][2] = end[i];
        }
//        lamda function -> shortform of function
        Arrays.sort(activities, Comparator.comparingDouble(o -> o[2]));

//        first acctivity
        maxAct++;
        int lastEnd = activities[0][2];
        ans.add(activities[0][0]);
        for (int i = 1; i < end.length; i++) {
            if (activities[i][1] >= lastEnd) {
//                activity select
                maxAct++;
                ans.add(activities[i][0]);
                lastEnd = activities[i][2];
            }
        }
        System.out.println("Max Activity:" + maxAct);
        System.out.println(ans);
    }
    
    //  fractional knapsak
    int knapsack(int val[], int weight[], int w) {
        double ratio[][] = new double[val.length][2];
        // 0th column -> idx, 1th column -> ratio

        for (int i = 0; i < val.length; i++) {
            ratio[i][0] = i;
            ratio[i][1] = val[i] / (double) weight[i];
        }
//        asending order
        Arrays.sort(ratio, Comparator.comparingDouble(o -> o[1]));

        int capacity = w;
        int finalVal = 0;

        for (int i = ratio.length - 1; i >= 0; i--) {
            int idx = (int) ratio[i][0];
            if (capacity >= weight[idx]) {
                capacity -= weight[idx];
                finalVal += val[idx];
            } else {
                finalVal += capacity * ratio[i][1];
                capacity = 0;
                break;
            }
        }
        return finalVal;
    }

    //  minimum absolute differences
    /*Given two arrays A and B of equal length n. 
    Pair each element of array A to an element in array B, 
    such that sum S of absolute differences of all the pairs is minimum.
     */
    // TC O(nLog(n))
    int minAbsDef(int a[], int b[]) {
        Arrays.sort(a);
        Arrays.sort(b);

        int minAbs = 0;
        for (int i = 0; i < b.length; i++) {
            minAbs += Math.abs(a[i] - b[i]);
        }
        return minAbs;
    }

    /*  Max Length Chain of Pairs
    You are given n pairs of numbers. In every pair, 
    the first number is always smaller than the second number. 
    A pair (c, d) can come after pair (a, b) if b < c. 
    Find the longest chain which can be formed from a given set of pairs.
     */
    int maxPairOfChain(int pairs[][]) { //TC O(nlog(n))
        Arrays.sort(pairs, Comparator.comparingDouble(o -> o[1]));

        int chainLan = 1;
        int chainLastEnd = pairs[0][1];

        for (int i = 0; i < pairs.length; i++) {
            if (pairs[i][0] > chainLastEnd) {
                chainLan++;
                chainLastEnd = pairs[i][1];
            }
        }
        return chainLan;
    }

    /*  Indian Coins
    We are given an infinite supply of denominations [1, 2, 5, 10, 20, 50, 100, 500, 2000]. 
    Find min no. of coins/notes to make change for a value V.
     */
    int coinChange(Integer coins[], int amount) {
//         for reverse order, value should be class type
        Arrays.sort(coins, Comparator.reverseOrder());
        int coinCount = 0;

        for (int i = 0; i < coins.length; i++) {
            if (coins[i] <= amount) {
                while (coins[i] <= amount) {
                    coinCount++;
                    amount -= coins[i];
                }
            }
        }
        return coinCount;
    }

    class Job {

        int deadLine;
        int profit;
        int id;

        Job(int deadLine, int profit, int id) {
            this.deadLine = deadLine;
            this.profit = profit;
            this.id = id;
        }
    }

    /*Given an array of jobs where every job has a deadline and profit if the job is finished before the deadline. 
    It is also given that every job takes a single unit of time, so the minimum possible deadline for any job is 1. 
    Maximize the total profit if only one job can be scheduled at a time.
     */
    void maxJobs(int jobsInfo[][]) {
        ArrayList<Job> jobs = new ArrayList<>();

        for (int i = 0; i < jobsInfo.length; i++) {
            jobs.add(new Job(i, jobsInfo[i][0], jobsInfo[i][1]));
        }

        Collections.sort(jobs, (a, b) -> b.profit - a.profit);  //desending order sorting

        ArrayList<Integer> seq = new ArrayList<>();
        int time = 0;
        for (int i = 0; i < jobs.size(); i++) {
            if (jobs.get(i).deadLine > time) {
                seq.add(jobs.get(i).id);
                time++;
            }
        }

        //print seq
        System.out.println("max jobs = " + seq.size());
        System.out.println(seq);
    }

    int minCutCostOfChocola(int m, int n, Integer costVer[], Integer costHor[]) {
        Arrays.sort(costHor, Collections.reverseOrder());
        Arrays.sort(costVer, Collections.reverseOrder());

        int h = 0, v = 0;   //pointer
        int hpc = 1, vpc = 1;   //pices of chocolate
        int cost = 0;

        while (h < costHor.length && v < costVer.length) {
            if (costHor[h] >= costVer[v]) { //horizontal cut
                cost += (costHor[h] * vpc);
                h++;
                hpc++;
            } else {    //vertical cut
                cost += (costVer[v] * hpc);
                v++;
                vpc++;
            }
        }
        while (h < costHor.length) {    //rest of horizontal cut
            cost += (costHor[h] * vpc);
            h++;
            hpc++;
        }
        while (v < costVer.length) {    //rest of vertical cut
            cost += (costVer[h] * hpc);
            v++;
            vpc++;
        }

        return cost;
    }

}
