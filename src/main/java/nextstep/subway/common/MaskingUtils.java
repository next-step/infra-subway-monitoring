package nextstep.subway.common;

public class MaskingUtils {

    private static final String EMAIL_PATTERN = "([\\w.])(?:[\\w.]*)(@.*)";

    private MaskingUtils() {
    }

    public static String maskEmail(String email) {
        return email.replaceAll(EMAIL_PATTERN, "$1****$2");
    }
}
