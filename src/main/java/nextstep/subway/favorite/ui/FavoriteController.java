package nextstep.subway.favorite.ui;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nextstep.subway.auth.domain.AuthenticationPrincipal;
import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.favorite.application.FavoriteService;
import nextstep.subway.favorite.dto.FavoriteRequest;
import nextstep.subway.favorite.dto.FavoriteResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

import static nextstep.subway.common.LogUtils.fileLog;

@RestController
public class FavoriteController {

    private final FavoriteService favoriteService;
    private final ObjectMapper objectMapper;

    public FavoriteController(FavoriteService favoriteService, ObjectMapper objectMapper) {
        this.favoriteService = favoriteService;
        this.objectMapper = objectMapper;
    }

    @PostMapping("/favorites")
    public ResponseEntity createFavorite(@AuthenticationPrincipal LoginMember loginMember,
                                         @RequestBody FavoriteRequest request) throws JsonProcessingException {
        fileLog.info("MemberId: {} / FavoriteRequest: {}", loginMember.getId(), objectMapper.writeValueAsString(request));
        favoriteService.createFavorite(loginMember, request);
        return ResponseEntity
                .created(URI.create("/favorites/" + 1L))
                .build();
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<FavoriteResponse>> getFavorites(
            @AuthenticationPrincipal LoginMember loginMember) throws JsonProcessingException {
        fileLog.info("MemberId: {}", loginMember.getId());
        List<FavoriteResponse> favorites = favoriteService.findFavorites(loginMember);
        fileLog.info("Favorites: {}", objectMapper.writeValueAsString(favorites));
        return ResponseEntity.ok().body(favorites);
    }

    @DeleteMapping("/favorites/{id}")
    public ResponseEntity deleteFavorite(@AuthenticationPrincipal LoginMember loginMember, @PathVariable Long id) throws JsonProcessingException {
        fileLog.info("MemberId: {} / FavoriteId: {}", loginMember.getId(), id);
        favoriteService.deleteFavorite(loginMember, id);
        return ResponseEntity.noContent().build();
    }
}
