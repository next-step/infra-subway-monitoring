package nextstep.subway.map.domain;

import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

public class PathCache {

    private static Map<String, SubwayPath> subwayPathCache = new HashMap<>();

    public static SubwayPath findPath(Long source, Long target) {
        String key = makeKey(source, target);
        if (subwayPathCache.containsKey(key)) {
            return subwayPathCache.get(key);
        }

        String reverseKey = makeKey(target, source);
        if (subwayPathCache.containsKey(reverseKey)) {
            return subwayPathCache.get(reverseKey);
        }

        return null;
    }

    public static void addCacheData(Long source, Long target, SubwayPath subwayPath) {
        String key = makeKey(source, target);
        subwayPathCache.put(key, subwayPath);
    }

    private static String makeKey(Long source, Long target) {
        StringJoiner sj = new StringJoiner("_");
        sj.add(String.valueOf(source));
        sj.add(String.valueOf(target));
        return sj.toString();
    }

    public static void resetCache() {
        subwayPathCache.clear();
    }
}
