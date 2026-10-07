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
public class Strings {

    void call() {
        String[] str = {"apple", "mango", "banana"};
//        System.out.println(sortestPath("WNEENESENNN"));
//        System.out.println(largestString(str));
//        System.out.println(firstLetterUpaerCase("my name is khan"));
        System.out.println(isAnagram("anagram", "nagaram"));
    }
// Valid Palindrome 125

    boolean isPalindrome(String s) {
        s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        int i = 0, j = s.length() - 1;
        while (j > i) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }

    float sortestPath(String path) {
        int x = 0, y = 0;
        for (int i = 0; i < path.length(); i++) {
            char dir = path.charAt(i);
            switch (dir) {
                case ('N'):
                    y++;
                    break;
                case ('S'):
                    y--;
                    break;
                case ('E'):
                    x++;
                    break;
                default:
                    x--;
            }
        }
        int X1 = x * x;
        int Y1 = y * y;
        return (float) Math.sqrt(X1 + Y1);
    }
//    for a given set of Strings, print the largest string.
//    lexicographic way
//    time complexity 

    String largestString(String[] str) {
        String largest = str[0];
        for (int i = 1; i < str.length - 1; i++) {
            if (largest.compareTo(str[i]) < 0) {
                largest = str[i];
            }
        }
        return largest;
    }

    String firstLetterUpaerCase(String str) {
        StringBuilder strBui = new StringBuilder("");
        strBui.append(Character.toUpperCase(str.charAt(0)));
        for (int i = 1; i < str.length(); i++) {
            if ((str.charAt(i) == ' ') && (i != str.length() - 1)) {
                strBui.append(str.charAt(i));
                i++;
                strBui.append(Character.toUpperCase(str.charAt(i)));
            } else {
                strBui.append(str.charAt(i));
            }
        }
        return strBui.toString();
    }

//    Strings areanagramsof each other 242
    boolean isAnagram(String s, String t) {
        char[] sArr = s.toCharArray();
        char[] tArr = t.toCharArray();

        Arrays.sort(sArr);
        Arrays.sort(tArr);

        return Arrays.equals(sArr, tArr);
    }
}
