package nextstep.subway.map.application;

import nextstep.subway.auth.ui.AuthController;
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
    private static Logger logger = LoggerFactory.getLogger(MapService.class);
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
        logger.info("최단경로 조회 {} -> {}",sourceStation.getName(), targetStation.getName());
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);
        logger.info("최단경로 역들{}",subwayPath.getStations());

        return PathResponseAssembler.assemble(subwayPath);
    }
}
