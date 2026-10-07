package com.mycompany.dsa;

public class Revision {
	void call() {
		primeNumber(5);
		halfPyramid();
		charPyramid();
		binnaryDecimal(111);
	}

	void primeNumber(int n) {
		if (n <= 2 && 0 < n) {
			System.out.println("Prime");
			return;
		}

		for (int i = 2; i <= Math.sqrt(n); i++) {
			if (n % i == 0) {
				System.out.println("Not Prime");
				return;
			}
		}

		System.out.println("Prime");
		return;
	}

	// half pyramid pattern
	void halfPyramid() {
		for (int i = 0; i < 4; i++) {
			for (int j = 0; j <= i; j++) {
				System.out.print(j + 1);
			}
			System.out.println();
		}
	}

	void charPyramid() {
		char alphabet = 'A';
		for (int i = 0; i < 4; i++) {
			for (int j = 0; j <= i; j++) {
				System.out.print(alphabet++);
			}
			System.out.println();
		}
	}

	void binnaryDecimal(int bin) {
		int pow = 0;
		int dec = 0;

		while (bin > 0) {
			int lastDegit = bin % 10;
			dec = dec + (lastDegit * (int) Math.pow(2, pow));
			pow++;
			bin = bin / 10;
		}

		System.out.println("Decimal: " + dec);
	}

}
