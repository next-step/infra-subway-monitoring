package nextstep.subway.map.application;

import static net.logstash.logback.argument.StructuredArguments.kv;

import nextstep.subway.line.domain.Line;
import nextstep.subway.map.domain.SectionEdge;
import nextstep.subway.map.domain.SubwayGraph;
import nextstep.subway.map.domain.SubwayPath;
import nextstep.subway.station.domain.Station;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PathService {
    private static final Logger logger = LoggerFactory.getLogger(PathService.class);
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {

        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        graph.addVertexWith(lines);
        graph.addEdge(lines);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);

        SubwayPath subwayPath = convertSubwayPath(path);
        findPathLogging(source, target, subwayPath);

        return subwayPath;
    }

    private void findPathLogging(Station source, Station target, SubwayPath subwayPath) {
        logger.info("find shortest path from {} to {}, stations : {}",
                source.getName(),
                target.getName(),
                subwayPath.getStations());
        jsonLogger.info("find shortest path from {} to {}, {}",
                kv("Source", source.getName()),
                kv("Target", target.getName()),
                kv("Stations", subwayPath.getStations()));
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
