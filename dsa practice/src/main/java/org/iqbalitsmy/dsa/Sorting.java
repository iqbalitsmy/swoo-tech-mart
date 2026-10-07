/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class Sorting {

    void callFun() {
        int arr[] = {5, 4, 1, 3, 2, 4, 4, 55};
//        bubbleSort(arr);
//        selectionSort(arr);
//        insertionSort(arr);
//        countingSort(arr);
//        margeSort(arr, 0, arr.length - 1);
//        quickSort(arr, 0, arr.length - 1);
        int roatedArr[] = {10, 12, 15, 1, 2, 3};
        System.out.println(roatedArray(roatedArr, 3, 0, roatedArr.length - 1));

        for (int i = 0; i < arr.length; i++) {
            System.out.print(" " + arr[i]);
        }
    }
    //    best case and worst case time same complexity O(n^2)
    void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    
//    best case O(n) and worst case time complexity O(n^2)
    void modifiedBubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            boolean swaped = false;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swaped = true;
                }
            }
            if (false == swaped) {
                break;
            }
        }
    }

// first select the minimum value index, than swape value
    void selectionSort(int arr[]) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minValue = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[minValue] > arr[j]) {
                    minValue = j;
                }
            }
            int temp = arr[minValue];
            arr[minValue] = arr[i];
            arr[i] = temp;
        }
    }
//  pick an element from unsorted part and place int the right pos in sort part
//    example of card

    void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
//            cary the corrent value
            int cur = arr[i];
            int prev = i - 1;
//            iterate loop based on prev
//            from sorted part
            while (prev >= 0 && cur < arr[prev]) {
                arr[prev + 1] = arr[prev];
                prev--;
            }
//            after break the loop prev always less one
            arr[prev + 1] = cur;
        }
    }
//     time comlexity O(n+k)
//    space comlexity O(n+k)
//    "n" is the number of elements in the input array and "k" is the range of possible

    void countingSort(int[] arr) {
//        fid the largest value
        int largest = Integer.MIN_VALUE;
        for (int i = 0; i < arr.length; i++) {
            largest = Math.max(largest, arr[i]);
        }
        int[] counter = new int[largest + 1];
//        count frequency of number in number index
        for (int i = 0; i < arr.length; i++) {
            counter[arr[i]] += 1;
        }
        int j = 0;
        for (int i = 0; i < counter.length; i++) {
            while (counter[i] != 0) {
                arr[j] = i;
                j++;
                counter[i]--;
            }
        }
    }

//    Marge sort
//    tc O(nlog(n)) sc O(n)
    void margeSort(int arr[], int si, int ei) {
        if (si >= ei) {
            return;
        }
        int mid = si + (ei - si) / 2;

        margeSort(arr, si, mid);
        margeSort(arr, mid + 1, ei);

        conquer(arr, si, ei, mid);
    }
//  conquer

    void conquer(int arr[], int si, int ei, int mid) {
        int temp[] = new int[ei - si + 1];
        int i = si, j = mid + 1, k = 0;

//        compare and add in temporary veriable
        while (i <= mid && j <= ei) {
            if (arr[i] < arr[j]) {
                temp[k] = arr[i];
                i++;
            } else {
                temp[k] = arr[j];
                j++;
            }
            k++;
        }

//        if element have in left part
        while (i <= mid) {
            temp[k++] = arr[i++];
        }
//        if element have in right part
        while (j <= ei) {
            temp[k++] = arr[j++];
        }

//        copy all from temp to main array
        for (k = 0, i = si; k < temp.length; k++, i++) {
            arr[i] = temp[k];
        }
    }
//  TC average case O(nlog(n)) wors case O(n^2), SC O(1)
//  Worst case occurs when pivot is always the smallest or the largest element.

    void quickSort(int arr[], int si, int ei) {
        if (si >= ei) {
            return;
        }
        int pIdx = partition(arr, si, ei);

        quickSort(arr, si, pIdx - 1); //left
        quickSort(arr, pIdx + 1, ei); //right
    }

    int partition(int[] arr, int si, int ei) {
        int pivot = arr[ei];
        int i = si - 1;

        for (int j = si; j < ei; j++) {
            if (arr[j] <= pivot) {
                i++;
//                swap
                int temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
        i++;
        arr[ei] = arr[i];
        arr[i] = pivot;

        return i;
    }

//    find in roteted array
//    TC O(nlog(n))
    int roatedArray(int arr[], int tar, int si, int ei) {
//        base case
        if (si > ei) {
            return -1;
        }
//        find mid
        int mid = si + (ei - si) / 2;
        if (arr[mid] == tar) {
            return mid;
        }
//        mid in Lin 1 
        if (arr[si] <= arr[mid]) {
//            target in left in line 1
            if (arr[si] <= tar && tar <= arr[mid]) {
                return roatedArray(arr, tar, si, mid - 1);
            } else {
//            target in right in line 1
                return roatedArray(arr, tar, mid + 1, ei);
            }
//            mid in line 2
        } else {
//            target in right of line 2
            if (arr[mid] <= tar && tar <= arr[ei]) {
                return roatedArray(arr, tar, mid + 1, ei);
            } else {
//            target in left of line 2
                return roatedArray(arr, tar, si, mid - 1);
            }
        }
    }
}
