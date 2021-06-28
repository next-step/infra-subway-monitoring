package nextstep.subway.common.log;

import java.lang.reflect.Parameter;

public class Argument {
	private final String type;
	private final String name;
	private final Object value;

	public Argument(String type, String name, Object value) {
		this.type = type;
		this.name = name;
		this.value = value;
	}

	static Argument of(Parameter parameter, Object value) {
		String simpleName = parameter.getType().getSimpleName();
		return new Argument(simpleName, parameter.getName(), value);
	}

	@Override
	public String toString() {
		return String.format("%s{%s=%s}", type, name, value);
	}
}
