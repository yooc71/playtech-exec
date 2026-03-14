import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RED = "#E30613";
const DARK = "#0D0D0D";
const WHITE = "#FFFFFF";

// ─── Scene 1: Dramatic Opening (frames 0–90) ────────────────────────────────

const GridLines: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lines = [];
  for (let i = 0; i <= 16; i++) {
    lines.push(
      <line
        key={`v${i}`}
        x1={i * 120}
        y1={0}
        x2={i * 120}
        y2={1080}
        stroke={RED}
        strokeWidth={0.5}
        opacity={0.25}
      />,
      <line
        key={`h${i}`}
        x1={0}
        y1={i * 67.5}
        x2={1920}
        y2={i * 67.5}
        stroke={RED}
        strokeWidth={0.5}
        opacity={0.25}
      />
    );
  }

  return (
    <AbsoluteFill>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", opacity }}
      >
        {lines}
      </svg>
    </AbsoluteFill>
  );
};

const OpeningTitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 1.2 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [40, 70], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const glowIntensity = interpolate(frame, [0, 45, 90], [0, 60, 30], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* PLAYTECH wordmark */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          fontSize: 160,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: WHITE,
          fontFamily: "Arial Black, Arial, sans-serif",
          textShadow: `0 0 ${glowIntensity}px ${RED}, 0 0 ${glowIntensity * 2}px rgba(227,6,19,0.4)`,
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        PLAY
        <span style={{ color: RED }}>TECH</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 28,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.6)",
          fontFamily: "Arial, sans-serif",
          fontWeight: 300,
          marginTop: 24,
        }}
      >
        Executive Intelligence Briefing · 2026
      </div>

      {/* Red underline accent */}
      <div
        style={{
          marginTop: 32,
          width: interpolate(frame, [50, 85], [0, 420], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.exp),
          }),
          height: 3,
          background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
          opacity: subtitleOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Scene 2: Stats Reveal (frames 0–110 within sequence) ───────────────────

type StatProps = {
  text: string;
  sub: string;
  delay: number;
  accent?: string;
};

const StatLine: React.FC<StatProps> = ({
  text,
  sub,
  delay,
  accent = RED,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-80, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        marginBottom: 36,
        display: "flex",
        alignItems: "center",
        gap: 24,
      }}
    >
      <div
        style={{
          width: 6,
          height: 48,
          background: accent,
          borderRadius: 3,
          flexShrink: 0,
          boxShadow: `0 0 16px ${accent}`,
        }}
      />
      <div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: WHITE,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontFamily: "Arial Black, Arial, sans-serif",
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: 4,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
};

const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const stats: StatProps[] = [
    { text: "£1.7B+", sub: "Annual Revenue", delay: 15, accent: RED },
    { text: "140+", sub: "Regulated Markets Worldwide", delay: 30, accent: "#FFB800" },
    { text: "35 Billion", sub: "Player Actions Processed Per Year", delay: 45, accent: "#00D97E" },
    {
      text: "#1",
      sub: "World's Largest Gaming Technology Company",
      delay: 65,
      accent: RED,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 160px",
      }}
    >
      <div
        style={{
          opacity: headerOpacity,
          fontSize: 13,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: RED,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          marginBottom: 56,
        }}
      >
        THE NUMBERS THAT DEFINE AN INDUSTRY
      </div>

      {stats.map((stat) => (
        <StatLine key={stat.text} {...stat} />
      ))}
    </AbsoluteFill>
  );
};

// ─── Scene 3: Call to Action (frames 0–100 within sequence) ─────────────────

const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const pulseOpacity = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.3, 0.9]
  );

  const ctaOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaY = interpolate(frame, [40, 70], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Fade to white at the very end
  const fadeToWhite = interpolate(frame, [80, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Pulsing glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, rgba(227,6,19,${
            pulseOpacity * 0.25
          }) 0%, transparent 70%)`,
          opacity: fadeIn,
        }}
      />

      {/* Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          opacity: fadeIn,
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          color: WHITE,
          fontFamily: "Arial Black, Arial, sans-serif",
          textShadow: `0 0 40px ${RED}`,
          lineHeight: 1,
        }}
      >
        PLAY<span style={{ color: RED }}>TECH</span>
      </div>

      {/* CTA text */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
          marginTop: 40,
          fontSize: 36,
          fontWeight: 300,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.8)",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        The Future of Gaming Is Already Here
      </div>

      {/* Red line accent */}
      <div
        style={{
          marginTop: 28,
          width: 280,
          height: 2,
          background: RED,
          opacity: ctaOpacity,
          boxShadow: `0 0 20px ${RED}`,
        }}
      />

      {/* Fade-to-white overlay */}
      <AbsoluteFill
        style={{
          background: WHITE,
          opacity: fadeToWhite,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};

// ─── Root Composition ────────────────────────────────────────────────────────

export const PlaytechIntro: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: DARK }}>
      {/* Persistent grid background */}
      <GridLines />

      {/* Scene 1: Opening (0–90 frames) */}
      <Sequence from={0} durationInFrames={90} premountFor={fps}>
        <OpeningTitle />
      </Sequence>

      {/* Scene 2: Stats (90–200 frames) */}
      <Sequence from={90} durationInFrames={110} premountFor={fps}>
        <StatsScene />
      </Sequence>

      {/* Scene 3: CTA (200–300 frames) */}
      <Sequence from={200} durationInFrames={100} premountFor={fps}>
        <CtaScene />
      </Sequence>
    </AbsoluteFill>
  );
};
