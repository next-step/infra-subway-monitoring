package nextstep.subway.map.application;

import nextstep.subway.line.domain.Line;
import nextstep.subway.common.log.Loggers;
import nextstep.subway.map.domain.SectionEdge;
import nextstep.subway.map.domain.SubwayGraph;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.domain.Station;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Service
public class PathService {
    private static final Logger LOGGER = Loggers.JSON.logger();

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {
        LOGGER.info("최단경로조회 - {}, {}",
                kv("출발역", source.getName()),
                kv("도착역", target.getName())
        );
        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        graph.addVertexWith(lines);
        graph.addEdge(lines);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);

        SubwayPath subwayPath = convertSubwayPath(path);
        if(LOGGER.isDebugEnabled()) {
            LOGGER.debug("최단경로조회 결과 - {}, {}, {}",
                    kv("출발역", source.getName()),
                    kv("도착역", target.getName()),
                    kv("경로", path.toString())
            );
        }

        return subwayPath;
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
