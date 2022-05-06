package nextstep.subway.common;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target(value = {ElementType.METHOD})
@Retention(RetentionPolicy.CLASS)
public @interface Loggable {

    boolean privacy();
}




