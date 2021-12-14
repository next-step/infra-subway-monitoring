package nextstep.subway.masking;

import com.fasterxml.jackson.core.JsonStreamContext;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;
import net.logstash.logback.mask.ValueMasker;

public class SensitiveMaskingPatternLayout implements ValueMasker {

    private Pattern multilinePattern = Pattern.compile("\\\"password\\\"\\s*:\\s*\\\"(.*?)\\\"",
        Pattern.MULTILINE);

    private List<String> maskPatterns = new ArrayList<>();

    private String maskMessage(String message) {

        StringBuilder sb = new StringBuilder(message);
        Matcher matcher = multilinePattern.matcher(sb);
        while (matcher.find()) {
            IntStream.rangeClosed(1, matcher.groupCount()).forEach(group -> {
                if (matcher.group(group) != null) {
                    IntStream.range(matcher.start(group), matcher.end(group))
                        .forEach(i -> sb.setCharAt(i, 'x'));
                }
            });
        }
        return sb.toString();
    }

    @Override
    public Object mask(JsonStreamContext context, Object value) {
        if (value instanceof CharSequence) {
            return maskMessage((String) value);
        }
        return value;
    }
}
