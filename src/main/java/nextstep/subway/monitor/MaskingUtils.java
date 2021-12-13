package nextstep.subway.monitor;

public class MaskingUtils {
    private static final String MASKING = "*";
    private static final double MASKING_PERCENT = 0.7;

    private MaskingUtils() {
    }

    public static String masking(String text) {
        final int length = text.length();
        final int maskingLength = (int) (length * MASKING_PERCENT);
        final StringBuilder builder = new StringBuilder(text.substring(0, length - maskingLength));
        for (int i = 0; i < maskingLength; i++) {
            builder.append(MASKING);
        }
        return builder.toString();
    }
}
