"use client";
import React, { useState } from 'react';

export default function Home() { // 이름을 Home으로 바꿔서 메인 페이지로 설정합니다.
  const [delay, setDelay] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, user: "JunHak", country: "🇰🇷", text: "오늘 경기 대박이네요!" },
    { id: 2, user: "Alex", country: "🇬🇧", text: "Heung-Min Son is amazing!" }
  ]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      {/* 상단 헤더 */}
      <header className="border-b border-gray-700 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-green-400">LiveBallChat.com</h1>
        <p className="text-sm text-gray-400">전 세계 팬들과 실시간으로 소통하세요</p>
      </header>

      {/* 딜레이 설정 섹션 */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <label className="block text-sm font-medium mb-2">
          ⏱ 내 중계 딜레이 설정: <span className="text-yellow-400">{delay}초</span>
        </label>
        <input 
          type="range" min="0" max="60" value={delay} 
          onChange={(e) => setDelay(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-2">* 설정한 시간만큼 채팅이 천천히 올라와 스포일러를 방지합니다.</p>
      </div>

      {/* 채팅창 */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-black/30 p-4 rounded-lg">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-center gap-2">
            <span className="text-lg">{msg.country}</span>
            <span className="font-bold text-blue-400">{msg.user}:</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="mt-4 flex gap-2">
        <input className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500" placeholder="메시지를 입력하세요..." />
        <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-bold">전송</button>
      </div>
    </div>
  );
}