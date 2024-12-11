export const CloudEffect = ({ dense = false }: { dense?: boolean }) => {
  const cloudCount = dense ? 12 : 6;
  
  return (
    <div className="cloud-container absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(cloudCount)].map((_, i) => (
        <div
          key={i}
          className="cloud absolute"
          style={{
            top: `${20 + Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            opacity: dense ? (0.7 + Math.random() * 0.2) : (0.6 + Math.random() * 0.2),
            animationDuration: `${20 + Math.random() * 10}s`,
            transform: `scale(${0.8 + Math.random() * 0.4})`,
            filter: `blur(${Math.random() * 2}px)`,
          }}
        >
          <div className="cloud-part" />
          <div className="cloud-part" />
          <div className="cloud-part" />
        </div>
      ))}
      <style jsx>{`
        .cloud {
          animation: float linear infinite;
        }
        
        .cloud-part {
          position: absolute;
          width: 100px;
          height: 40px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .cloud-part:nth-child(1) {
          top: 0;
          left: 0;
        }
        
        .cloud-part:nth-child(2) {
          top: -15px;
          left: 25px;
        }
        
        .cloud-part:nth-child(3) {
          top: -5px;
          left: 50px;
        }
        
        @keyframes float {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120vw);
          }
        }
      `}</style>
    </div>
  );
}