#!/usr/bin/env python3
"""
ResumeAI PRO — Backend Server
Serves static frontend assets and provides REST API for ATS resume analysis.
Allows easy access from both laptop and mobile phone over the local network.
"""

import http.server
import socketserver
import socket
import json
import webbrowser
import os
import sys
import re

# Ensure safe UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def get_local_ip():
    """Retrieve local network IP for mobile device access."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class ResumeAIRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/status":
            self.send_json_response({"status": "online", "version": "2.0.0"})
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == "/api/analyze":
            self.handle_analyze()
        elif self.path == "/api/status":
            self.send_json_response({"status": "online", "version": "2.0.0"})
        else:
            self.send_error(404, "Endpoint not found")

    def handle_analyze(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            payload = json.loads(post_data.decode("utf-8"))

            resume_text = payload.get("resumeText", "")
            target_pos = payload.get("targetPosition", "Full Stack Developer")
            target_comp = payload.get("targetCompany", "Google")
            job_desc = payload.get("jobDescription", "")

            score = 0
            text_lower = resume_text.lower()

            if "@" in text_lower: score += 10
            if "project" in text_lower: score += 15
            if "education" in text_lower or "degree" in text_lower: score += 15
            if "experience" in text_lower or "intern" in text_lower: score += 20
            if "skill" in text_lower or "python" in text_lower or "javascript" in text_lower: score += 20

            impact_matches = re.findall(r'\b\d+%\b|\$\d+|\b\d+\s*(users|latency|reduction|increase|improvement|scale)\b', text_lower)
            if len(impact_matches) >= 3:
                score += 15
            elif len(impact_matches) >= 1:
                score += 8

            score = min(score + 5, 100)

            response = {
                "success": True,
                "score": score,
                "targetPosition": target_pos,
                "targetCompany": target_comp,
                "impactMetricsDetected": len(impact_matches),
                "serverProcessed": True
            }
            self.send_json_response(response)

        except Exception as e:
            self.send_json_response({"success": False, "error": str(e)}, status=400)

    def send_json_response(self, data, status=200):
        response_bytes = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(response_bytes)))
        self.end_headers()
        self.wfile.write(response_bytes)

def start_server():
    os.chdir(DIRECTORY)
    local_ip = get_local_ip()

    print("\n" + "=" * 65)
    print(" [+] ResumeAI PRO -- Executive Server Running")
    print("=" * 65)
    print(f" * Local Laptop URL:   http://localhost:{PORT}")
    print(f" * Mobile Phone URL:   http://{local_ip}:{PORT}")
    print("-" * 65)
    print(" [*] To use on your Phone:")
    print(f"     1. Connect phone to the same Wi-Fi network as this laptop.")
    print(f"     2. Open phone browser and visit: http://{local_ip}:{PORT}")
    print("-" * 65)
    print(" Press Ctrl+C in this window anytime to stop the server.")
    print("=" * 65 + "\n")

    if os.environ.get("NO_BROWSER") != "1":
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ResumeAIRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down ResumeAI Pro server...")
            httpd.server_close()

if __name__ == "__main__":
    start_server()
