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
        return "SectionRequest{" +
                "upStationId=" + upStationId +
                ", downStationId=" + downStationId +
                ", distance=" + distance +
                '}';
    }
}
