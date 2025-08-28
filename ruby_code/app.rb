#!/usr/bin/env ruby
# frozen_string_literal: true

require 'sinatra'
require 'json'

# Sinatraアプリケーションの設定
set :port, 8001
set :bind, '0.0.0.0'

# ルートエンドポイント
get '/' do
  content_type :json
  {
    message: 'Hello, Docker!',
    status: 'success',
    ruby_version: RUBY_VERSION,
    platform: RUBY_PLATFORM
  }.to_json
end

# ヘルスチェックエンドポイント
get '/health' do
  content_type :json
  {
    status: 'healthy',
    service: 'ruby-app'
  }.to_json
end

# アプリケーション情報エンドポイント
get '/info' do
  content_type :json
  {
    app_name: 'Ruby Docker App',
    environment: ENV['RACK_ENV'] || 'production',
    port: 8001
  }.to_json
end

# 数値計算エンドポイント（Rubyの特徴を活かす）
get '/calculate/:operation/:a/:b' do
  content_type :json
  a = params[:a].to_f
  b = params[:b].to_f
  operation = params[:operation]

  result = case operation
           when 'add'
             a + b
           when 'subtract'
             a - b
           when 'multiply'
             a * b
           when 'divide'
             b.zero? ? 'Error: Division by zero' : a / b
           else
             'Error: Invalid operation'
           end

  {
    operation: operation,
    a: a,
    b: b,
    result: result
  }.to_json
end

puts "Rubyアプリケーションが起動しました！ポート #{settings.port} でリッスン中..."
