export default function MessageBubble({ text, isBot = true }: { text: string; isBot?: boolean }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
          isBot
            ? 'bg-white text-gray-900 rounded-bl-md shadow-sm'
            : 'bg-[#DCF8C6] text-gray-900 rounded-br-md'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
