package nextstep.subway.station.ui;

import nextstep.subway.common.LogName;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
public class StationController {
    private static final String CREATE_STATION_MESSAGE_FORMAT = "[ %s ]역을 등록했습니다.";
    private static final String GET_STATIONS_MESSAGE_FORMAT = "역 목록 [ %s ] 개를 가져왔습니다.";
    private static final String DELETE_STATION_MESSAGE_FORMAT = "[ %s ] 번째 역을 삭제했습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @PostMapping("/stations")
    public ResponseEntity<StationResponse> createStation(@RequestBody StationRequest stationRequest) {
        StationResponse station = stationService.saveStation(stationRequest);
        logInfo(formatCreateStationMessage(station));
        return ResponseEntity.created(URI.create("/stations/" + station.getId())).body(station);
    }

    @GetMapping(value = "/stations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StationResponse>> showStations() {
        List<StationResponse> stationResponses = stationService.findAllStations();
        logInfo(formatGetStationsMessage(stationResponses));
        return ResponseEntity.ok().body(stationResponses);
    }

    @DeleteMapping("/stations/{id}")
    public ResponseEntity deleteStation(@PathVariable Long id) {
        stationService.deleteStationById(id);
        logInfo(formatDeleteStationMessage(id));
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
        logError(e.getMessage());
        return ResponseEntity.badRequest().build();
    }

    private String formatGetStationsMessage(List<StationResponse> stationResponses) {
        return String.format(GET_STATIONS_MESSAGE_FORMAT, stationResponses.size());
    }

    private String formatCreateStationMessage(StationResponse station) {
        return String.format(CREATE_STATION_MESSAGE_FORMAT, station.getName());
    }

    private String formatDeleteStationMessage(Long id) {
        return String.format(DELETE_STATION_MESSAGE_FORMAT, id);
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
