package nextstep.subway.map.application;

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

import java.util.List;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Service
@Transactional
public class MapService {
    private static final Logger log = LoggerFactory.getLogger(MapService.class);
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private LineService lineService;
    private StationService stationService;
    private PathService pathService;

    public MapService(LineService lineService, StationService stationService, PathService pathService) {
        this.lineService = lineService;
        this.stationService = stationService;
        this.pathService = pathService;
    }

    public PathResponse findPath(Long source, Long target) {
        List<Line> lines = lineService.findLines();
        Station sourceStation = stationService.findById(source);
        Station targetStation = stationService.findById(target);
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);

        log.info("Find paths {} to {}, see subway-json.log for more information",
                sourceStation.getName(), targetStation.getName());
        jsonLogger.info("{}, {}, {}, {}",
                kv("출발지", sourceStation.getName()),
                kv("도착지", targetStation.getName()),
                kv("경유역", subwayPath.getStations()),
                kv("거리", subwayPath.calculateDistance())
        );
        return PathResponseAssembler.assemble(subwayPath);
    }
}
