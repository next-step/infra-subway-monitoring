package nextstep.subway.map.dto;

import nextstep.subway.station.dto.StationResponse;

import java.util.List;
import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PathResponse that = (PathResponse) o;
        return getDistance() == that.getDistance() && Objects.equals(getStations(), that.getStations());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStations(), getDistance());
    }

    @Override
    public String toString() {
        return "PathResponse{" +
                "stations=" + stations.toString() +
                ", distance=" + distance +
                '}';
    }
}
