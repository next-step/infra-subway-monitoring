package nextstep.subway.map.application;

import nextstep.subway.line.application.LineService;
import nextstep.subway.line.domain.Line;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.map.dto.PathResponseAssembler;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MapService {
    private LineService lineService;
    private StationService stationService;
    private PathService pathService;

    public MapService(LineService lineService, StationService stationService, PathService pathService) {
        this.lineService = lineService;
        this.stationService = stationService;
        this.pathService = pathService;
    }

    @Cacheable(value = "path", key = "{#source, #target}")
    public PathResponse findPath(Long source, Long target) {
        List<Line> lines = lineService.findLines();
        Station sourceStation = stationService.findById(source);
        Station targetStation = stationService.findById(target);
        jsonLogger.info("경로찾기 요청 {} -> {}", 
            StructuredArguments.kv("출발역", sourceStation.getName()), 
            StructuredArguments.kv("도착역", targetStation.getName()));
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);
        jsonLogger.info("경로찾기 성공 {} -> {}",
            StructuredArguments.kv("출발역", sourceStation.getName()),
            StructuredArguments.kv("도착역", targetStation.getName()));
        return PathResponseAssembler.assemble(subwayPath);
    }
}
