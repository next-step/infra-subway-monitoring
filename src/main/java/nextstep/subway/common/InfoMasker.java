package nextstep.subway.common;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InfoMasker {
    private static final Pattern PATTERN = Pattern.compile("\\b(\\S+)+@(\\S+.\\S+)");

    public static String getMaskedEmail(String email) {
        Matcher matcher = PATTERN.matcher(email);
        if (matcher.find()) {
            String id = matcher.group(1); // 마스킹 처리할 부분인 userId
            int length = id.length();
            if (length < 3) {
                char[] c = new char[length];
                Arrays.fill(c, '*');
                return email.replace(id, String.valueOf(c));
            } else if (length == 3) {
                return email.replaceAll("\\b(\\S+)[^@][^@]+@(\\S+)", "$1**@$2");
            } else {
                return email.replaceAll("\\b(\\S+)[^@][^@][^@]+@(\\S+)", "$1***@$2");
            }
        }
        return email;
    }

    public static String getMaskedPassword(String password) {
        return password.replaceAll(".", "*");
    }

}
