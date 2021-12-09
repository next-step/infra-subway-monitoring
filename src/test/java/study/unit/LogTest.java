package study.unit;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogTest {

	private static final Logger fileLogger = LoggerFactory.getLogger("file");
	private static final Logger jsonLogger = LoggerFactory.getLogger("json");
	private static final Logger consoleLogger = LoggerFactory.getLogger("console");

	@Test
	void fileLogTest(){
		// log.info("일반 로그 테스트");
		fileLogger.trace("{}  trace 로그 테스트","fileLogger");
		fileLogger.debug("{}  debug 로그 테스트","fileLogger");
		fileLogger.info("{}  info 로그 테스트","fileLogger");
		fileLogger.warn("{}  warn 로그 테스트","fileLogger");
		fileLogger.error("{}  error 로그 테스트","fileLogger");
	}

	@Test
	void jsonLogTest(){
		// log.info("일반 로그 테스트");
		jsonLogger.trace("{}  trace 로그 테스트","jsonLog");
		jsonLogger.debug("{}  debug 로그 테스트","jsonLog");
		jsonLogger.info("{}  info 로그 테스트","jsonLog");
		jsonLogger.warn("{}  warn 로그 테스트","jsonLog");
		jsonLogger.error("{}  error 로그 테스트","jsonLog");
	}

	@Test
	void consoleLogTest(){
		// log.info("일반 로그 테스트");
		consoleLogger.trace("{}  trace 로그 테스트","consoleLog");
		consoleLogger.debug("{}  debug 로그 테스트","consoleLog");
		consoleLogger.info("{}  info 로그 테스트","consoleLog");
		consoleLogger.warn("{}  warn 로그 테스트","consoleLog");
		consoleLogger.error("{}  error 로그 테스트","consoleLog");
	}


}
