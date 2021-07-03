package nextstep.subway.map.dto;

public class PathRequest {
    private Long source;
    private Long target;

    private PathRequest() {

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
