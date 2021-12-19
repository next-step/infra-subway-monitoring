package nextstep.subway.line.application;

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
    private static final Logger log = LoggerFactory.getLogger("file");

    private LineRepository lineRepository;
    private StationService stationService;

    public LineService(LineRepository lineRepository, StationService stationService) {
        this.lineRepository = lineRepository;
        this.stationService = stationService;
    }

    public LineResponse saveLine(LineRequest request) {
        log.info("노선 생성을 요청하였습니다. name : {}", request.getName());

        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        Line persistLine = lineRepository.save(new Line(request.getName(), request.getColor(), upStation, downStation, request.getDistance()));

        log.info("노선 생성되었습니다. name : {}", request.getName());
        return LineResponse.of(persistLine);
    }

    public List<LineResponse> findLineResponses() {
        log.info("노선 목록조회를 요청하였습니다.");

        List<Line> persistLines = lineRepository.findAll();

        log.info("노선 목록조회되었습니다.");
        return persistLines.stream()
                .map(LineResponse::of)
                .collect(Collectors.toList());
    }

    public List<Line> findLines() {
        return lineRepository.findAll();
    }

    public Line findLineById(Long id) {
        return lineRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("노선 조회 중 오류가 발생하였습니다. id : {}", id);
                    return new RuntimeException();
                });
    }


    public LineResponse findLineResponseById(Long id) {
        log.info("노선 조회를 요청하였습니다. id : {}", id);

        Line persistLine = findLineById(id);

        log.info("노선 조회되었습니다. id : {}", id);
        return LineResponse.of(persistLine);
    }

    public void updateLine(Long id, LineRequest lineUpdateRequest) {
        log.info("노선 수정을 요청하였습니다. id : {}", id);

        Line persistLine = findLineById(id);
        persistLine.update(new Line(lineUpdateRequest.getName(), lineUpdateRequest.getColor()));

        log.info("노선 수정되었습니다. id : {}", id);
    }

    public void deleteLineById(Long id) {
        log.info("노선 삭제를 요청하였습니다. id : {}", id);

        lineRepository.deleteById(id);

        log.info("노선 삭제되었습니다. id : {}", id);
    }

    public void addLineStation(Long lineId, SectionRequest request) {
        log.info("노선 구간 추가를 요청하였습니다. line id : {}, sStation : {}, eStation : {}", lineId, request.getUpStationId(), request.getDownStationId());

        Line line = findLineById(lineId);
        Station upStation = stationService.findById(request.getUpStationId());
        Station downStation = stationService.findById(request.getDownStationId());
        line.addLineSection(upStation, downStation, request.getDistance());

        log.info("노선 구간 추가되었습니다. line id : {}, sStation : {}, eStation : {}", lineId, request.getUpStationId(), request.getDownStationId());
    }

    public void removeLineStation(Long lineId, Long stationId) {
        log.info("노선 구간 삭제를 요청하였습니다. line id : {}, station : {}", lineId, stationId);

        Line line = findLineById(lineId);
        line.removeStation(stationId);

        log.info("노선 구간 삭제되었습니다. line id : {}, station : {}", lineId, stationId);
    }
}
