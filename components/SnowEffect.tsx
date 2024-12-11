export const SnowEffect = ({ intensity }) => {
  const getSnowflakeCount = () => {
    switch (intensity) {
      case "小雪": case "小到中雪": return 50
      case "中雪": case "中到大雪": return 100
      case "大雪": case "大到暴雪": case "暴雪": return 150
      default: return 100
    }
  }

  return (
    <div className="snow-container absolute inset-0 pointer-events-none">
      {[...Array(getSnowflakeCount())].map((_, i) => (
        <div
          key={i}
          className="snowflake absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            animationDuration: `${5 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes snowfall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .snowflake {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  )
}

