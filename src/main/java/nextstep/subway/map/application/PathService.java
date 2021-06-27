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

@Service
public class PathService {
    private static final Logger log = LoggerFactory.getLogger(PathService.class);
    private static final Logger fileLog = LoggerFactory.getLogger("file");
    private static final Logger consoleLog = LoggerFactory.getLogger("console");
    private static final Logger jsonLog = LoggerFactory.getLogger("json");

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {
        log.info("다익스트라 최단 경로 찾기");
        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        log.info("1. graph", graph);
        fileLog.info("1. graph", graph);
        consoleLog.info("1. graph", graph);
        jsonLog.info("1. graph", graph);
        graph.addVertexWith(lines);
        log.info("2. graph", graph);
        graph.addEdge(lines);
        log.info("3. graph", graph);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        log.info("4. dijkstraShortestPath", dijkstraShortestPath);
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);
        log.info("5. path", path);

        return convertSubwayPath(path);
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
