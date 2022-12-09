package nextstep.subway.map.ui;

import static net.logstash.logback.argument.StructuredArguments.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;

@RestController
public class MapController {
    private final static Logger logger = LoggerFactory.getLogger("json");

    private final MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse path = mapService.findPath(source, target);

        logger.info("{}, {}, {}", kv("source", source), kv("target", target), kv("path", path));
        return ResponseEntity.ok(path);
    }
}
