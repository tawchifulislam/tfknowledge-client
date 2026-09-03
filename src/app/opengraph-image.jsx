import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAF9',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 600,
          color: '#1C1917',
          textAlign: 'center',
        }}
      >
        Thirsty for Knowledge
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#B45309',
          marginTop: 20,
        }}
      >
        A quiet corner for curious minds
      </div>
    </div>,
    { ...size },
  );
}
