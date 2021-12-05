package nextstep.subway.common;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Mask {
    private static final String EMAIL_REGULAR_EXPRESS = "^(..)(.*)@(.*)$";

    private Mask() {
    }

    public static String displayEmailMasking(String email) {
        String changedEmail = email;
        Matcher matcher = Pattern.compile(EMAIL_REGULAR_EXPRESS).matcher(email);
        if (matcher.find()) {
            char[] c = new char[matcher.group(2).length()];
            Arrays.fill(c, '*');
            return email.replaceAll(EMAIL_REGULAR_EXPRESS, "$1" + String.valueOf(c) + "@$3");
        }
        return changedEmail;
    }
}
