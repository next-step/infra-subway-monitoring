package nextstep.subway.common;

import java.util.Objects;

public class SimpleMaskingUtil {

    private static final String MASKING_CHAR = "*";
    private static final double MASKING_RATIO = 0.5;
    private static final int ZERO = 0;

    public static String mask(final String payload) {
        if (Objects.isNull(payload) || payload.isEmpty()) {
            return payload;
        }
        final int maskingStartsAt = (int) (payload.length() * MASKING_RATIO);
        final String unmasked = payload.substring(ZERO, maskingStartsAt);
        final StringBuilder sb = new StringBuilder(unmasked);
        for (int i = maskingStartsAt; i < payload.length(); i++) {
            sb.append(MASKING_CHAR);
        }
        return sb.toString();
    }
}
