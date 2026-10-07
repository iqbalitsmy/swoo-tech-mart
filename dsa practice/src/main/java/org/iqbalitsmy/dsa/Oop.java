/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.dsa;

/**
 *
 * @author AORUS
 */
public class Oop {

    void call() {
        Fish fish = new Fish();
        fish.setColor("Yellow");
        fish.printColor();
        fish.canWalk();
    }

}

abstract class Animal {

    private String color;

    void setColor(String color) {
        this.color = color;
    }

    String getColor() {
        return color;
    }

    abstract void canWalk();
}

class Fish extends Animal {

    void printColor() {
        System.out.println(getColor());
    }

    @Override
    void canWalk() {
        System.out.println("Can walk");
    }
}
