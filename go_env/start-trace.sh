#!/bin/sh

# トレースビューアーを起動するスクリプト
# 使用方法: ./start-trace.sh trace.out

if [ $# -eq 0 ]; then
    echo "Usage: $0 <trace-file>"
    echo "Example: $0 trace.out"
    exit 1
fi

TRACE_FILE=$1

if [ ! -f "$TRACE_FILE" ]; then
    echo "Error: Trace file '$TRACE_FILE' not found"
    exit 1
fi

echo "Starting Go trace viewer for: $TRACE_FILE"
echo "Trace viewer will be available at: http://0.0.0.0:8080"
echo "From host machine, access: http://localhost:8080"

# トレースビューアーを起動（すべてのインターフェースでリッスン）
go tool trace -http=:8080 "$TRACE_FILE"
