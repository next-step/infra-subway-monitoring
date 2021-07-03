package nextstep.subway.map.ui;

import nextstep.subway.line.ui.LineController;
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
    private static final Logger logger = LoggerFactory.getLogger(MapController.class);

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse pathResponse = mapService.findPath(source, target);
        return ResponseEntity.ok(pathResponse);
    }
}
