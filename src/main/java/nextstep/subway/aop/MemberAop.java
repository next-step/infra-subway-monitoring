package nextstep.subway.aop;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Aspect
@Component
public class MemberAop {
    private static final Logger logger = LoggerFactory.getLogger(MemberAop.class);

    @AfterReturning(pointcut="execution(* nextstep.subway.member.ui.MemberController.createMember(..))", returning="retVal")
    public void createdMemberId(Object retVal) {
         logger.info("created member id : {}", getCreatedMemberId((ResponseEntity)retVal));
    }

    private String getCreatedMemberId(ResponseEntity entity) {
        List<String> location = entity.getHeaders().get("Location");
        return location.get(0).split("/")[2];
    }
}
