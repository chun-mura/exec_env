#!/usr/bin/env python3
"""
サンプルFlaskアプリケーション
"""

from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def hello():
    """ルートエンドポイント"""
    return jsonify({
        'message': 'Hello, Docker!',
        'status': 'success',
        'python_version': os.sys.version
    })

@app.route('/health')
def health():
    """ヘルスチェックエンドポイント"""
    return jsonify({
        'status': 'healthy',
        'service': 'python-app'
    })

@app.route('/info')
def info():
    """アプリケーション情報エンドポイント"""
    return jsonify({
        'app_name': 'Python Docker App',
        'environment': os.getenv('FLASK_ENV', 'production'),
        'port': 8000
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
