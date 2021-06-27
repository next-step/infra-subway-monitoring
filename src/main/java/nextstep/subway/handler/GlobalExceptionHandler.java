package nextstep.subway.handler;

import nextstep.subway.aop.SubwayLoggingAspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(SubwayLoggingAspect.class);
    private static final Logger fileLog = LoggerFactory.getLogger("file-appender");
    private static final Logger jsonLog = LoggerFactory.getLogger("json-appender");

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error("handleMethodArgumentTypeMismatchException", e);
        fileLog.error("handleMethodArgumentTypeMismatchException", e);
        jsonLog.error("handleMethodArgumentTypeMismatchException", e);
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("handleHttpRequestMethodNotSupportedException", e);
        fileLog.error("handleHttpRequestMethodNotSupportedException", e);
        jsonLog.error("handleHttpRequestMethodNotSupportedException", e);
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).build();
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.error("handleHttpMessageNotReadableException", e);
        fileLog.error("handleHttpMessageNotReadableException", e);
        jsonLog.error("handleHttpMessageNotReadableException", e);
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity handleAccessDeniedException(AccessDeniedException e) {
        log.error("handleHttpMessageNotReadableException", e);
        fileLog.error("handleHttpMessageNotReadableException", e);
        jsonLog.error("handleHttpMessageNotReadableException", e);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity handleIllegalArgsException(DataIntegrityViolationException e) {
        log.error("handleIllegalArgsException", e);
        fileLog.error("handleIllegalArgsException", e);
        jsonLog.error("handleIllegalArgsException", e);
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleException(Exception e) {
        log.error("handleException", e);
        fileLog.error("handleException", e);
        jsonLog.error("handleException", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
