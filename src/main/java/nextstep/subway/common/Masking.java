package nextstep.subway.common;


public class Masking {

    private static int MAX_DISPLAY_LENGTH = 20;

    private Masking() {
    }

    public static String mask(String value, int displayCount) {
        final StringBuilder result = new StringBuilder(value.substring(0, displayCount));
        for (int i = displayCount; i < getLastIndex(value.length()); i++) {
            result.append('*');
        }
        return result.toString();
    }

    private static int getLastIndex(int length) {
        return Math.min(length, MAX_DISPLAY_LENGTH);
    }
}
