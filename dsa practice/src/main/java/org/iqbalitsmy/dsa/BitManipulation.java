/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class BitManipulation {

    void call() {
//        checkOddEven(4);
//        System.out.println(getIthBit(10, 3));
//        System.out.println(setIthBit(10, 2));
//        System.out.println(clearIthBit(10, 1));
//        System.out.println(updateItnBit(10, 2, 1));
//        System.out.println(clearLastIthBit(15, 2));
//        System.out.println(clearEangOfBits(10, 2, 4));
//        System.out.println(isPowerOfTwo(8));
//        System.out.println(countSetBits(16));
        System.out.println(fastExpo(5, 10));
    }
//  last bit of odd value always 1

    void checkOddEven(int n) {
        if ((n & 1) == 1) {
            System.out.println("Odd value");
        } else {
            System.out.println("Even value");
        }
    }
//      get I'th Bit

    int getIthBit(int n, int i) {
        int bitMask = 1 << i;   //the ith position value only 1 rest of them will be 0
        if ((n & bitMask) == 0) {   //bitmask ith position value only can o or 1, rest them always will be 0 beacuse of and(&)
            return 0;
        } else {
            return 1;
        }
    }

//  set I'th Bit 1
//  i-th bit of n is set to 1 using a bitwise OR with a mask.
    int setIthBit(int n, int i) {
        int bitMask = 1 << i;
        return (bitMask | n);
    }

//    clear ith bit (sets it to 0)
//    i-th bit of n is cleared to 0 
    int clearIthBit(int n, int i) {
        int bitMask = ~(1 << i);

        return n & bitMask;
    }

    int updateItnBit(int n, int i, int newBit) {
//        if (newBit == 0) {
//            return clearIthBit(n, i);
//        } else {
//            return setIthBit(n, i);
//        }
        n = clearIthBit(n, i);
        int BitMask = newBit << i;
        return n | BitMask;
    }
// use 0 for those need clear, use 1 those not to clear

    int clearLastIthBit(int n, int i) {
        int bitMask = (~0) << i;
        return n & bitMask;
    }

    int clearEangOfBits(int n, int i, int j) {
        int a = ~((~0) << (i));
        int b = ((~0) << (j + 1));
        int bitMask = a | b;

        return n & bitMask;
    }
//    n is power of two?
//  n power have only 1, rest of them is 0
//  n & n-1 is 0 always

    boolean isPowerOfTwo(int n) {
        return (n & n - 1) == 0;
    }
//    Count set bits in a Number
//    set pit is 1
//    time complexity is O(logn), because n number hase logn number of bits

    int countSetBits(int n) {
        int count = 0;
        while (n > 0) {
            if ((n & 1) != 0) { //check LSB
                count++;
            }
            n = n >> 1;     // remove last bit from n
        }
        return count;
    }

//    Fast Exponentiation
//    a power of n in O(log(n))
    int fastExpo(int a, int n) {
        int ans = 1;
        while (n > 0) {
            if ((n & 1) != 0) { // check LSB
                ans *= a;
            }
            a *= a;
            n = n >> 1;
        }
        return ans;
    }
}
