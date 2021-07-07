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
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    public SubwayPath findPath(List<Line> lines, Station source, Station target) {
        SubwayGraph graph = new SubwayGraph(SectionEdge.class);
        fileLogger.info("[MapService][findPath][Before:addVertexWith]");
        graph.addVertexWith(lines);
        fileLogger.info("[MapService][findPath][Before:addEdge]");
        graph.addEdge(lines);

        // 다익스트라 최단 경로 찾기
        DijkstraShortestPath dijkstraShortestPath = new DijkstraShortestPath(graph);
        fileLogger.info("[MapService][findPath][Before:getPath]");
        GraphPath<Station, SectionEdge> path = dijkstraShortestPath.getPath(source, target);

        fileLogger.info("[MapService][findPath][Before:convertSubwayPath]");
        return convertSubwayPath(path);
    }

    private SubwayPath convertSubwayPath(GraphPath graphPath) {
        List<SectionEdge> edges = (List<SectionEdge>) graphPath.getEdgeList().stream().collect(Collectors.toList());
        List<Station> stations = graphPath.getVertexList();
        return new SubwayPath(edges, stations);
    }
}
