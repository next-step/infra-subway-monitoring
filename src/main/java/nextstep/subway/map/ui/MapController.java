package nextstep.subway.map.ui;

import static net.logstash.logback.argument.StructuredArguments.kv;

import lombok.extern.slf4j.Slf4j;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
public class MapController {
    private static Logger jsonLog = LoggerFactory.getLogger("json");
    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        log.info("{}, {}", kv("출발지", source), kv("도착지", target));
        jsonLog.info("{}, {}", kv("출발지", source), kv("도착지", target));
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
