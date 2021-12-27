package nextstep.subway.station.application;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nextstep.subway.station.domain.Station;
import nextstep.subway.station.domain.StationRepository;
import nextstep.subway.station.dto.StationRequest;
import nextstep.subway.station.dto.StationResponse;

@Service
@Transactional
public class StationService {
    private static final Logger log = LoggerFactory.getLogger("console");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public StationResponse saveStation(StationRequest stationRequest) {
        Station persistStation = stationRepository.save(stationRequest.toStation());

        log.info("지하철역 생성 키 >>> {}", persistStation.getId());

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
        return stationRepository.findById(id).orElseThrow(() -> {
            fileLogger.error("지하철역이 존재하지 않습니다. 지하철역: {}", id);
            return new RuntimeException();
        });
    }

    public Station findById(Long id) {
        return stationRepository.findById(id).orElseThrow(() -> {
            fileLogger.error("지하철역이 존재하지 않습니다. 지하철역: {}", id);
            return new RuntimeException();
        });
    }
}
