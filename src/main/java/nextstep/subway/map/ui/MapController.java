package nextstep.subway.map.ui;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nextstep.subway.map.application.MapService;
import nextstep.subway.map.dto.PathResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static nextstep.subway.common.LogUtils.fileLog;

@RestController
public class MapController {

    private final MapService mapService;
    private final ObjectMapper objectMapper;

    public MapController(MapService mapService, ObjectMapper objectMapper) {
        this.mapService = mapService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) throws JsonProcessingException {
        fileLog.info("SourceStationId: {} / TargetStationId: {}", source, target);
        PathResponse pathResponse = mapService.findPath(source, target);
        fileLog.info("PathResponse: {}", objectMapper.writeValueAsString(pathResponse));
        return ResponseEntity.ok(pathResponse);
    }
}
