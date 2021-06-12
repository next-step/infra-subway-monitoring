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
    private MapService mapService;
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse pathResponse = mapService.findPath(source, target);
        jsonLogger.info("{} {}", kv("stations", pathResponse.getStations()),
                kv("distance", pathResponse.getDistance()));
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
