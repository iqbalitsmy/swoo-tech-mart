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
public class ArrayPart {

    void callFun() {
        int arr[] = {2,2,1,1,1,2,2};
//        System.out.println(binnarySearch(arr, 10));
//        int[] rev = reverseArray(arr);
//        for (int i = 0; i < rev.length; i++) {
//            System.out.println(rev[i]);
//        }
//        pairInAnArray(arr);
//        printSubarray(arr);
//        maxSumOfSubArrayHelpOfPrefix(arr);
//        maxSubArray(arr);
//        System.out.println(trapedRainWater(arr));
//        System.out.println(stocksBuyAndSell(arr));
//        System.out.println(containsDuplicate(arr));
//        int[] res = productExceptSelf(arr);
        System.out.println(majorityElement(arr));

//        printResult(arr);
    }

    void printResult(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }

//    time complexity = O(logn)
    int binnarySearch(int arr[], int n) {
        int start = 0, end = arr.length - 1;
        while (start <= end) {
            int mid = (start + end) / 2;
            if (arr[mid] == n) {
                return mid;
            } else if (arr[mid] > n) {
                end = mid - 1;
            } else if (arr[mid] < n) {
                start = mid + 1;
            }
        }
        return -1;
    }

    int[] reverseArray(int[] arr) {
        int i = 0, j = arr.length - 1;
        while (i < j) {
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
        return arr;
    }

    void pairInAnArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                System.out.println("pair of" + arr[i] + " : (" + arr[i] + "," + arr[j] + ")");
            }
        }
    }
//    find sub array
//    sumation of subarray
//    minimum and maximum value of sumation

    void printSubarray(int[] arr) {
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i; j < arr.length; j++) {
                int sum = 0;
                for (int k = i; k <= j; k++) {  //print subarray
                    System.out.print(arr[k] + " ");
                    sum += arr[k];
                }
                if (sum < min) {
                    min = sum;
                } else if (sum > max) {
                    max = sum;
                }
                System.out.println("Total: " + sum);
            }
            System.out.println("");
        }
        System.out.println("Maximum:" + max + " Minimum:" + min);
    }
//    maximum subarray help of prefix array
//    prefix array store summetion of all elemet from index 0 to element index

    void maxSumOfSubArrayHelpOfPrefix(int[] arr) {
        int maxSum = Integer.MIN_VALUE;
        int[] prefix = new int[arr.length];
        prefix[0] = arr[0];
//      calculate prefix of the array
        for (int i = 1; i < arr.length; i++) {
            prefix[i] = prefix[i - 1] + arr[i];
        }

        for (int i = 0; i < arr.length; i++) {
            int currnSum = 0;
            for (int j = i; j < arr.length; j++) {
                currnSum = (i == 0) ? prefix[j] : prefix[j] - prefix[i - 1];
            }
            if (maxSum < currnSum) {
                maxSum = currnSum;
            }
        }
        System.out.println(maxSum);
    }
//  help of Kadane's algorithm
//  *Note: if every input is less than 0, it's will not work. find largest number will result

    void maxSubArray(int arr[]) {
        int curSub = 0;
        int maxSum = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            if (!(curSub + arr[i] < 0)) {
                curSub += arr[i];
            } else {
                curSub = 0;
            }
            maxSum = Math.max(curSub, maxSum);
        }
        System.out.println(maxSum);
    }

    int trapedRainWater(int[] height) {
        int[] leftMax = new int[height.length];
        int[] rightMax = new int[height.length];
        int trappedWater = 0;

        leftMax[0] = height[0];
        rightMax[height.length - 1] = height[height.length - 1];

//        in left max left side maximum elevation 
//        in right max right side maximum elevation
        for (int i = 1; i < height.length; i++) {
            leftMax[i] = Math.max(height[i], leftMax[i - 1]);
            rightMax[height.length - i - 1] = Math.max(rightMax[height.length - i], height[height.length - i - 1]);
        }

        for (int i = 0; i < height.length; i++) {
            trappedWater += (Math.min(leftMax[i], rightMax[i])) - height[i];
        }
        return trappedWater;
    }

    int stocksBuyAndSell(int prices[]) {
//        buy price need to minimum
        int buyPrice = Integer.MAX_VALUE;
//        if we have no profite result will be 0;
//        if price in descending order result will be 0 
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (buyPrice < prices[i]) {
                int todaysProfite = prices[i] - buyPrice;
                maxProfit = Math.max(maxProfit, todaysProfite);
            } else {
                buyPrice = prices[i];
            }
        }
        return maxProfit;
    }

    boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums);

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }
        return false;
    }

//    product of array except self 238
//    without prefix and postfix array
    int[] productExceptSelf(int[] nums) {
        int[] res = new int[nums.length];
//      fill res value of 1
        Arrays.fill(res, 1);
//      first prefix always 1
        int prefix = 1;
        for (int i = 0; i < nums.length; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
//      first postfix alawys 1
        int postfix = 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }

        return res;
    }

//    Majority Element - Leetcode 169
//    Using Moore’s Voting Algorithm
//    *note majority element always exists in the array
    int majorityElement(int[] nums) {
        int majority = nums[0];
        int vote = 1;
        for (int i = 1; i < nums.length; i++) {
            if (majority == nums[i]) {
                vote++;
            } else if (vote > 0) {
                vote--;
            } else {
                majority = nums[i];
                vote = 1;
            }
        }
        return majority;
    }
}
