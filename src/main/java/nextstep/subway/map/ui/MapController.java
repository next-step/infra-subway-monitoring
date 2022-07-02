package nextstep.subway.map.ui;

import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static net.logstash.logback.argument.StructuredArguments.kv;

@RestController
public class MapController {
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        jsonLogger.info("{}, {}",
                kv("source", source),
                kv("target", target)
        );
        PathResponse path = mapService.findPath(source, target);
        jsonLogger.info("{}, {}",
                kv("stations", path.getStations()),
                kv("distance", path.getDistance())
        );
        return ResponseEntity.ok(path);
    }
}
