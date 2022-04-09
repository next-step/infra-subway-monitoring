package nextstep.subway.config;

import groovy.util.logging.Slf4j;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;

import static nextstep.subway.config.WebMvcConfig.PREFIX_STATIC_RESOURCES;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Slf4j
public class StaticResourceTest {

    @LocalServerPort
    int port;

    @BeforeEach
    void setUp() {
        if (RestAssured.port == RestAssured.UNDEFINED_PORT) {
            RestAssured.port = port;
        }
    }

    @DisplayName("no-cache, private 테스트")
    @Test
    void javaScript_테스트() {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .when()
                .get(PREFIX_STATIC_RESOURCES + "/js/main.js")
                .then().log().headers()
                .extract();
        assertThat(response.header("Cache-Control")).contains("no-cache", "private");
        assertThat(response.header("ETag")).isNotNull();
    }

    @DisplayName("Etag, Cache 테스트")
    void css_테스트() {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .when()
                .get(PREFIX_STATIC_RESOURCES + "/css/article.css")
                .then().log().headers()
                .extract();

        assertThat(response.header("Cache-Control")).contains("max-age=365");
        assertThat(response.header("ETag")).isNotNull();
    }

}