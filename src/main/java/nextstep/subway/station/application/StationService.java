package nextstep.subway.station.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;
import java.util.stream.Collectors;
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

    private static final Logger log = LoggerFactory.getLogger("json");
    private StationRepository stationRepository;

    public StationService(StationRepository stationRepository) {
        this.stationRepository = stationRepository;
    }

    public StationResponse saveStation(StationRequest stationRequest) {
        Station persistStation = stationRepository.save(stationRequest.toStation());

        log.info("{}, {}, {}",
            kv("TARGET", "STATION"),
            kv("ACTION", "SAVE"),
            kv("STATION", stationRequest.getName())
        );

        return StationResponse.of(persistStation);
    }

    @Transactional(readOnly = true)
    public List<StationResponse> findAllStations() {
        List<Station> stations = stationRepository.findAll();

        log.info("{}, {}",
            kv("TARGET", "STATION"),
            kv("ACTION", "FINDALL")
        );

        return stations.stream()
            .map(StationResponse::of)
            .collect(Collectors.toList());
    }

    public void deleteStationById(Long id) {
        stationRepository.deleteById(id);
    }

    public Station findStationById(Long id) {
        Station station = stationRepository.findById(id).orElseThrow(RuntimeException::new);

        log.info("{}, {}, {}",
            kv("TARGET", "STATION"),
            kv("ACTION", "FIND"),
            kv("STATION", station.getName())
        );

        return station;
    }

    public Station findById(Long id) {
        return stationRepository.findById(id).orElseThrow(RuntimeException::new);
    }


}
