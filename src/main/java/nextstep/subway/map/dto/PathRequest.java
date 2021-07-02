package nextstep.subway.map.dto;

public class PathRequest {
    private final Long source;
    private final Long target;

    public PathRequest(Long source, Long target) {
        this.source = source;
        this.target = target;
    }

    public Long getSource() {
        return source;
    }

    public Long getTarget() {
        return target;
    }

    @Override
    public String toString() {
        return "PathRequest{" +
                "source=" + source +
                ", target=" + target +
                '}';
    }
}
