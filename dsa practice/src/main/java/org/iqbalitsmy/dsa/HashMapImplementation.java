/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

import java.util.*;

/**
 *
 * @author AORUS
 */
public class HashMapImplementation {

    void call() {
        HashMap<String, Integer> hm = new HashMap<>();
        hm.put("Bd", 100);
        hm.put("Nepal", 300);
        hm.put("China", 500);
        hm.put("USA", 100);

        ArrayList<String> keys = hm.keySet();

        for (String key : keys) {
            System.out.println(key + " ");
        }

        System.out.println(hm.get("Bd"));
        System.out.println(hm.remove("Bd"));
        System.out.println(hm.get("Bd"));

    }

    class HashMap<K, V> { //<K,V> generic

        private class Node {

            K key;
            V value;

            Node(K key, V value) {
                this.key = key;
                this.value = value;
            }
        }

        private int n;
        private int N;
        private LinkedList<Node> buckets[];

        HashMap() {
            this.N = 4;
            this.buckets = new LinkedList[4];

            for (int i = 0; i < 4; i++) {
                this.buckets[i] = new LinkedList<>();
            }
        }

        private int hasFun(K key) {
            int hc = key.hashCode();

            return Math.abs(hc) % N;
        }

        //data index
        private int searchInLL(K key, int bi) {
            LinkedList<Node> ll = buckets[bi];
            int di = 0;

            for (int i = 0; i < ll.size(); i++) {
                Node get = ll.get(i);
                if (get.key == key) {
                    return di;
                }
                di++;
            }
            return -1;
        }

        private void rehash() {
            LinkedList<Node> oldBuck[] = buckets;
            buckets = new LinkedList[N * 2];
            N = 2 * N;
            for (int i = 0; i < buckets.length; i++) {
                buckets[i] = new LinkedList<>();
            }

            //nodes -> add in buckets
            for (int i = 0; i < oldBuck.length; i++) {
                LinkedList<Node> ll = oldBuck[i];
                for (int j = 0; j < ll.size(); j++) {
                    Node get = ll.remove();
                    put(get.key, get.value);
                }
            }
        }

        void put(K key, V value) {  // TC O(lamda) -> O(1)
            int bi = hasFun(key);   //bucket index
            int di = searchInLL(key, bi); //date index

            if (di != -1) {    //already exist than update the value
                Node node = buckets[bi].get(di);
                node.value = value;
            } else {
                buckets[bi].add(new Node(key, value));
                n++;
            }

            double lamda = (double) n / N;

            if (lamda > 2.00) {
                rehash();
            }
        }

        boolean containKey(K key) { // TC O(lamda) -> O(1)
            int bi = hasFun(key);   //bucket index
            int di = searchInLL(key, bi); //date index

            if (di != -1) {    //already exist
                return true;
            } else {
                return false;
            }
        }

        public V get(K key) {  // TC O(lamda) -> O(1)
            int bi = hasFun(key);   //bucket index
            int di = searchInLL(key, bi); //date index

            if (di != -1) {    //already exist
                Node node = buckets[bi].get(di);
                return node.value;
            } else {
                return null;
            }
        }

        public V remove(K key) {   // TC O(lamda) -> O(1)
            int bi = hasFun(key);   //bucket index
            int di = searchInLL(key, bi); //date index

            if (di != -1) {    //already exist than remove
                Node node = buckets[bi].remove(di);
                n--;
                return node.value;
            } else {
                return null;
            }
        }

        public ArrayList<K> keySet() {
            ArrayList<K> keys = new ArrayList<>();

            for (int i = 0; i < buckets.length; i++) {
                LinkedList<Node> ll = buckets[i];
                for (Node node : ll) {
                    keys.add(node.key);
                }
            }

            return keys;
        }

        public boolean isEmpty() {
            return n == 0;
        }

    }
}
