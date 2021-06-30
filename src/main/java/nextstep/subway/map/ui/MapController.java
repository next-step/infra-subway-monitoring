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
    private static final Logger logger = LoggerFactory.getLogger(MapController.class);

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")

    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        logger.info("최단거리 조회 요청 - upstation Id : {}, downstation Id : {}", source, target);
        PathResponse path = mapService.findPath(source, target);
        logger.info("최단거리 조회 응답- distance : {}", path);
        return ResponseEntity.ok(path);
    }
}
