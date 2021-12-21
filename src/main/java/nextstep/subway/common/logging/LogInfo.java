package nextstep.subway.common.logging;

import java.util.Map;

public class LogInfo {
    private ServletType type;
    private String method;
    private String path;
    private Map<String, String> headers;
    private Map<String, String> parameters;
    private Object body;

    private LogInfo() {}

    public static LogInfoBuilder builder() {
        return new LogInfoBuilder();
    }

    public static final class LogInfoBuilder {
        private ServletType type;
        private String method;
        private String path;
        private Map<String, String> headers;
        private Map<String, String> parameters;
        private Object body;

        private LogInfoBuilder() {
        }

        public LogInfoBuilder type(ServletType type) {
            this.type = type;
            return this;
        }

        public LogInfoBuilder method(String method) {
            this.method = method;
            return this;
        }

        public LogInfoBuilder path(String path) {
            this.path = path;
            return this;
        }

        public LogInfoBuilder headers(Map<String, String> headers) {
            this.headers = headers;
            return this;
        }

        public LogInfoBuilder parameters(Map<String, String> parameters) {
            this.parameters = parameters;
            return this;
        }

        public LogInfoBuilder body(Object body) {
            this.body = body;
            return this;
        }

        public LogInfo build() {
            LogInfo logInfo = new LogInfo();
            logInfo.body = this.body;
            logInfo.path = this.path;
            logInfo.parameters = this.parameters;
            logInfo.headers = this.headers;
            logInfo.type = this.type;
            logInfo.method = this.method;
            return logInfo;
        }
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("LogInfo{");
        sb.append("type=").append(type.name());
        sb.append(", method='").append(method).append('\'');
        sb.append(", path='").append(path).append('\'');
        sb.append(", headers=").append(headers);
        if (parameters != null) {
            sb.append(", parameters=").append(parameters);
        }
        if (body != null) {
            sb.append(", body=").append(body);
        }
        sb.append('}');
        return sb.toString();
    }
}
