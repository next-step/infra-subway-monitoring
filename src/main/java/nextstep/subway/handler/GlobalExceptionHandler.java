package nextstep.subway.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import nextstep.subway.auth.application.AuthorizationException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity runtimeExceptionHandler(RuntimeException e) {
        fileLogger.error("{}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity authorizationExceptionHandler(Exception e) {
        fileLogger.error("{}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
