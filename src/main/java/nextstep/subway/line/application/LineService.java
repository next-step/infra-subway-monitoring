package nextstep.subway.line.application;

import nextstep.subway.common.LogName;
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

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LineService {

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());
    public static final String MISSING_ID_MESSAGE_FORMAT = "id [ %s ] 는 알맞는 값이 아닙니다.";

    private LineRepository lineRepository;
    private StationService stationService;

    public LineService(LineRepository lineRepository, StationService stationService) {
        this.lineRepository = lineRepository;
        this.stationService = stationService;
    }

    public LineResponse saveLine(LineRequest request) {
        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        Line persistLine = lineRepository.save(new Line(request.getName(), request.getColor(), upStation, downStation, request.getDistance()));
        return LineResponse.of(persistLine);
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
        return lineRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
    }

    public LineResponse findLineResponseById(Long id) {
        Line persistLine = findLineById(id);
        return LineResponse.of(persistLine);
    }

    public void updateLine(Long id, LineRequest lineUpdateRequest) {
        Line persistLine = lineRepository.findById(id)
                .orElseThrow(() -> runtimeException(id));
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
    }

    public void removeLineStation(Long lineId, Long stationId) {
        Line line = findLineById(lineId);
        line.removeStation(stationId);
    }

    private RuntimeException runtimeException(Long id) {
        logError(formatMissingIdMessage(MISSING_ID_MESSAGE_FORMAT, id));
        return new RuntimeException();
    }

    private String formatMissingIdMessage(String missingIdMessageFormat, Long id) {
        return String.format(missingIdMessageFormat, id);
    }

    private void logError(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }
}
