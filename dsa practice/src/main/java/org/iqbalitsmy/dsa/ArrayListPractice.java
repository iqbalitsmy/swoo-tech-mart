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
public class ArrayListPractice {

    void call() {
//        twoDArrayList();
        ArrayList<Integer> height = new ArrayList();
        height.add(5);
        height.add(6);
        height.add(7);
        height.add(8);
        height.add(1);
        height.add(2);
        height.add(3);
        height.add(4);
//        System.out.println(storeWater(height));
//        System.out.println(pairSum(height, 100));
        System.out.println(pairSumTwo(height, 13));
    }

    void twoDArrayList() {
        ArrayList<ArrayList<Integer>> mainList = new ArrayList();
        ArrayList<Integer> list1 = new ArrayList();
        list1.add(20);
        list1.add(30);
        mainList.add(list1);

        ArrayList<Integer> list2 = new ArrayList();
        list2.add(60);
        list2.add(85);
        mainList.add(list2);

        for (int i = 0; i < mainList.size(); i++) {
            for (int j = 0; j < mainList.get(i).size(); j++) {
                System.out.println(mainList.get(i).get(j));
            }

        }
    }
//    Container with Most Water
//    For given n lines on x-axis, use 2 lines to form a container such that it holds maximum water.
//    TC O(n)

    int storeWater(ArrayList<Integer> heightList) {
        int maxStore = Integer.MIN_VALUE;
        int i = 0, j = heightList.size() - 1;
        while (i < j) {
            int width = j - i;
            int height = Math.min(heightList.get(i), heightList.get(j));
            maxStore = Math.max(maxStore, width * height);
//            less height decide volume increase or not
            if (heightList.get(i) < heightList.get(j)) {
                i++;
            } else {
                j--;
            }
        }
        return maxStore;
    }
//Pair Sum - 1 
//Find if any pair in a Sorted ArrayList has a target sum. 
//list = [1, 2, 3, 4, 5, 6], target=5
//    TC O(n)

    boolean pairSum(ArrayList<Integer> list, int target) {
        int lp = 0, rp = list.size() - 1;
        while (lp < rp) {
            int sum = list.get(lp) + list.get(rp);
            if (sum == target) {
                return true;
            } else if (sum > target) {
                rp--;
            } else {
                lp++;
            }
        }
        return false;
    }
//    Pair Sum - 2 
//    Find if any pair in a Sorted & Rotated ArrayList has a target sum. 
//    list = [11, 15, 6, 8, 9, 10], target=16
//  roated array TC O(n)

    boolean pairSumTwo(ArrayList<Integer> list, int target) {
        int n = list.size() - 1, pivot = -1;
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) > list.get(i + 1)) {
                pivot = i;
                break;
            }
        }
        int rp = pivot; //largest
        int lp = pivot + 1; //smallest

        while (rp != lp) {
            if (list.get(rp) + list.get(lp) == target) {
                return true;
            }
            if (list.get(rp) + list.get(lp) > target) {
                rp = (n + rp - 1) % n;
            } else {
                lp = (lp + 1) % n;
            }
        }
        return false;
    }
}
