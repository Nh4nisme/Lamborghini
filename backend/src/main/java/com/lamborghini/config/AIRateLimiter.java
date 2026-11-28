package com.lamborghini.config;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class AIRateLimiter {

    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private static final long WINDOW_MS = 60_000;

    private static class Window {
        long start;
        int count;
    }

    private final Map<String, Window> windows = new HashMap<>();

    public synchronized boolean allowRequest(String key) {
        long now = System.currentTimeMillis();
        Window w = windows.get(key);
        if (w == null || now - w.start >= WINDOW_MS) {
            w = new Window();
            w.start = now;
            windows.put(key, w);
        }
        w.count++;
        return w.count <= MAX_REQUESTS_PER_MINUTE;
    }

    // Dọn các cửa sổ đã hết hạn để Map không phình to
    @Scheduled(fixedRate = 300_000)
    public synchronized void cleanup() {
        long now = System.currentTimeMillis();
        windows.entrySet().removeIf(e -> now - e.getValue().start >= WINDOW_MS);
    }
}

