package nextstep.subway.common;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MaskingUtils {
    private final static String EMAIL_REGEX = "\\b(\\S+)+@(\\S+.\\S+)";

    public static String toMaskedEmail(String email) {
        Matcher matcher = Pattern.compile(EMAIL_REGEX).matcher(email);
        if (matcher.find()) {
            String id = matcher.group(1);
            int length = id.length();
            if (length < 3) {
                char[] c = new char[length];
                Arrays.fill(c, '*');
                return email.replace(id, String.valueOf(c));
            }

            return email.replaceAll("\\b(\\S+)[^@][^@][^@]+@(\\S+)", "$1***@$2");
        }

        return email;
    }
}
