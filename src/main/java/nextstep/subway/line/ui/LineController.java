package nextstep.subway.line.ui;

import nextstep.subway.common.LogName;
import nextstep.subway.line.application.LineService;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.function.IntUnaryOperator;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/lines")
public class LineController {

    private static final String CREATE_LINE_MESSAGE_FORMAT = "이름이 [ %s ]인 노선을 등록했습니다.";
    private static final String RESPONSE_LINE_MESSAGE_FORMAT = "이름이 [ %s ]인 노선을 반환합니다.";
    private static final String UPDATE_LINE_MESSAGE_FORMAT = "이름이 [ %s ]인 노선의 정보를 업데이트합니다.";
    private static final String DELETE_LINE_MESSAGE_FORMAT = "[ %s ] 번째 노선을 삭제 했습니다.";
    private static final String GET_LINES_MESSAGE = "노선 [ %s ] 개를 가져왔습니다.";
    private static final String ADD_LINE_MESSAGE_FORMAT = "상행 종점 [ %s ], 하행 종점 [ %s ], 거리 [ %s ] 인 노선을 등록합니다.";
    private static final String REMOVE_LINE_MESSAGE_FORMAT = "[ %s ] 번째 노선을 삭제합니다.";
    private static final String DATA_INTEGRITY_VIOLATION_MESSAGE = "데이터 무결성 위반한 예외가 발생했습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private final LineService lineService;

    public LineController(final LineService lineService) {
        this.lineService = lineService;
    }

    @PostMapping
    public ResponseEntity createLine(@RequestBody LineRequest lineRequest) {
        LineResponse line = lineService.saveLine(lineRequest);
        logInfo(formatCreateLineMessage(lineRequest));
        return ResponseEntity.created(URI.create("/lines/" + line.getId())).body(line);
    }

    @GetMapping
    public ResponseEntity<List<LineResponse>> findAllLines() {
        List<LineResponse> lineResponses = lineService.findLineResponses();
        logInfo(formatGetLinesMessage(lineResponses));
        return ResponseEntity.ok(lineResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LineResponse> findLineById(@PathVariable Long id) {
        LineResponse lineResponse = lineService.findLineResponseById(id);
        logInfo(formatGetLineMessage(lineResponse));
        return ResponseEntity.ok(lineResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateLine(@PathVariable Long id, @RequestBody LineRequest lineUpdateRequest) {
        lineService.updateLine(id, lineUpdateRequest);
        logInfo(formatUpdateLineMessage(lineUpdateRequest));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLine(@PathVariable Long id) {
        lineService.deleteLineById(id);
        logInfo(formatDeleteLineMessage(id));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{lineId}/sections")
    public ResponseEntity addLineStation(@PathVariable Long lineId, @RequestBody SectionRequest sectionRequest) {
        lineService.addLineStation(lineId, sectionRequest);
        logInfo(formatAddLineMessage(sectionRequest));
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{lineId}/sections")
    public ResponseEntity removeLineStation(@PathVariable Long lineId, @RequestParam Long stationId) {
        lineService.removeLineStation(lineId, stationId);
        logInfo(formatRemoveLineMessage(stationId));
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
        logError(DATA_INTEGRITY_VIOLATION_MESSAGE);
        return ResponseEntity.badRequest().build();
    }

    static final Object left = new Object();
    static final Object right = new Object();

    @GetMapping("/lock-left")
    public String findLockLeft() throws InterruptedException {

        synchronized (left) {
            Thread.sleep(5000);
            synchronized (right) {
                System.out.println("left");
            }
        }
        return "ok";
    }

    @GetMapping("/lock-right")
    public String findLockRight() throws InterruptedException {
        synchronized (right) {
            Thread.sleep(5000);
            synchronized (left) {
                System.out.println("right");
            }
        }
        return "ok";
    }

    @GetMapping("/tan")
    public String generateStreams() {
        double value = 0;
        IntStream.of(100).parallel().map(extracted(value));
        extracted(value);
        return "ok";
    }

    private IntUnaryOperator extracted(double value) {
        while (value >= 0) {
            value = Math.tan(value);
        }
        return null;
    }

    private String formatCreateLineMessage(LineRequest lineRequest) {
        return String.format(CREATE_LINE_MESSAGE_FORMAT, lineRequest.getName());
    }

    private String formatGetLinesMessage(List<LineResponse> lineResponses) {
        return String.format(GET_LINES_MESSAGE, lineResponses.size());
    }

    private String formatGetLineMessage(LineResponse lineResponse) {
        return String.format(RESPONSE_LINE_MESSAGE_FORMAT, lineResponse.getName());
    }

    private String formatUpdateLineMessage(LineRequest lineUpdateRequest) {
        return String.format(UPDATE_LINE_MESSAGE_FORMAT, lineUpdateRequest.getName());
    }

    private String formatDeleteLineMessage(Long id) {
        return String.format(DELETE_LINE_MESSAGE_FORMAT, id);
    }

    private String formatAddLineMessage(SectionRequest sectionRequest) {
        return String.format(ADD_LINE_MESSAGE_FORMAT,
                sectionRequest.getUpStationId(),
                sectionRequest.getDownStationId(),
                sectionRequest.getDistance());
    }

    private String formatRemoveLineMessage(Long stationId) {
        return String.format(REMOVE_LINE_MESSAGE_FORMAT, stationId);
    }

    private void logInfo(String logMessage) {
        CONSOLE_LOGGER.info(logMessage);
        FILE_LOGGER.info(logMessage);
    }

    private void logError(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }

}
