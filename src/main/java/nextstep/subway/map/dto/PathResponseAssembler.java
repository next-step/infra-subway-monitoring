package nextstep.subway.map.dto;

import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.dto.StationResponse;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PathResponseAssembler {
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger("file");

    public static PathResponse assemble(SubwayPath subwayPath) {
        FILE_LOGGER.info("PathResponseAssembler.assemble started. subwayPath: {}", subwayPath);

        List<StationResponse> stationResponses = subwayPath.getStations().stream()
                .map(StationResponse::of)
                .collect(Collectors.toList());

        int distance = subwayPath.calculateDistance();

        return new PathResponse(stationResponses, distance);
    }

    private PathResponseAssembler() {
    }
}
