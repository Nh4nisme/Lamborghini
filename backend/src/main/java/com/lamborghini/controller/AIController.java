package com.lamborghini.controller;

import com.lamborghini.config.AIRateLimiter;
import com.lamborghini.dto.ai.reponse.ChatResponse;
import com.lamborghini.dto.ai.request.ChatRequest;
import com.lamborghini.service.AIAssistant.AIIndexService;
import com.lamborghini.service.AIAssistant.AIService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Flux;

import java.util.Map;


@RestController
@RequestMapping("/api/ai-assistant")
@RequiredArgsConstructor
@Validated

public class AIController {
    private final AIService aiService;
    private final AIIndexService aiIndexService;
    private final AIRateLimiter rateLimiter;

    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request,
                                             HttpServletRequest http) {
        if (!rateLimiter.allowRequest(http.getRemoteAddr())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).build();
        }
        return ResponseEntity.ok(aiService.chat(request));
    }

    @GetMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> chatStream(@RequestParam @NotBlank @Size(max = 500) String message,
                                   @RequestParam @NotBlank String sessionId,
                                   HttpServletRequest http) {
        if (!rateLimiter.allowRequest(http.getRemoteAddr())) {
            return Flux.error(new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS));
        }
        return aiService.chatStream(message, sessionId);
    }

    // Lập chỉ mục lại Vector Store từ database. Chỉ cho vai trò quản trị (xem mục B7.3)
    @PostMapping("/reindex")
    public ResponseEntity<Map<String, Integer>> reindex() {
        return ResponseEntity.ok(Map.of("indexed", aiIndexService.reindexAll()));
    }

    @DeleteMapping("/session/{sessionId}")
    public ResponseEntity<Void> clearSession(@PathVariable String sessionId) {
        aiService.clearSession(sessionId);
        return ResponseEntity.noContent().build();
    }

}
