package nextstep.subway.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger("file");

    //예상하지 못한 예외를 담당해서 ERROR 로그를 찍는다. 예상한 예외는 이 클래스에서 따로 관리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnExpectedException(Exception e, WebRequest request) {
        log.error("Unexpected Expection", e);
        return handleExceptionInternal(e, null, new HttpHeaders(),
                HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}
