package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// Response レスポンス用の構造体
type Response struct {
	Message     string      `json:"message,omitempty"`
	Status      string      `json:"status,omitempty"`
	Service     string      `json:"service,omitempty"`
	AppName     string      `json:"app_name,omitempty"`
	Environment string      `json:"environment,omitempty"`
	Port        int         `json:"port,omitempty"`
	GoVersion   string      `json:"go_version,omitempty"`
	Platform    string      `json:"platform,omitempty"`
	Operation   string      `json:"operation,omitempty"`
	A           float64     `json:"a,omitempty"`
	B           float64     `json:"b,omitempty"`
	Result      interface{} `json:"result,omitempty"`
}

// ルートエンドポイント
func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	response := Response{
		Message:   "Hello, Docker!",
		Status:    "success",
		GoVersion: "1.21.0", // 実際のバージョンは実行時に取得
		Platform:  "linux/amd64",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// ヘルスチェックエンドポイント
func healthHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{
		Status:  "healthy",
		Service: "go-app",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// アプリケーション情報エンドポイント
func infoHandler(w http.ResponseWriter, r *http.Request) {
	response := Response{
		AppName:     "Go Docker App",
		Environment: getEnv("APP_ENV", "production"),
		Port:        8003,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// 計算エンドポイント
func calculateHandler(w http.ResponseWriter, r *http.Request) {
	path := strings.TrimPrefix(r.URL.Path, "/calculate/")
	parts := strings.Split(path, "/")

	if len(parts) != 3 {
		http.Error(w, "Invalid path format", http.StatusBadRequest)
		return
	}

	operation := parts[0]
	a, errA := strconv.ParseFloat(parts[1], 64)
	b, errB := strconv.ParseFloat(parts[2], 64)

	if errA != nil || errB != nil {
		http.Error(w, "Invalid numbers", http.StatusBadRequest)
		return
	}

	var result interface{}
	switch operation {
	case "add":
		result = a + b
	case "subtract":
		result = a - b
	case "multiply":
		result = a * b
	case "divide":
		if b == 0 {
			result = "Error: Division by zero"
		} else {
			result = a / b
		}
	default:
		result = "Error: Invalid operation"
	}

	response := Response{
		Operation: operation,
		A:         a,
		B:         b,
		Result:    result,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// 環境変数を取得するヘルパー関数
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func main() {
	// ルーティング設定
	http.HandleFunc("/", helloHandler)
	http.HandleFunc("/health", healthHandler)
	http.HandleFunc("/info", infoHandler)
	http.HandleFunc("/calculate/", calculateHandler)

	port := 8003
	fmt.Printf("Goアプリケーションが起動しました！ポート %d でリッスン中...\n", port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
