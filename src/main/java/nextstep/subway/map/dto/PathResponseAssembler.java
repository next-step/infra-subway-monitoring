package nextstep.subway.map.dto;

import java.util.List;
import java.util.stream.Collectors;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.dto.StationResponse;

public class PathResponseAssembler {

    public static PathResponse assemble(SubwayPath subwayPath) {
        List<StationResponse> stationResponses = subwayPath.getStations().stream()
            .map(StationResponse::of)
            .collect(Collectors.toList());

        int distance = subwayPath.calculateDistance();

        return new PathResponse(stationResponses, distance);
    }

    private PathResponseAssembler() {
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
