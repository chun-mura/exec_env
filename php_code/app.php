<?php
/**
 * サンプルPHPアプリケーション
 * Slimフレームワークを使用
 */

require 'vendor/autoload.php';

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Slimアプリケーションの作成
$app = AppFactory::create();

// ミドルウェアの追加
$app->addErrorMiddleware(true, true, true);

// ルートエンドポイント
$app->get('/', function (Request $request, Response $response) {
    $data = [
        'message' => 'Hello, Docker!',
        'status' => 'success',
        'php_version' => PHP_VERSION,
        'platform' => PHP_OS
    ];

    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

// ヘルスチェックエンドポイント
$app->get('/health', function (Request $request, Response $response) {
    $data = [
        'status' => 'healthy',
        'service' => 'php-app'
    ];

    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

// アプリケーション情報エンドポイント
$app->get('/info', function (Request $request, Response $response) {
    $data = [
        'app_name' => 'PHP Docker App',
        'environment' => $_ENV['APP_ENV'] ?? 'production',
        'port' => 8002
    ];

    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

// 数値計算エンドポイント
$app->get('/calculate/{operation}/{a}/{b}', function (Request $request, Response $response, array $args) {
    $operation = $args['operation'];
    $a = (float) $args['a'];
    $b = (float) $args['b'];

    $result = match($operation) {
        'add' => $a + $b,
        'subtract' => $a - $b,
        'multiply' => $a * $b,
        'divide' => $b != 0 ? $a / $b : 'Error: Division by zero',
        default => 'Error: Invalid operation'
    };

    $data = [
        'operation' => $operation,
        'a' => $a,
        'b' => $b,
        'result' => $result
    ];

    $response->getBody()->write(json_encode($data, JSON_PRETTY_PRINT));
    return $response->withHeader('Content-Type', 'application/json');
});

// アプリケーション実行
$app->run();
