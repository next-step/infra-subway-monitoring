package nextstep.subway.common;

public class MaskingUtil {

    public static final String MASKING = "********";

    public static String maskWord(String word, int substringRange){
        return word.substring(0,substringRange) + MASKING;
    }

}
