package com.lamborghini.util;

import java.security.SecureRandom;

public class MaChiaSeUtil {


    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int LENGTH = 6;

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String taoMaChiaSe() {
        StringBuilder ma = new StringBuilder(LENGTH);

        for(int i = 0; i < LENGTH; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            ma.append(CHARACTERS.charAt(index));
        }
        return ma.toString();
    }


}
