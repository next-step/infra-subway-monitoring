package nextstep.subway.map.ui;

import static net.logstash.logback.argument.StructuredArguments.kv;
import static nextstep.subway.common.log.LogNameConstants.*;

import nextstep.subway.common.log.LogNameConstants;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {
    private MapService mapService;

    private final Logger dataLog = LoggerFactory.getLogger(DATA_LOG);

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse path = mapService.findPath(source, target);

        dataLog.info("{}, {}",
                kv("경로",path.getStations()),
                kv("거리", path.getDistance())
        );

        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
