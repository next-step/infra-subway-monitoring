package nextstep.subway.station.ui;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static nextstep.subway.common.LogUtils.fileLog;

@RestController
public class StationController {

    private final StationService stationService;
    private final ObjectMapper objectMapper;

    public StationController(StationService stationService, ObjectMapper objectMapper) {
        this.stationService = stationService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/stations")
    public ResponseEntity<StationResponse> createStation(@RequestBody StationRequest stationRequest) throws JsonProcessingException {
        fileLog.info("StationRequest: {}", objectMapper.writeValueAsString(stationRequest));
        StationResponse station = stationService.saveStation(stationRequest);
        fileLog.info("StationResponse: {}", objectMapper.writeValueAsString(station));
        return ResponseEntity.created(URI.create("/stations/" + station.getId())).body(station);
    }

    @GetMapping(value = "/stations", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StationResponse>> showStations() throws JsonProcessingException {
        List<StationResponse> stationResponses = stationService.findAllStations();
        fileLog.info("StationResponses: {}", objectMapper.writeValueAsString(stationResponses));
        return ResponseEntity.ok().body(stationResponses);
    }

    @DeleteMapping("/stations/{id}")
    public ResponseEntity deleteStation(@PathVariable Long id) {
        fileLog.info("StationId: {}", id);
        stationService.deleteStationById(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
        return ResponseEntity.badRequest().build();
    }
}
