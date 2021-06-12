package nextstep.subway.station.application;

import nextstep.subway.common.LogName;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.domain.StationRepository;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StationService {

    private static final String MISSING_ID_MESSAGE_FORMAT = "[ %s ]에 해당하는 id 는 없습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public StationResponse saveStation(StationRequest stationRequest) {
        Station persistStation = stationRepository.save(stationRequest.toStation());
        return StationResponse.of(persistStation);
    }

    @Transactional(readOnly = true)
    public List<StationResponse> findAllStations() {
        List<Station> stations = stationRepository.findAll();

        return stations.stream()
                .map(StationResponse::of)
                .collect(Collectors.toList());
    }

    public void deleteStationById(Long id) {
        stationRepository.deleteById(id);
    }

    public Station findStationById(Long id) {
        return stationRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
    }

    public Station findById(Long id) {
        return stationRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
    }

    private RuntimeException runtimeException(Long id) {
        logError(formatMissingIdMessage(id));
        return new RuntimeException();
    }

    private String formatMissingIdMessage(Long id) {
        return String.format(MISSING_ID_MESSAGE_FORMAT, id);
    }

    private void logError(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }

}
