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

    private static final Logger log = LoggerFactory.getLogger("file");
    private static final Logger jsonLog = LoggerFactory.getLogger("json");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        log.info("========== 경로찾기 ==========");
        PathResponse path = mapService.findPath(source, target);
        jsonLog.info(path.toString());

        return ResponseEntity.ok(path);
    }
}
