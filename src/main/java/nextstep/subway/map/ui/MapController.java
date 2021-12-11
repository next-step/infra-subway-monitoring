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
    public static final String MESSAGE_FIND_PATH = "%d에서 %d로 최단거리 조회가 발생했습니다";
    private MapService mapService;
    private Logger fileLogger = LoggerFactory.getLogger("file");

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        fileLogger.info(String.format(MESSAGE_FIND_PATH, source, target));
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
