/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.HashMap;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Set;

/**
 *
 * @author AORUS
 */
public class HashP {

    void call() {
//        System.out.println(majorityElement(new int[]{1, 3, 2, 5, 1, 3, 1, 5, 1}, 3));
//        System.out.println(vaildAnagram("heart", "earth"));
//        System.out.println(distinctElement(new int[]{4, 3, 2, 5, 6, 7, 3, 4, 2, 1}));
//        unionAndIntersection(new int[]{7, 3, 9}, new int[]{6, 3, 9, 2, 9, 4});
        HashMap< String, String> tickets = new HashMap<>();
        tickets.put("Chennai", "Bengaluru");
        tickets.put("Mumbai", "Delhi");
        tickets.put("Goa", "Chennai");
        tickets.put("Delhi", "Goa");
//        litneraryTickets(tickets);
//        System.out.println(largestSubarray(new int[]{15, -2, 2, -8, 1, 7, 10, 23}));
        System.out.println(subarrayOfsum(new int[]{10, 2, -2, -20, 10}, -10));
    }

    /*
    Majority Element
    Given an integer array of size n, find all elements that appear more than n/3 times.
     */
    ArrayList<Integer> majorityElement(int[] nums, int div) {   // TC O(n)
        HashMap<Integer, Integer> hm = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            hm.put(nums[i], hm.getOrDefault(nums[i], 0) + 1);   //if already exist retun value or default value will return
        }

        ArrayList<Integer> res = new ArrayList<>();

        for (Integer key : hm.keySet()) {
            if (hm.get(key) > (nums.length / div)) {
                res.add(key);
            }
        }
        return res;
    }

    boolean vaildAnagram(String str1, String str2) {    //TC O(n) SC O(n)
        if (str1.length() != str2.length()) {
            return false;
        }

        HashMap<Character, Integer> hm = new HashMap<>();

        for (int i = 0; i < str1.length(); i++) {
            hm.put(str1.charAt(i), hm.getOrDefault(str1.charAt(i), 0) + 1);
        }
        //remove element if it match
        for (int i = 0; i < str2.length(); i++) {
            char ch = str2.charAt(i);
            if (hm.get(ch) != null) {   //when str2 have a value that not exist in str1
                if (hm.get(ch) == 1) {
                    hm.remove(ch);
                } else {
                    hm.put(ch, hm.get(ch) - 1);
                }
            } else {
                return false;
            }
        }
        return hm.isEmpty();
    }

    //count distinct element (distinct-> unique)
    int distinctElement(int[] num) {   //TC O(n)
        Set<Integer> set = new HashSet<>();

        for (int i = 0; i < num.length; i++) {
            set.add(num[i]);
        }

        return set.size();
    }

    //length of union and intersection of two array
    void unionAndIntersection(int arr1[], int arr2[]) { //TC O(n+m)
        HashSet<Integer> hs = new HashSet<>();
        //union
        for (int i = 0; i < arr1.length; i++) {
            hs.add(arr1[i]);
        }
        for (int i = 0; i < arr2.length; i++) {
            hs.add(arr2[i]);
        }

        System.out.println("Union Length: " + hs.size());

        //intersection
        hs.clear();
        for (int i = 0; i < arr1.length; i++) {
            hs.add(arr1[i]);
        }
        int count = 0;
        for (int i = 0; i < arr2.length; i++) {
            if (hs.contains(arr2[i])) {
                count++;
                hs.remove(arr2[2]);
            }
        }

        System.out.println("Intersection Length: " + count);
    }

    // find ltinerary (jurney) from tickets
    void litneraryTickets(HashMap<String, String> tickets) {
        String start = getStartingPoint(tickets);

        System.out.print(start);

        for (String key : tickets.keySet()) {
            System.out.print(" -> " + tickets.get(start));
            start = tickets.get(start);
        }
        System.out.println("");
    }

    String getStartingPoint(HashMap<String, String> tickets) {  //starting point of jurney
        HashMap<String, String> revTickets = new HashMap<>();

        for (String key : tickets.keySet()) {
            revTickets.put(tickets.get(key), key);
        }

        for (String key : tickets.keySet()) {
            if (!revTickets.containsKey(key)) {
                return key;
            }
        }

        return null;
    }

    //largest subarray with sum of zero ->(rewatch problem video)
    int largestSubarray(int arr[]) {    //TC O(n)
        HashMap<Integer, Integer> hm = new HashMap<>(); //sum , idx

        int sum = 0;
        int len = 0;

        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
            if (hm.containsKey(sum)) {
                len = Math.max(len, i - hm.get(sum));
            } else {
                hm.put(sum, i);
            }
        }
        return len;
    }

    // count subarray of summation k @Todo rewatch
    int subarrayOfsum(int arr[], int k) {   //TC O(n) SC O(n)
        HashMap<Integer, Integer> hm = new HashMap<>(); //sum count

        hm.put(0, 1);

        int sum = 0;
        int ans = 0;

        for (int i = 0; i < arr.length; i++) {  //O(n)
            sum += arr[i]; //sum
            if (hm.containsKey(sum - k)) {
                ans += hm.get(sum - k);
            }
            hm.put(sum, hm.getOrDefault(sum, 0) + 1);
        }
        return ans;
    }

}
