package nextstep.subway.common.util;

import static nextstep.subway.common.log.Loggers.CONSOLE_LOGGER;
import static nextstep.subway.common.log.Loggers.FILE_LOGGER;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

public class StringUtils extends org.apache.commons.lang3.StringUtils {
    private static ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    static {
        OBJECT_MAPPER.enable(SerializationFeature.INDENT_OUTPUT);
        OBJECT_MAPPER.registerModule(new JavaTimeModule());
        OBJECT_MAPPER.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }

    public static <T> String toSimplifiedIndentedJson(T source) {
        try {
            return OBJECT_MAPPER.writeValueAsString(source);
        } catch (JsonProcessingException e) {
            FILE_LOGGER.error("{}", e.getMessage());
            CONSOLE_LOGGER.error("{}", e.getMessage());
            return "";
        }
    }
}
