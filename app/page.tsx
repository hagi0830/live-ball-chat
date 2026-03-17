"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Supabase 연결 설정 (아까 만든 .env.local의 열쇠를 가져옵니다)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");

  // 2. 실시간 메시지 가져오기 설정
  useEffect(() => {
    // 처음에 저장되어 있는 메시지들 불러오기
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();

    // 새로운 메시지가 오면 실시간으로 화면에 보여주기
    const channel = supabase
      .channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 3. 메시지 전송 함수
  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const { error } = await supabase.from('messages').insert([
      { 
        username: "준학", 
        country: "🇰🇷", 
        content: inputText 
      }
    ]);

    if (!error) setInputText("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <header className="border-b border-gray-700 pb-4 mb-4">
        <h1 className="text-2xl font-bold text-green-400">LiveBallChat.com</h1>
        <p className="text-sm text-gray-400">실시간 채팅 테스트 중...</p>
      </header>

      {/* 채팅 목록 */}
      <div className="flex-1 overflow-y-auto space-y-3 bg-black/30 p-4 rounded-lg">
        {messages.map((msg: any) => (
          <div key={msg.id} className="flex items-center gap-2">
            <span className="text-lg">{msg.country}</span>
            <span className="font-bold text-blue-400">{msg.username}:</span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="mt-4 flex gap-2">
        <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2" 
          placeholder="메시지를 입력하세요..." 
        />
        <button onClick={sendMessage} className="bg-green-500 px-6 py-2 rounded-lg font-bold">전송</button>
      </div>
    </div>
  );
}