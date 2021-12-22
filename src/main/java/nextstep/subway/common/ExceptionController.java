package nextstep.subway.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import nextstep.subway.auth.application.AuthorizationException;
import nextstep.subway.common.exception.SubwayNotFoundException;

@RestControllerAdvice
public class ExceptionController {
    private static final Logger log = LoggerFactory.getLogger(ExceptionController.class);

    @ExceptionHandler(SubwayNotFoundException.class)
    public ResponseEntity<Void> subwayNotFoundExceptionHandler(SubwayNotFoundException e) {
        log.info("요청받은 데이터가 존재하지 않습니다.", e);
        return ResponseEntity.notFound()
            .build();
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<Void> badRequestExceptionHandler(Exception e) {
        log.error("잘못된 요청입니다.", e);

        return ResponseEntity.badRequest()
            .build();
    }

    @ExceptionHandler({AuthorizationException.class})
    public ResponseEntity<Void> unAuthorizedExceptionHandler(Exception e) {
        log.info("접근 권한이 없는 요청입니다.", e);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .build();
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<Void> exceptionHandler(Exception e) {
        log.error("서버 에러입니다. ", e);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .build();
    }
}
