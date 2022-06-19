package nextstep.subway.map.application;

import nextstep.subway.aop.Logging;
import nextstep.subway.line.application.LineService;
import nextstep.subway.line.domain.Line;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.map.dto.PathResponseAssembler;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;

@Service
@Transactional
public class MapService {
    private LineService lineService;
    private StationService stationService;
    private PathService pathService;

    private static final Logger log = LoggerFactory.getLogger("json");

    public MapService(LineService lineService, StationService stationService, PathService pathService) {
        this.lineService = lineService;
        this.stationService = stationService;
        this.pathService = pathService;
    }

    @Logging
    public PathResponse findPath(Long source, Long target) {
        List<Line> lines = lineService.findLines();
        Station sourceStation = stationService.findById(source);
        Station targetStation = stationService.findById(target);
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);

        log.info("find Shortest Path: {}, {}, {}, {} ",
            kv("departureStation", sourceStation.getName()),
            kv("arrivalStation", targetStation.getName()),
            kv("distance", subwayPath.calculateDistance()),
            kv("paths", subwayPath.getStationNames())
        );

        return PathResponseAssembler.assemble(subwayPath);
    }
}
