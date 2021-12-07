package nextstep.subway.common;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class TraceIdTest {

    @Test
    void 트레이스추적_아이디_생성() {
        TraceId traceId = TraceId.of();

        assertThat(traceId).isNotNull();
        assertThat(traceId.toString().length()).isEqualTo(8);
    }
}