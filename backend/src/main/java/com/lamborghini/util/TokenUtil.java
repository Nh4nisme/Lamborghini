package com.lamborghini.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.HexFormat;



public final class TokenUtil {

    // tạo sinh số ngẫu nhiên an toàn về mặt mã
    private static final SecureRandom RANDOM = new SecureRandom();

    private TokenUtil() {}

    // static để dễ dàng sử dụng mà không cần khai báo gì nhiều
    public static String taoToken() {
        byte[] b = new byte[32]; // tạo mảng gồm 32 byte;
        RANDOM.nextBytes(b); // sinh dữ liệu ngẫu nhiên và ghi đè cho 32 phần tử vd: [-12, 25, 36, 42, ...]
        return Base64.getUrlEncoder() // tạo bộ mã hóa Base64 tương thích url
                .withoutPadding() //  với withoutPadding để không thêm ký tự vào cuối kết quả
                .encodeToString(b);  // còn encodeToString dùng để chuyển 32 byte thành chuỗi Base64

    }

    public static String hamBam(String token) {
        try {
            return HexFormat.of().formatHex( // để chuyển mảng byte trở về chuỗi Hex gồm 64 ký tự
                    MessageDigest.getInstance("SHA-256").digest(token.getBytes(StandardCharsets.UTF_8)));   //token.getByte để chuyển chuỗi được truyền vào thành mảng byte UTF_8 (SHA chỉ xử lý được dữ liệu dạng byte chứ khoong String trực tiếp được)
                                                                // digest để đưa mảng byte vào SHA để thực hiện băm - kết quả trả về là một mảng byte[]
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }


}
