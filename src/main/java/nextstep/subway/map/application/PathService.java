package nextstep.subway.map.application;

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

import static net.logstash.logback.argument.StructuredArguments.kv;

@Service
public class PathService {
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger("file");
    private static final Logger JSON_LOGGER = LoggerFactory.getLogger("json");

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {
        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        graph.addVertexWith(lines);
        graph.addEdge(lines);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);
        SubwayPath subwayPath = convertSubwayPath(path);

        JSON_LOGGER.info("{}, {}, {}, {}",
                kv("출발지", source.getName()),
                kv("도착지", target.getName()),
                kv("경로", subwayPath.getStations().toString()),
                kv("거리", subwayPath.calculateDistance())
        );

        return subwayPath;
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
