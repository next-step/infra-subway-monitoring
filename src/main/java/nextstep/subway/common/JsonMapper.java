package nextstep.subway.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class JsonMapper {
    private static final Logger log = LoggerFactory.getLogger("file");
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String objectToJson(Object object) {
        String result = null;
        try {
            result = objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage());
        }
        return result;
    }
}
