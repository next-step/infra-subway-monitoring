package nextstep.subway.map.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

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

@Service
@Transactional
public class MapService {
    private static final Logger LOGGER = LoggerFactory.getLogger("json");

    private final LineService lineService;
    private final StationService stationService;
    private final PathService pathService;

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

        findPathLogging(sourceStation, targetStation);
        return PathResponseAssembler.assemble(subwayPath);
    }

    private void findPathLogging(Station sourceStation, Station targetStation) {
        LOGGER.info("[경로 검색] {} {}", kv("출발지", sourceStation), kv("도착지", targetStation));
    }
}
