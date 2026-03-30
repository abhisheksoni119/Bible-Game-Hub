const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function ChristianAdCreative() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vw",
        maxWidth: "100vh",
        maxHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        background: "#0a0a0a",
        margin: "0 auto",
      }}
    >
      <img
        src={`${baseUrl}/images/divine-light-road.png`}
        alt="Person walking on dark road with divine golden light"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "65%",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "6.5vw",
          left: "6vw",
          right: "6vw",
          display: "flex",
          flexDirection: "column",
          gap: "1.5vw",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            fontSize: "8.5vw",
            lineHeight: 1.08,
            color: "#ffffff",
            margin: 0,
            textShadow:
              "0 0.2vw 3vw rgba(0,0,0,0.7), 0 0.1vw 0.8vw rgba(0,0,0,0.5)",
            letterSpacing: "-0.05vw",
          }}
        >
          God is working…<br />
          <span style={{ color: "#f5c842" }}>even when you</span><br />
          don't see it.
        </h1>

        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 400,
            fontSize: "3vw",
            lineHeight: 1.45,
            color: "rgba(255, 255, 255, 0.88)",
            margin: 0,
            textShadow: "0 0.1vw 1.2vw rgba(0,0,0,0.6)",
            letterSpacing: "0.02vw",
          }}
        >
          Your silence season is not your failure.
        </p>

        <div
          style={{
            width: "5.5vw",
            height: "0.2vw",
            background: "rgba(245, 200, 66, 0.6)",
            marginTop: "0.4vw",
          }}
        />

        <p
          style={{
            fontFamily: "'Inter', Arial, sans-serif",
            fontWeight: 500,
            fontStyle: "italic",
            fontSize: "2vw",
            color: "rgba(245, 200, 66, 0.85)",
            margin: 0,
            textShadow: "0 0.1vw 0.8vw rgba(0,0,0,0.5)",
            letterSpacing: "0.2vw",
          }}
        >
          Romans 8:28
        </p>
      </div>
    </div>
  );
}
