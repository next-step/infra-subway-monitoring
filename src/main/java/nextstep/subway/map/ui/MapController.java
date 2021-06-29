package nextstep.subway.map.ui;

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
    private MapService mapService;
    private static final Logger logger = LoggerFactory.getLogger("file");

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse path = mapService.findPath(source, target);
        logger.info("경로 조회 요청 출발, 도착, 경로: {}, {}, {}", source, target, path);
        return ResponseEntity.ok(path);
    }
}
