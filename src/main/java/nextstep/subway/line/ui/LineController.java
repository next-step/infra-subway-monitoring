package nextstep.subway.line.ui;

import nextstep.subway.annotation.SubwayFileLogging;
import nextstep.subway.annotation.SubwayJsonLogging;
import nextstep.subway.line.application.LineService;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.function.IntUnaryOperator;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/lines")
public class LineController {
    private final LineService lineService;

    public LineController(final LineService lineService) {
        this.lineService = lineService;
    }

    @PostMapping
    @SubwayFileLogging(description = "신규 노선 생성(/lines)")
    public ResponseEntity createLine(@RequestBody LineRequest lineRequest) {
        LineResponse line = lineService.saveLine(lineRequest);
        return ResponseEntity.created(URI.create("/lines/" + line.getId())).body(line);
    }

    @GetMapping
    @SubwayJsonLogging(description = "모든 지하철 노선 조회(/lines)")
    public ResponseEntity<List<LineResponse>> findAllLines() {
        return ResponseEntity.ok(lineService.findLineResponses());
    }

    @GetMapping("/{id}")
    @SubwayJsonLogging(description = "아이디 기준 지하철 노선 조회(/lines/{id})")
    public ResponseEntity<LineResponse> findLineById(@PathVariable Long id) {
        return ResponseEntity.ok(lineService.findLineResponseById(id));
    }

    @PutMapping("/{id}")
    @SubwayFileLogging(description = "아이디 기준 지하철 노선 수정(/lines/{id})")
    public ResponseEntity updateLine(@PathVariable Long id, @RequestBody LineRequest lineUpdateRequest) {
        lineService.updateLine(id, lineUpdateRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @SubwayFileLogging(description = "아이디 기준 지하철 노선 삭제(/lines/{id})")
    public ResponseEntity deleteLine(@PathVariable Long id) {
        lineService.deleteLineById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{lineId}/sections")
    @SubwayFileLogging(description = "지하철 노선 구간 추가(/lines//{lineId}/sections)")
    public ResponseEntity addLineStation(@PathVariable Long lineId, @RequestBody SectionRequest sectionRequest) {
        lineService.addLineStation(lineId, sectionRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{lineId}/sections")
    @SubwayFileLogging(description = "지하철 노선 구간 삭제(/lines//{lineId}/sections)")
    public ResponseEntity removeLineStation(@PathVariable Long lineId, @RequestParam Long stationId) {
        lineService.removeLineStation(lineId, stationId);
        return ResponseEntity.ok().build();
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
