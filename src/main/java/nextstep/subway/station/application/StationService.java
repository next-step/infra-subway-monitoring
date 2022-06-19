package nextstep.subway.station.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;
import java.util.stream.Collectors;
import nextstep.subway.common.LogMarker;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.domain.StationRepository;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StationService {
    private StationRepository stationRepository;

    private static final Logger logger = LoggerFactory.getLogger(StationService.class);

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public StationResponse saveStation(StationRequest stationRequest) {
        Station persistStation = stationRepository.save(stationRequest.toStation());
        StationResponse response = StationResponse.of(persistStation);
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event", "SAVE_STATION"), kv("payload", response));
        return response;
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
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event", "DELETE_STATION"), kv("payload", id));
    }

    public Station findStationById(Long id) {
        return stationRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public Station findById(Long id) {
        return stationRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
