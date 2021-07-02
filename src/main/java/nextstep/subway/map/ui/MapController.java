package nextstep.subway.map.ui;

import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathRequest;
import nextstep.subway.map.dto.PathResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {
    private static final Logger logger = LoggerFactory.getLogger("console");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(PathRequest request) {
        logger.trace("최단거리 요청 -> {}", request);
        PathResponse pathResponse = mapService.findPath(request);
        logger.trace("최단거리 응답 -> {}", pathResponse);
        return ResponseEntity.ok(pathResponse);
    }
}
