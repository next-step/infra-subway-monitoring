package nextstep.subway.util;

import org.apache.commons.lang3.StringUtils;

public class MaskingUitls {

    private MaskingUitls() {
        // empty;
    }

    public static String maskEmail(String email) {
        if (StringUtils.isBlank(email)) {
            return StringUtils.EMPTY;
        }

        String emailPart[] = StringUtils.split(email, '@');
        return maskName(emailPart[0]) + "@" + emailPart[1];
    }

    private static String maskName(String name) {
        if (StringUtils.isBlank(name)) {
            return StringUtils.EMPTY;
        }
        return StringUtils.substring(name, 0, 2) + "****";
    }
}
