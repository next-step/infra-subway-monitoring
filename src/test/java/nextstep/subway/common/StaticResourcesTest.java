package nextstep.subway.common;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.CacheControl;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.reactive.server.WebTestClient;

import static nextstep.subway.common.WebMvcConfig.PREFIX_STATIC_RESOURCES;

@ActiveProfiles("test")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StaticResourcesTest {
    private static final Logger logger = LoggerFactory.getLogger(StaticResourcesTest.class);

    @Autowired
    private WebTestClient client;


    @DisplayName("js no-cache, private 테스트")
    @Test
    void jsNoCachePrivate() {

        String uri = PREFIX_STATIC_RESOURCES + "/js/main.js";
        client.get()
                .uri(uri)
                .exchange()
                .expectHeader()
                .cacheControl(CacheControl.noCache().cachePrivate())
                .expectHeader().exists("ETag");
    }

}