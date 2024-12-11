export const SunEffect = () => (
  <div className="sun-container absolute inset-0 pointer-events-none overflow-hidden">
    <div className="sun absolute top-10 right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-75 shadow-lg">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="sun-ray absolute top-1/2 left-1/2 bg-yellow-100"
          style={{
            width: '140%',
            height: '2px',
            transform: `rotate(${i * 30}deg) translateX(70px)`,
          }}
        />
      ))}
    </div>
    <style jsx>{`
      @keyframes rotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.1); opacity: 1; }
      }
      .sun-container {
        animation: rotate 60s linear infinite;
      }
      .sun {
        animation: pulse 3s ease-in-out infinite;
      }
      .sun-ray {
        animation: pulse 3s ease-in-out infinite;
      }
    `}</style>
  </div>
)

