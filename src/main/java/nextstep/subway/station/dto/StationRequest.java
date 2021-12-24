package nextstep.subway.station.dto;

import nextstep.subway.station.domain.Station;

public class StationRequest {
    private String name;

    public String getName() {
        return name;
    }

    public Station toStation() {
        return new Station(name);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("StationRequest{");
        sb.append("name='").append(name).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
