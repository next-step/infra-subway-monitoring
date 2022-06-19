package nextstep.subway.line.application;

import static net.logstash.logback.argument.StructuredArguments.a;
import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;
import java.util.stream.Collectors;
import nextstep.subway.common.LogMarker;
import nextstep.subway.line.domain.Line;
import nextstep.subway.line.domain.LineRepository;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import nextstep.subway.station.dto.StationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LineService {
    private LineRepository lineRepository;
    private StationService stationService;

    private static final Logger logger = LoggerFactory.getLogger(LineService.class);

    public LineService(LineRepository lineRepository, StationService stationService) {
        this.lineRepository = lineRepository;
        this.stationService = stationService;
    }

    public LineResponse saveLine(LineRequest request) {
        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        Line persistLine = lineRepository.save(new Line(request.getName(), request.getColor(), upStation, downStation, request.getDistance()));
        LineResponse response =  LineResponse.of(persistLine);
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event", "SAVE_LINE"), kv("payload", response));
        return response;
    }

    public List<LineResponse> findLineResponses() {
        List<Line> persistLines = lineRepository.findAll();
        return persistLines.stream()
            .map(LineResponse::of)
            .collect(Collectors.toList());
    }

    public List<Line> findLines() {
        return lineRepository.findAll();
    }

    public Line findLineById(Long id) {
        return lineRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public LineResponse findLineResponseById(Long id) {
        Line persistLine = findLineById(id);
        return LineResponse.of(persistLine);
    }

    public void updateLine(Long id, LineRequest lineUpdateRequest) {
        Line persistLine = lineRepository.findById(id).orElseThrow(RuntimeException::new);
        persistLine.update(new Line(lineUpdateRequest.getName(), lineUpdateRequest.getColor()));
        LineResponse response =  LineResponse.of(persistLine);
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event", "UPDATE_LINE"), kv("payload", response));
    }

    public void deleteLineById(Long id) {
        lineRepository.deleteById(id);
        logger.info(LogMarker.JSON.getMarker(), "{},{}", kv("event", "DELETE_LINE"), kv("payload", id));
    }

    public void addLineStation(Long lineId, SectionRequest request) {
        Line line = findLineById(lineId);
        Station upStation = stationService.findStationById(request.getUpStationId());
        Station downStation = stationService.findStationById(request.getDownStationId());
        line.addLineSection(upStation, downStation, request.getDistance());
        logger.info(LogMarker.JSON.getMarker(), "{},{}"
                ,kv("event", "ADD_SECTION")
                ,a("payload"
                    ,kv("upStation", StationResponse.of(upStation))
                    ,kv("downStation", StationResponse.of(downStation))
                    ,kv("distance", request.getDistance())
                )
        );
    }

    public void removeLineStation(Long lineId, Long stationId) {
        Line line = findLineById(lineId);
        Station station = stationService.findStationById(stationId);
        line.removeStation(stationId);
        logger.info(LogMarker.JSON.getMarker(), "{},{}"
                ,kv("event", "REMOVE_SECTION")
                ,a("payload"
                    ,kv("line", LineResponse.of(line))
                    ,kv("station", StationResponse.of(station))
                )
        );
    }
}
