package nextstep.subway.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SubwayLogger {
    private static final String LOG_PRINT_MESSAGE = "in {}.{} : {}ms : param [{}] : return [{}]";
    private static final String ERROR_LOG_PRINT_MESSAGE = "exception {} : in {}.{} : message [{}] : param [{}]";
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger consoleLogger = LoggerFactory.getLogger("console");

    private SubwayLogger() {
    }

    public static void fileInfo(final String classPath, final String methodName, final long runTime, final String param,
                                final String result) {
        fileLogger.info(LOG_PRINT_MESSAGE, classPath, methodName, runTime, param, result);
    }

    public static void fileDebug(final String classPath, final String methodName, final long runTime, final String param,
                                final String result) {
        fileLogger.debug(LOG_PRINT_MESSAGE, classPath, methodName, runTime, param, result);
    }

    public static void fileWarn(final String classPath, final String methodName, final String exceptionType,
                                 final String message, final String param) {
        fileLogger.warn(ERROR_LOG_PRINT_MESSAGE, exceptionType, classPath, methodName, message, param);
    }

    public static void fileError(final String classPath, final String methodName, final String exceptionType,
                                final String message, final String param) {
        fileLogger.warn(ERROR_LOG_PRINT_MESSAGE, exceptionType, classPath, methodName, message, param);
    }

    public static void jsonInfo(final String classPath, final String methodName, final long runTime, final String param,
                                final String result) {
        jsonLogger.info(LOG_PRINT_MESSAGE, classPath, methodName, runTime, param, result);
    }

    public static void jsonError(final String classPath, final String methodName, final String exceptionType,
                                final String message, final String param) {
        jsonLogger.error(ERROR_LOG_PRINT_MESSAGE, exceptionType, classPath, methodName, message, param);
    }

    public static void consoleTrace(final String classPath, final String methodName, final long runTime, final String param,
                                    final String result) {
        consoleLogger.trace(LOG_PRINT_MESSAGE, classPath, methodName, runTime, param, result);
    }
}
