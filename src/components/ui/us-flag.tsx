import Image from 'next/image';

interface UsFlagProps {
  width: number;
  height: number;
  className?: string;
}

export const UsFlag = ({ width, height, className }: UsFlagProps) => {
  return (
    <>
      <Image
        width={width}
        height={height}
        alt="EC"
        className={className}
        src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 7410 3900'%3e%3cpath fill='%23b22234' d='M0 0h7410v3900H0z'/%3e%3cpath stroke='%23fff' stroke-width='300' d='M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0'/%3e%3cpath fill='%233c3b6e' d='M0 0h2964v2100H0z'/%3e%3cg fill='%23fff'%3e%3cg id='d'%3e%3cg id='c'%3e%3cg id='e'%3e%3cg id='b'%3e%3cpath id='a' d='m247 90 70.534 217.082-184.66-134.164h228.253L176.466 307.082z'/%3e%3cuse xlink:href='%23a' y='420'/%3e%3cuse xlink:href='%23a' y='840'/%3e%3cuse xlink:href='%23a' y='1260'/%3e%3c/g%3e%3cuse xlink:href='%23a' y='1680'/%3e%3c/g%3e%3cuse xlink:href='%23b' x='247' y='210'/%3e%3c/g%3e%3cuse xlink:href='%23c' x='494'/%3e%3c/g%3e%3cuse xlink:href='%23d' x='988'/%3e%3cuse xlink:href='%23c' x='1976'/%3e%3cuse xlink:href='%23e' x='2470'/%3e%3c/g%3e%3c/svg%3e"
      />
    </>
  );
};
