package nextstep.subway.common;

public class MaskingUtil {

    private static final int MASKING_CHARACTER_LIMIT = 3;

    public static String maskingAll(String password) {
        return password.replaceAll(".", "*");
    }

    // abc***@***.****
    public static String maskingExceptFirst3(String email) {
        return email.substring(0, MASKING_CHARACTER_LIMIT)
            + email.substring(MASKING_CHARACTER_LIMIT)
            .replaceAll("[^@.]", "*");
    }

}
