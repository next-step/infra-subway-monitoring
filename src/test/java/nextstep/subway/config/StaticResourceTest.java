package nextstep.subway.config;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.CacheControl;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.EntityExchangeResult;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.concurrent.TimeUnit;

import static nextstep.subway.config.WebConfig.PREFIX_STATIC_RESOURCES;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StaticResourceTest {
    private final Logger logger = LoggerFactory.getLogger(StaticResourceTest.class);

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
    void noCachePrivate() {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .when()
                .get(PREFIX_STATIC_RESOURCES + "/js/main.js")
                .then().log().headers()
                .extract();
        assertThat(response.header("Cache-Control")).contains("no-cache","private");
        assertThat(response.header("ETag")).isNotNull();

        ExtractableResponse<Response> response2 = RestAssured
                .given().log().all()
                .when()
                .get(PREFIX_STATIC_RESOURCES + "/css/article.css")
                .then().log().headers()
                .extract();
        assertThat(response2.header("Cache-Control")).contains("max-age=31536000");
        assertThat(response2.header("ETag")).isNotNull();
    }
}
