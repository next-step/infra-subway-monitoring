package nextstep.subway.line.ui;

import java.net.URI;
import java.util.List;
import java.util.function.IntUnaryOperator;
import java.util.stream.IntStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import nextstep.subway.line.application.LineService;
import nextstep.subway.line.dto.LineRequest;
import nextstep.subway.line.dto.LineResponse;
import nextstep.subway.line.dto.SectionRequest;

@RestController
@RequestMapping("/lines")
public class LineController {
	private final LineService lineService;
	private static final Logger logger = LoggerFactory.getLogger(LineController.class);

	public LineController(final LineService lineService) {
		this.lineService = lineService;
	}

	@PostMapping
	public ResponseEntity createLine(@RequestBody LineRequest lineRequest) {
		logger.info("LineController.createLine request : {}", lineRequest);
		LineResponse line = lineService.saveLine(lineRequest);
		logger.info("LineController.createLine response : {}", line);
		return ResponseEntity.created(URI.create("/lines/" + line.getId())).body(line);
	}

	@GetMapping
	public ResponseEntity<List<LineResponse>> findAllLines() {
		List<LineResponse> lineResponses = lineService.findLineResponses();
		logger.info("LineController.findAllLines response : {}", lineResponses);
		return ResponseEntity.ok(lineResponses);
	}

	@GetMapping("/{id}")
	public ResponseEntity<LineResponse> findLineById(@PathVariable Long id) {
		logger.info("LineController.findLineById request : {}", id);
		LineResponse lineResponse = lineService.findLineResponseById(id);
		logger.info("LineController.findLineById response : {}", lineResponse);
		return ResponseEntity.ok(lineService.findLineResponseById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity updateLine(@PathVariable Long id, @RequestBody LineRequest lineUpdateRequest) {
		logger.info("LineController.updateLine request : {}", lineUpdateRequest);
		lineService.updateLine(id, lineUpdateRequest);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteLine(@PathVariable Long id) {
		logger.info("LineController.deleteLine request : {}", id);
		lineService.deleteLineById(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/{lineId}/sections")
	public ResponseEntity addLineStation(@PathVariable Long lineId, @RequestBody SectionRequest sectionRequest) {
		logger.info("LineController.addLineStation lineId : {}, request : {}", lineId, sectionRequest);
		lineService.addLineStation(lineId, sectionRequest);
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/{lineId}/sections")
	public ResponseEntity removeLineStation(@PathVariable Long lineId, @RequestParam Long stationId) {
		logger.info("LineController.removeLineStation lineId : {}, stationId : {}", lineId, stationId);
		lineService.removeLineStation(lineId, stationId);
		return ResponseEntity.ok().build();
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
		return ResponseEntity.badRequest().build();
	}

	@GetMapping("/lock-left")
	public String findLockLeft() throws InterruptedException {
		return "ok";
	}

	@GetMapping("/lock-right")
	public String findLockRight() throws InterruptedException {
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
		return operand -> (int)Math.tan(value);
	}

}
