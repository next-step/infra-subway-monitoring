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
    private static Logger logger = LoggerFactory.getLogger("json");
    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        logger.info("# 최단 경로 찾기 request: source = {}, target = {}", source, target);
        PathResponse path = mapService.findPath(source, target);
        logger.info("# 최단 경로 찾기 response: {}", path);
        return ResponseEntity.ok(path);
    }
}
