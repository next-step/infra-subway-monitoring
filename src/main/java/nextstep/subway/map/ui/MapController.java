package nextstep.subway.map.ui;

import nextstep.subway.common.JsonLogging;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MapController {

    private final MapService mapService;

    public MapController(final MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    @JsonLogging
    public ResponseEntity<PathResponse> findPath(
        @RequestParam final Long source,
        @RequestParam final Long target
    ) {
        return ResponseEntity.ok(mapService.findPath(source, target));
    }
}
