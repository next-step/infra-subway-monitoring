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
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    private LineService lineService;
    private StationService stationService;
    private PathService pathService;

    public MapService(LineService lineService, StationService stationService, PathService pathService) {
        this.lineService = lineService;
        this.stationService = stationService;
        this.pathService = pathService;
    }

    public PathResponse findPath(Long source, Long target) {
        fileLogger.info("[MapService][findPath][Before:findLines]");
        List<Line> lines = lineService.findLines();
        fileLogger.info("[MapService][findPath][Before:findById(source)]");
        Station sourceStation = stationService.findById(source);
        fileLogger.info("[MapService][findPath][Before:findById(target)]");
        Station targetStation = stationService.findById(target);
        fileLogger.info("[MapService][findPath][Before:findPath]");
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);
        fileLogger.info("[MapService][findPath][Before:return]");
        return PathResponseAssembler.assemble(subwayPath);
    }
}
