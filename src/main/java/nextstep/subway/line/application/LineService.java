package nextstep.subway.line.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

import java.util.List;
import java.util.stream.Collectors;
import nextstep.subway.line.domain.Line;
import nextstep.subway.line.domain.LineRepository;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;
import nextstep.subway.station.application.StationService;
import nextstep.subway.station.domain.Station;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LineService {

    private static final Logger log = LoggerFactory.getLogger("json");
    private LineRepository lineRepository;
    private StationService stationService;

    public LineService(LineRepository lineRepository, StationService stationService) {
        this.lineRepository = lineRepository;
        this.stationService = stationService;
    }

    public LineResponse saveLine(LineRequest request) {
        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        Line persistLine = lineRepository.save(
            new Line(request.getName(), request.getColor(), upStation, downStation,
                request.getDistance()));

        log.info("{}, {}, {}",
            kv("TARGET", "LINE"),
            kv("ACTION", "SAVE"),
            kv("LINE", request.getName())
        );

        return LineResponse.of(persistLine);
    }

    public List<LineResponse> findLineResponses() {
        List<Line> persistLines = lineRepository.findAll();
        return persistLines.stream()
            .map(LineResponse::of)
            .collect(Collectors.toList());
    }

    public List<Line> findLines() {

        log.info("{}, {}",
            kv("TARGET", "LINE"),
            kv("ACTION", "FINDALL")
        );

        return lineRepository.findAll();
    }

    public Line findLineById(Long id) {
        return lineRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public LineResponse findLineResponseById(Long id) {
        Line persistLine = findLineById(id);

        log.info("{}, {}, {}",
            kv("TARGET", "LINE"),
            kv("ACTION", "FIND"),
            kv("LINE", persistLine.getName())
        );

        return LineResponse.of(persistLine);
    }

    public void updateLine(Long id, LineRequest lineUpdateRequest) {
        Line persistLine = lineRepository.findById(id).orElseThrow(RuntimeException::new);
        persistLine.update(new Line(lineUpdateRequest.getName(), lineUpdateRequest.getColor()));
    }

    public void deleteLineById(Long id) {
        lineRepository.deleteById(id);
    }

    public void addLineStation(Long lineId, SectionRequest request) {
        Line line = findLineById(lineId);
        Station upStation = stationService.findStationById(request.getUpStationId());
        Station downStation = stationService.findStationById(request.getDownStationId());
        line.addLineSection(upStation, downStation, request.getDistance());

        log.info("{}, {}, {}",
            kv("TARGET", "LINE"),
            kv("ACTION", "ADDSECTION"),
            kv("LINE", line.getName()),
            kv("UPSTATION", upStation.getName()),
            kv("DOWNSTATION", downStation.getName())
        );
    }

    public void removeLineStation(Long lineId, Long stationId) {
        Line line = findLineById(lineId);
        line.removeStation(stationId);
    }
}
