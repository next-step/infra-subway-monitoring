package nextstep.subway.utils;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class MaskingUtilTest {

    @Test
    @DisplayName("email 로깅용 마스킹 테스트")
    void emailMaskingTest(){
        // given
        String email = "byunsw4@naver.com";

        // when
        String result = MaskingUtil.maskingEmail(email);

        // then
        assertThat(result).isEqualTo("byu****@naver.com");
    }
}
