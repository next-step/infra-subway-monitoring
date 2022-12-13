package nextstep.subway.line.application;

import java.util.List;
import java.util.stream.Collectors;
import net.logstash.logback.argument.StructuredArguments;
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

    private static final Logger log = LoggerFactory.getLogger("file");
    private LineRepository lineRepository;
    private StationService stationService;

    public LineService(LineRepository lineRepository, StationService stationService) {
        this.lineRepository = lineRepository;
        this.stationService = stationService;
    }

    public LineResponse saveLine(LineRequest request) {
        log.info("Save line, Line : {}", request.toLine());
        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        Line persistLine = lineRepository.save(new Line(request.getName(), request.getColor(), upStation, downStation, request.getDistance()));
        log.debug("Saved line {}", persistLine.getName());
        return LineResponse.of(persistLine);
    }

    public List<LineResponse> findLineResponses() {
        log.info("Find lines");
        List<Line> persistLines = lineRepository.findAll();

        log.debug("Lines content {}",
            persistLines.stream()
                .map(Line::toString)
                .collect(Collectors.toList())
        );

        return persistLines.stream()
            .map(LineResponse::of)
            .collect(Collectors.toList());
    }

    public List<Line> findLines() {
        log.info("Get lines to find path");
        return lineRepository.findAll();
    }

    public Line findLineById(Long id) {
        return lineRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    public LineResponse findLineResponseById(Long id) {
        log.info("Find line by id, Line Id is {}", id);
        Line persistLine = findLineById(id);
        return LineResponse.of(persistLine);
    }

    public void updateLine(Long id, LineRequest lineUpdateRequest) {
        log.info("Update line by id, Line Id is {}, and Update content : {}", id, lineUpdateRequest.toLine());
        Line persistLine = lineRepository.findById(id).orElseThrow(RuntimeException::new);
        persistLine.update(new Line(lineUpdateRequest.getName(), lineUpdateRequest.getColor()));
    }

    public void deleteLineById(Long id) {
        log.info("Delete line by id, Line Id is {}", id);
        lineRepository.deleteById(id);
    }

    public void addLineStation(Long lineId, SectionRequest request) {
        log.info("Add Station, Line Id is {} , Section : {}", lineId, request);
        Line line = findLineById(lineId);
        Station upStation = stationService.findStationById(request.getUpStationId());
        Station downStation = stationService.findStationById(request.getDownStationId());
        line.addLineSection(upStation, downStation, request.getDistance());
    }

    public void removeLineStation(Long lineId, Long stationId) {
        log.info("Remove line by id, Line Id is {}, Station Id is {}", lineId, stationId);
        Line line = findLineById(lineId);
        line.removeStation(stationId);
    }
}
