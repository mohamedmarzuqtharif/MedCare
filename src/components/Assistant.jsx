import React, { useState } from 'react';
import { Stethoscope, X } from 'lucide-react';

const Assistant = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m MedCare Assistant. Ask me anything.' },
  ]);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantTyping, setAssistantTyping] = useState(false);
  
  // Restored state for OpenAI connection
  const [assistantProvider, setAssistantProvider] = useState('local'); // Default to local
  const [assistantModel, setAssistantModel] = useState('gpt-4o-mini');
  const [assistantApiKey, setAssistantApiKey] = useState('');
  const [region] = useState('Odisha');

  // Rules-based fallback
  const getAssistantReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('sos')) return 'To trigger SOS, press the big red SOS button on the dashboard.';
    if (lower.includes('hospital')) return 'Nearby (Odisha): SUM Ultimate Medicare, Bhubaneswar; SCB Medical College, Cuttack.';
    if (lower.includes('vaccine')) return 'Odisha Vaccines: DPT Booster due Sept 28, 2025; Influenza Shot due Oct 05, 2025.';
    if (lower.includes('news')) return 'Odisha News: Malaria cases decline; maternal health program outreach expanded.';
    return 'I can help with hospitals, vaccines, and news. How can I assist you?';
  };

  // Restored function to call the OpenAI API
  const callLLM = async (messages) => {
    // IMPORTANT: See security warning below
    if (!assistantApiKey) return null;
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${assistantApiKey}`,
        },
        body: JSON.stringify({
          model: assistantModel,
          messages: messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.text })),
          temperature: 0.7,
        }),
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      return data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (e) {
      console.error("Failed to call OpenAI API:", e);
      return 'There was an error connecting to the AI service.';
    }
  };

  // Restored send message logic
  const sendAssistantMessage = async () => {
    const text = assistantInput.trim();
    if (!text) return;
    const userMsg = { role: 'user', text };
    setAssistantMessages((msgs) => [...msgs, userMsg]);
    setAssistantInput('');
    setAssistantTyping(true);

    let content = null;
    // If provider is OpenAI and key exists, call the API
    if (assistantProvider === 'openai' && assistantApiKey) {
      content = await callLLM([...assistantMessages, userMsg]);
    }
    
    // If there was no API response, use the local fallback
    if (!content) {
      content = getAssistantReply(text);
    }
    
    setAssistantMessages((msgs) => [...msgs, { role: 'assistant', text: content }]);
    setAssistantTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isAssistantOpen && (
        <div className="mb-3 w-80 h-96 bg-white border border-gray-200 rounded-xl shadow-xl flex flex-col">
          <div className="px-4 py-2 border-b flex items-center justify-between">
            <span className="font-semibold text-gray-800">MedCare Assistant</span>
            <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsAssistantOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Restored UI for API Key and Model Selection */}
          <div className="px-3 py-2 flex items-center gap-2 border-b">
            <select value={assistantProvider} onChange={(e) => setAssistantProvider(e.target.value)} className="text-xs border rounded px-2 py-1">
              <option value="local">Offline (Rules-based)</option>
              <option value="openai">OpenAI</option>
            </select>
            <input value={assistantModel} onChange={(e) => setAssistantModel(e.target.value)} className="flex-1 text-xs border rounded px-2 py-1" placeholder="Model (e.g., gpt-4o-mini)" />
          </div>
          <div className="px-3 py-2 flex items-center gap-2 border-b">
            <input value={assistantApiKey} onChange={(e) => setAssistantApiKey(e.target.value)} type="password" className="w-full text-xs border rounded px-2 py-1" placeholder="OpenAI API Key (optional)" />
          </div>
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm text-gray-700">
            {assistantMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-2 max-w-[85%]`}>
                  {m.text}
                </div>
              </div>
            ))}
            {assistantTyping && <div className="text-xs text-gray-500">Assistant is typing...</div>}
          </div>
          <div className="p-2 border-t flex items-center gap-2">
            <input
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendAssistantMessage(); }}
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
              placeholder="Type a message..."
            />
            <button onClick={sendAssistantMessage} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsAssistantOpen((v) => !v)} className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl flex items-center justify-center" title="Open AI Assistant">
        <Stethoscope className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Assistant;