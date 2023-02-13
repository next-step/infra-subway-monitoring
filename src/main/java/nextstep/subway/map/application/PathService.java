package nextstep.subway.map.application;

import static net.logstash.logback.argument.StructuredArguments.*;

import java.util.List;
import java.util.stream.Collectors;

import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import nextstep.subway.line.domain.Line;
import nextstep.subway.map.domain.SectionEdge;
import nextstep.subway.map.domain.SubwayGraph;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.domain.Station;

@Slf4j
@Service
public class PathService {
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {
        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        graph.addVertexWith(lines);
        graph.addEdge(lines);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);

        log.info("{}, {}",
            kv("출발지", source.getName()),
            kv("도착지", target.getName())
        );
        jsonLogger.info("{}, {}",
            kv("출발지", source.getName()),
            kv("도착지", target.getName())
        );

        return convertSubwayPath(path);
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
