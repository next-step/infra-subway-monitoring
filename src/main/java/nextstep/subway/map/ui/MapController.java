package nextstep.subway.map.ui;

import nextstep.subway.annotation.SubwayLogging;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {
    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    @SubwayLogging(description = "최단 경로 조회(/paths)")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
