package nextstep.subway.map.ui;

import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static net.logstash.logback.argument.StructuredArguments.*;

@RestController
public class MapController {

    private static final Logger log = LoggerFactory.getLogger("json");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse path = mapService.findPath(source, target);

        List<StationResponse> stations = path.getStations();
        log.info("{}, {}",
                kv("출발지", source(stations).getName()),
                kv("도착지", destination(stations).getName())
        );
        return ResponseEntity.ok(path);
    }

    private StationResponse destination(List<StationResponse> stations) {
        return stations.get(stations.size() - 1);
    }

    private StationResponse source(List<StationResponse> stations) {
        return stations.get(0);
    }
}
