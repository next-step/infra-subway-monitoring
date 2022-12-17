package nextstep.subway.utils;

public class MaskingUtil {
    public static String maskingEmail(String email) {
        String emailId = email.split("@")[0];
        String emailAddress = email.split("@")[1];
        String maskingTarget = emailId.substring((emailId.length() / 2));
        String maskingCharacter = "";
        for(int i=0; i<maskingTarget.length(); i++){
            maskingCharacter += "*";
        }
        return emailId.replace(maskingTarget, maskingCharacter) + "@" + emailAddress;
    }
}
