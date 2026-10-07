/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.Scanner;

/**
 *
 * @author AORUS
 */
public class MethodAndFunction {

    void fun() {
//        binToDec();
//        decToBin(11);
        System.out.println(isPalindrome(1667661));
    }

//binary to decimal
    void binToDec() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the Binary number: ");
        int n = sc.nextInt();
        int pow = 0;
        int decNum = 0;
        while (n > 0) {
//            take last digit
            int lastNum = n % 10;
            decNum = decNum + (lastNum * (int) Math.pow(2, pow));

            pow++;
//            remove last digit
            n = n / 10;
        }

        System.out.println("Decimal Number: " + decNum);
    }

//decimal to binary
    void decToBin(int n) {
        int bin = 0;
        int pow = 0;

        while (n > 0) {
            int rem = n % 2;
            n = n / 2;
            bin = bin + rem * (int) Math.pow(10, pow);

            pow++;
        }
        System.out.println(bin);
    }

    boolean isPalindrome(int n) {
        int palidromic = n;
        int reverse = 0;
        while (palidromic > 0) {
//            take last digit
            int lastDigit = palidromic % 10;
//            make reverse number
            reverse = (reverse * 10) + lastDigit;

            palidromic /= 10;
        }
        if (n == reverse) {
            return true;
        }
        return false;
    }
}
