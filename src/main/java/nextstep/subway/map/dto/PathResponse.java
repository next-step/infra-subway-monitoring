package nextstep.subway.map.dto;

import nextstep.subway.station.dto.StationResponse;

import java.util.List;

public class PathResponse {
    private List<StationResponse> stations;
    private int distance;

    public PathResponse() {
    }

    public PathResponse(List<StationResponse> stations, int distance) {
        this.stations = stations;
        this.distance = distance;
    }

    public List<StationResponse> getStations() {
        return stations;
    }

    public int getDistance() {
        return distance;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("PathResponse{");
        sb.append("stations=").append(stations);
        sb.append(", distance=").append(distance);
        sb.append('}');
        return sb.toString();
    }
}
