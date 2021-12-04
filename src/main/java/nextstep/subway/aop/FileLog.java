package nextstep.subway.aop;

import java.lang.annotation.*;

@Inherited
@Retention(value = RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface FileLog {
}
