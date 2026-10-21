#!/bin/sh
# Starts or restarts the dev server in the background.
#   scripts/dev-server.sh [start|stop|restart]   (log: data/server.log)
set -e
cd "$(dirname "$0")/.."
mkdir -p data
PIDFILE=data/server.pid
stop() {
	if [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; then
		kill "$(cat "$PIDFILE")"
		while kill -0 "$(cat "$PIDFILE")" 2>/dev/null; do sleep 0.2; done
	fi
	rm -f "$PIDFILE"
}
start() {
	nohup bun src/server.ts >> data/server.log 2>&1 &
	echo $! > "$PIDFILE"
	for _ in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do
		curl -sf -o /dev/null "http://localhost:${PORT:-8080}/robots.txt" && { echo "server up (pid $(cat "$PIDFILE"))"; return 0; }
		sleep 0.5
	done
	echo "server did not start; see data/server.log"; tail -20 data/server.log; return 1
}
case "${1:-restart}" in
	start) start ;;
	stop) stop ;;
	restart) stop; start ;;
esac
