package nextstep.subway.station.application;

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
    private static final Logger log = LoggerFactory.getLogger("file");

    private StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public StationResponse saveStation(StationRequest stationRequest) {
        log.info("역 등록이 요청 되었습니다. name : {}", stationRequest.getName());

        Station persistStation = stationRepository.save(stationRequest.toStation());

        log.info("역 등록되었습니다. name : {}", stationRequest.getName());
        return StationResponse.of(persistStation);
    }

    @Transactional(readOnly = true)
    public List<StationResponse> findAllStations() {
        log.info("역 목록 조회가 요청 되었습니다.");

        List<Station> stations = stationRepository.findAll();

        log.info("역 목록 조회되었습니다.");
        return stations.stream()
                .map(StationResponse::of)
                .collect(Collectors.toList());
    }

    public void deleteStationById(Long id) {
        log.info("역 삭제가 요청 되었습니다. id {}", id);

        stationRepository.deleteById(id);

        log.info("역 삭제되었습니다. id {}", id);
    }

    public Station findById(Long id) {
        return stationRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("역 찾는 중 오류가 발생하였습니다. id : {}", id);
                    return new RuntimeException();
                });
    }
}
