package nextstep.subway.monitor;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class MaskingUtilsTest {

    @Test
    void masking() {
        // given
        final String text = "1111111111";
        // when
        final String masking = MaskingUtils.masking(text);
        // then
        assertThat(masking).isEqualTo("1111******");
    }
}