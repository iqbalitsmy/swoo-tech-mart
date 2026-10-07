/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class TrieP {

    Node root = new Node();

    NodePrefix rootPrefix = new NodePrefix();

    String ans = "";    //longest word

    void call() {
//        String words[] = {"i", "like", "sam", "samsung", "mobile", "ice"};
//        for (int i = 0; i < words.length; i++) {
//            insert(words[i]);
//        }

//        System.out.println(search("sam"));
//        System.out.println(wordBreak("ilikesamsung"));
//        System.out.println(startsWith("samsung"));
//        System.out.println(countUniqeSubstring("apple"));
        rootPrefix.freq = -1;

//        String words[] = {"zebra", "dog", "duck", "dove"};
//
//        for (int i = 0; i < words.length; i++) {
//            insertPrefix(words[i]);
//        }
//        findPrefix(rootPrefix, "");
        String words[] = {"a", "banana", "app", "appl", "ap", "apply"};

        for (int i = 0; i < words.length; i++) {
            insert(words[i]);
        }

        longestWord(root, new StringBuilder(""));

        System.out.println("Ans: " + ans);
    }

    class Node {

        Node children[] = new Node[26];
        boolean eow = false;    //end of word

        Node() {
            for (int i = 0; i < 26; i++) {
                children[i] = null;
            }
        }
    }

    void insert(String word) {  //TC O(L) ->L largest word (L is level of tree)
        Node curr = root;
        for (int level = 0; level < word.length(); level++) {
            int idx = word.charAt(level) - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.eow = true;
    }

    boolean search(String word) {   //TC O(L) ->L largest word (L is level of tree)
        Node curr = root;

        for (int level = 0; level < word.length(); level++) {
            int idx = word.charAt(level) - 'a';
            if (curr.children[idx] == null) {
                return false;
            }
            curr = curr.children[idx];
        }
        return curr.eow;
    }

    //word break
    boolean wordBreak(String key) { //TC O(L) ->L largest word (L is level of tree)
        if (key.length() == 0) {
            return true;
        }

        for (int i = 1; i <= key.length(); i++) {
            if (search(key.substring(0, i)) && wordBreak(key.substring(i))) {
                return true;
            }
        }
        return false;
    }

    /*Prefix Problem
    Find shortest unique prefix for every word in a given list.
    Assume no word is prefix of another.
    arr[] = {"zebra", "dog", "duck", "dove"}
    ans = ("z", "dog", "du", "dov"}
     */
    class NodePrefix {

        NodePrefix[] children = new NodePrefix[26];
        boolean eow = false;
        int freq;

        public NodePrefix() {
            for (int i = 0; i < 26; i++) {
                children[i] = null;
            }
            freq = 1;
        }
    }

    void insertPrefix(String word) {    //TC O(L) ->L largest word (L is level of tree)
        NodePrefix curr = rootPrefix;
        for (int level = 0; level < word.length(); level++) {
            int idx = word.charAt(level) - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new NodePrefix();
            } else {
                curr.children[idx].freq++;
            }
            curr = curr.children[idx];
        }
        curr.eow = true;
    }

    void findPrefix(NodePrefix root, String ans) {  //TC O(L) ->L largest word (L is level of tree)
        if (root == null) {
            return;
        }

        if (root.freq == 1) {
            System.out.println(ans);
            return;
        }

        for (int i = 0; i < root.children.length; i++) {
            if (root.children[i] != null) {
                findPrefix(root.children[i], ans + (char) (i + 'a'));
            }
        }
    }

    /*startsWith Problem
    Create a function boolean startsWith(String prefix) for a trie.
    Returns true if there is a previously inserted string word that has the prefix otherwise. true, and false
    words[] = {"apple", "app", "mango", "man", "woman")
    prefix = "app"
    output: true
    prefix = "moon"
    output: false
     */
    boolean startsWith(String prefix) {  //TC O(L) ->L largest word (L is level of tree)
        Node curr = root;

        for (int i = 0; i < prefix.length(); i++) {
            int idx = prefix.charAt(i) - 'a';
            if (curr.children[idx] == null) {
                return false;
            }
            curr = curr.children[idx];
        }

        return true;
    }

    /*Count Unique Substrings
    Given a string of length n of lowercase alphabet characters, we need to count total number of distinct substrings of this string.
    str = "ababa"
    ans = 10
    iqbalitsmy@gmail.com
     */
    //uniqe sub-strings = all uniqe prefix of all uniqe suffix
    int countUniqeSubstring(String str) {
        for (int i = 0; i < str.length(); i++) {
            insert(str.substring(i));
        }
        return countNode(root);
    }

    int countNode(Node root) {
        if (root == null) {
            return 0;
        }

        int count = 0;
        for (int i = 0; i < root.children.length; i++) {
            if (root.children[i] != null) {
                count += countNode(root.children[i]);
            }
        }

        return count + 1;
    }

    /*Longest Word with all Prefixes
    Find the longest string in words such that every prefix of it is also in words.
    words = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
    ans = "apple"
     */
    void longestWord(Node root, StringBuilder temp) {
        if (root == null) {
            return;
        }

        for (int i = 0; i < 26; i++) {
            if (root.children[i] != null && root.children[i].eow == true) {
                char ch = (char) (i + 'a');
                temp.append(ch);

                if (temp.length() > ans.length()) {
                    ans = temp.toString();
                }
                longestWord(root.children[i], temp);
                temp.deleteCharAt(temp.length() - 1);   //backtracking
            }
        }
    }

}
