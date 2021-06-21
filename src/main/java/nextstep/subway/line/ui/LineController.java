package nextstep.subway.line.ui;

import lombok.extern.slf4j.Slf4j;
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

@Slf4j(topic = "json_file")
@RestController
@RequestMapping("/lines")
public class LineController {
    private final LineService lineService;

    public LineController(final LineService lineService) {
        this.lineService = lineService;
    }

    @PostMapping
    public ResponseEntity createLine(@RequestBody LineRequest lineRequest) {
        log.info("노선 생성 요청 [{}]", lineRequest);
        LineResponse line = lineService.saveLine(lineRequest);
        log.info("노선 생성 완료 [{}]", line);
        return ResponseEntity.created(URI.create("/lines/" + line.getId())).body(line);
    }

    @GetMapping
    public ResponseEntity<List<LineResponse>> findAllLines() {
        log.info("전체 노선 조회");
        return ResponseEntity.ok(lineService.findLineResponses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LineResponse> findLineById(@PathVariable Long id) {
        log.info("id로 노선 찾기 [id={}]",id);
        return ResponseEntity.ok(lineService.findLineResponseById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity updateLine(@PathVariable Long id, @RequestBody LineRequest lineUpdateRequest) {
        log.info("노선 업데이트 요청 [id={}/lineRequest={}]", id,lineUpdateRequest);
        lineService.updateLine(id, lineUpdateRequest);
        log.info("노선 업데이트 완료 [id={}/lineRequest={}]");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteLine(@PathVariable Long id) {
        log.info("노선 삭제 요청 [id={}]");
        lineService.deleteLineById(id);
        log.info("노선 삭제 완료");
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{lineId}/sections")
    public ResponseEntity addLineStation(@PathVariable Long lineId, @RequestBody SectionRequest sectionRequest) {
        log.info("노선 추가 요청 [lineId={}/sectionRequest={}]", lineId, sectionRequest);
        lineService.addLineStation(lineId, sectionRequest);
        log.info("노선 추가 완료 [lineid={}]", lineId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{lineId}/sections")
    public ResponseEntity removeLineStation(@PathVariable Long lineId, @RequestParam Long stationId) {
        log.info("노선 역 삭제 요청 [lineId={}/stationId={}]", lineId, stationId);
        lineService.removeLineStation(lineId, stationId);
        log.info("노선 역 삭제 완료");
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
