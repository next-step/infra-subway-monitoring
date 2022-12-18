package nextstep.subway.common;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MaskingUtils {

    private static final String MASK_EMAIL_PATTERN = "\\b(\\S+)+@(\\S+.\\S+)";
    private static final String MASK_EMAIL_ID_3_PATTERN = "\\b(\\S+)[^@][^@]+@(\\S+)";
    private static final String MASK_EMAIL_ID_MORE_PATTERN = "\\b(\\S+)[^@][^@][^@]+@(\\S+)";

    /**
     * 이메일 주소 마스킹 처리
     */
    public static String getMaskedEmail(String email) {
        /*
         * 요구되는 메일 포맷
         * {userId}@domain.com
         * */
        Matcher matcher = Pattern.compile(MASK_EMAIL_PATTERN).matcher(email);
        if (matcher.find()) {
            String id = matcher.group(1); // 마스킹 처리할 부분인 userId
            /*
             * userId의 길이를 기준으로 세글자 초과인 경우 뒤 세자리를 마스킹 처리하고,
             * 세글자인 경우 뒤 두글자만 마스킹,
             * 세글자 미만인 경우 모두 마스킹 처리
             */
            int length = id.length();
            if (length < 3) {
                char[] c = new char[length];
                Arrays.fill(c, '*');
                return email.replace(id, String.valueOf(c));
            } else if (length == 3) {
                return email.replaceAll(MASK_EMAIL_ID_3_PATTERN, "$1**@$2");
            } else {
                return email.replaceAll(MASK_EMAIL_ID_MORE_PATTERN, "$1***@$2");
            }
        }
        return email;
    }
}
