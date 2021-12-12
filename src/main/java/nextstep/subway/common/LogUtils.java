package nextstep.subway.common;

public class LogUtils {
    private static final int MASKING_BOUNDARY_IDX = 3;

    private LogUtils() {
    }

    public static String maskEmail(final String email) {
        final StringBuilder result = new StringBuilder(email.substring(0, MASKING_BOUNDARY_IDX));
        for (int i = MASKING_BOUNDARY_IDX; i < email.length(); i++) {
            result.append('*');
        }
        return result.toString();
    }
}
