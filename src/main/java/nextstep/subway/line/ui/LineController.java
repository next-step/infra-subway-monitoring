package nextstep.subway.line.ui;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nextstep.subway.line.application.LineService;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.function.IntUnaryOperator;
import java.util.stream.IntStream;

import static nextstep.subway.common.LogUtils.fileLog;

@RestController
@RequestMapping("/lines")
public class LineController {

    private final LineService lineService;
    private final ObjectMapper objectMapper;

    public LineController(LineService lineService, ObjectMapper objectMapper) {
        this.lineService = lineService;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity createLine(@RequestBody LineRequest lineRequest) throws JsonProcessingException {
        fileLog.info("LineRequest: {}", objectMapper.writeValueAsString(lineRequest));
        LineResponse line = lineService.saveLine(lineRequest);
        fileLog.info("LineResponse: {}", objectMapper.writeValueAsString(line));
        return ResponseEntity.created(URI.create("/lines/" + line.getId())).body(line);
    }

    @GetMapping
    public ResponseEntity<List<LineResponse>> findAllLines() throws JsonProcessingException {
        List<LineResponse> lineResponses = lineService.findLineResponses();
        fileLog.info("LineResponses: {}", objectMapper.writeValueAsString(lineResponses));
        return ResponseEntity.ok(lineResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LineResponse> findLineById(@PathVariable Long id) throws JsonProcessingException {
        fileLog.info("LineId: {}", id);
        LineResponse lineResponse = lineService.findLineResponseById(id);
        fileLog.info("LineResponse: {}", objectMapper.writeValueAsString(lineResponse));
        return ResponseEntity.ok(lineResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateLine(@PathVariable Long id, @RequestBody LineRequest lineUpdateRequest) throws JsonProcessingException {
        fileLog.info("LineId: {} / LineRequest: {}", id, objectMapper.writeValueAsString(lineUpdateRequest));
        lineService.updateLine(id, lineUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLine(@PathVariable Long id) {
        fileLog.info("LineId: {}", id);
        lineService.deleteLineById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{lineId}/sections")
    public ResponseEntity addLineStation(@PathVariable Long lineId, @RequestBody SectionRequest sectionRequest) throws JsonProcessingException {
        fileLog.info("LineId: {} / SectionRequest: {}", lineId, objectMapper.writeValueAsString(sectionRequest));
        lineService.addLineStation(lineId, sectionRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{lineId}/sections")
    public ResponseEntity removeLineStation(@PathVariable Long lineId, @RequestParam Long stationId) {
        fileLog.info("LineId: {} / StationId: {}", lineId, stationId);
        lineService.removeLineStation(lineId, stationId);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
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


}
