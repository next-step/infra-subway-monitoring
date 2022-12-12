package nextstep.subway.map.dto;

import java.util.List;
import java.util.stream.Collectors;

import nextstep.subway.station.dto.StationResponse;

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

    public List<String> toStationsName() {
        return getStations().stream().map(StationResponse::getName).collect(Collectors.toList());
    }
}
