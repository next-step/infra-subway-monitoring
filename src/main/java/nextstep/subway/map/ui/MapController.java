package nextstep.subway.map.ui;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {

    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        fileLogger.info("source:{} -> target:{}", source, target);

        PathResponse response = mapService.findPath(source, target);
        List<StationResponse> stations = response.getStations();

        jsonLogger.info("{}, {}",
                kv("출발지", stations.get(0).getName()),
                kv("도착지", stations.get(stations.size() - 1).getName())
        );

        return ResponseEntity.ok(response);
    }
}
