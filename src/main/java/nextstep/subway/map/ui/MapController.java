package nextstep.subway.map.ui;

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
    private static final Logger log = LoggerFactory.getLogger("console");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        log.info("최단 경로가 조회 되었습니다.");
        fileLogger.info("최단 경로가 조회 되었습니다");
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
