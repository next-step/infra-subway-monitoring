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
    private static final Logger logger = LoggerFactory.getLogger(MapController.class);

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(PathRequest request) {
        logger.info("경로 찾기 요청: {}", request);
        ResponseEntity<PathResponse> response = ResponseEntity.ok(mapService.findPath(request));
        logger.info("경로 찾기 응답: {}", response);
        return ResponseEntity.ok(mapService.findPath(request));
    }
}
