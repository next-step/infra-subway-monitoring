package nextstep.subway.map.dto;

import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

public class PathResponseAssembler {

    private static final Logger log = LoggerFactory.getLogger("file");

    public static PathResponse assemble(SubwayPath subwayPath) {
        List<StationResponse> stationResponses = subwayPath.getStations().stream()
                .map(StationResponse::of)
                .collect(Collectors.toList());

        int distance = subwayPath.calculateDistance();
        log.debug("path:{}, distance:{}",
                stationResponses.stream()
                        .map(StationResponse::getName)
                        .collect(Collectors.joining(",")),
                distance);
        return new PathResponse(stationResponses, distance);
    }

    private PathResponseAssembler() {
    }
}
