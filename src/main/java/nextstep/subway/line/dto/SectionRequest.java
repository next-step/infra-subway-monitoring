package nextstep.subway.line.dto;

public class SectionRequest {
    private Long upStationId;
    private Long downStationId;
    private int distance;

    private SectionRequest() {
    }

    public Long getUpStationId() {
        return upStationId;
    }

    public Long getDownStationId() {
        return downStationId;
    }

    public int getDistance() {
        return distance;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("SectionRequest{");
        sb.append("upStationId=").append(upStationId);
        sb.append(", downStationId=").append(downStationId);
        sb.append(", distance=").append(distance);
        sb.append('}');
        return sb.toString();
    }
}
