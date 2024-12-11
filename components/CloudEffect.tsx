export const CloudEffect = () => (
  <div className="cloud-container absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="cloud absolute"
        style={{
          top: `${20 + Math.random() * 40}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.6 + Math.random() * 0.2,
          animationDuration: `${20 + Math.random() * 10}s`,
          animationDelay: `${Math.random() * -20}s`
        }}
      >
        <div className="cloud-base" />
        <div className="cloud-circle-1" />
        <div className="cloud-circle-2" />
        <div className="cloud-circle-3" />
      </div>
    ))}
    <style jsx>{`
      @keyframes float {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100vw);
        }
      }

      .cloud {
        position: absolute;
        animation: float linear infinite;
      }

      .cloud-base {
        position: absolute;
        width: 100px;
        height: 30px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 15px;
      }

      .cloud-circle-1 {
        position: absolute;
        top: -20px;
        left: 15px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
      }

      .cloud-circle-2 {
        position: absolute;
        top: -30px;
        left: 35px;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
      }

      .cloud-circle-3 {
        position: absolute;
        top: -20px;
        left: 55px;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
      }
    `}</style>
  </div>
)