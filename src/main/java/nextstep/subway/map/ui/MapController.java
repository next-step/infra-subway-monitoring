package nextstep.subway.map.ui;

import nextstep.subway.common.LogName;
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

    private static final String MISSING_STATION_MESSAGE_FORMAT = "존재하지 않는 역 id [ %s ] 를 입력했습니다.";
    private static final String GET_PATH_MESSAGE_FORMAT = "[ %s ] 부터 [ %s ] 까지의 경로를 구했습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private MapService mapService;

    public MapController(MapService mapService) {
        this.mapService = mapService;
    }

    @GetMapping("/paths")
    public ResponseEntity<PathResponse> findPath(@RequestParam Long source, @RequestParam Long target) {
        PathResponse pathResponse = mapService.findPath(source, target);
        logInfo(formatGetPathMessage(pathResponse, source, target));
        return ResponseEntity.ok(pathResponse);
    }

    private String formatGetPathMessage(PathResponse pathResponse, Long source, Long target) {
        return String.format(GET_PATH_MESSAGE_FORMAT,
                sourceStationName(pathResponse, source),
                targetStationName(pathResponse, target));
    }

    private String targetStationName(PathResponse pathResponse, Long source) {
        return pathResponse.getStations().stream()
                .filter(station -> station.getId() == source)
                .map(station -> station.getName())
                .findFirst()
                .orElseThrow(() -> missingStationError(source));
    }

    private String sourceStationName(PathResponse pathResponse, Long target) {
        return pathResponse.getStations().stream()
                .filter(station -> station.getId() == target)
                .map(station -> station.getName())
                .findFirst()
                .orElseThrow(() -> missingStationError(target));
    }

    private RuntimeException missingStationError(Long id) {
        String message = formatMissingStationMessage(id);
        logError(message);
        return new IllegalArgumentException(message);
    }

    private String formatMissingStationMessage(Long id) {
        return String.format(MISSING_STATION_MESSAGE_FORMAT, id);
    }

    private void logInfo(String logMessage) {
        CONSOLE_LOGGER.info(logMessage);
        FILE_LOGGER.info(logMessage);
    }

    private void logError(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }

}
