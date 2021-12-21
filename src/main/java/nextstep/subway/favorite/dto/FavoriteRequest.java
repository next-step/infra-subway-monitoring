package nextstep.subway.favorite.dto;

public class FavoriteRequest {
    private Long source;
    private Long target;

    public FavoriteRequest() {
    }

    public FavoriteRequest(Long source, Long target) {
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
        final StringBuilder sb = new StringBuilder("FavoriteRequest{");
        sb.append("source=").append(source);
        sb.append(", target=").append(target);
        sb.append('}');
        return sb.toString();
    }
}
