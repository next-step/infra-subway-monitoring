package nextstep.subway.map.dto;

import java.util.stream.Collectors;
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
        List<Long> stationIds = null;
        if (stations != null) {
            stationIds = stations.stream()
                .map(StationResponse::getId)
                .collect(Collectors.toList());
        }
        return "PathResponse{" +
            "stationIds=" + stationIds +
            ", distance=" + distance +
            '}';
    }
}
