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
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        jsonLogger.info("[Find Path Try] Source & Target ID: {}, {}", source, target);
        PathResponse pathResponse = mapService.findPath(source, target);
        jsonLogger.info("[Find Path] Source & Target ID: {}, {}", source, target);
        jsonLogger.info("[Find Path] Stations: {}, Distance: {}", pathResponse.getStations(), pathResponse.getDistance());

        return ResponseEntity.ok(pathResponse);
    }
}
