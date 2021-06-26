package nextstep.subway.map.application;

import nextstep.subway.line.application.LineService;
import nextstep.subway.line.domain.Line;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.map.dto.PathResponseAssembler;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import nextstep.subway.map.dto.PathRequest;
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

    public PathResponse findPath(PathRequest pathRequest) {
        List<Line> lines = lineService.findLines();
        Station sourceStation = stationService.findById(pathRequest.getSource());
        Station targetStation = stationService.findById(pathRequest.getTarget());
        SubwayPath subwayPath = pathService.findPath(lines, sourceStation, targetStation);

        return PathResponseAssembler.assemble(subwayPath);
    }
}
