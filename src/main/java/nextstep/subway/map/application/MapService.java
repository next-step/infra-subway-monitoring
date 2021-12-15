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

@Service
@Transactional
public class MapService {
    private final LineService lineService;
    private final StationService stationService;
    private final PathService pathService;
    private static final Logger pathLogger = LoggerFactory.getLogger("path");

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
        pathLogger.info("경로가 조회되었습니다. 출발 : {0}, 도착 : {1}", source, target);
        return PathResponseAssembler.assemble(subwayPath);
    }
}
