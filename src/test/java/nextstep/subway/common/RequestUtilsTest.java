package nextstep.subway.common;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import java.io.UnsupportedEncodingException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;

class RequestUtilsTest {


    @Test
    void GET_파라미터_로그확인() {
        // given
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        mockHttpServletRequest.setParameter("name", "일호선");
        mockHttpServletRequest.setParameter("color", "red");

        // when
        String param = RequestUtils.toParam(mockHttpServletRequest);

        assertThat(param).isEqualTo("[    name] => [  일호선]\n[   color] => [  red]");
    }

    @Test
    void POST_파라미터_로그확인() throws UnsupportedEncodingException {
        // given
        MockHttpServletRequest mockHttpServletRequest = new MockHttpServletRequest();
        byte[] bytes = "{\"name\":\"1호선\",\"color\":\"red\"}".getBytes();
        mockHttpServletRequest.setCharacterEncoding("UTF-8");
        mockHttpServletRequest.setContent(bytes);
        String contentAsString = mockHttpServletRequest.getContentAsString();
        Assertions.assertThat(contentAsString).isEqualTo("{\"name\":\"1호선\",\"color\":\"red\"}");
    }
}