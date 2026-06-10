type CareersEmojiIconProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

export function CareersEmojiIcon({
  src,
  alt,
  size = 28,
  className = "",
}: CareersEmojiIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`careers-emoji-icon shrink-0 ${className}`}
      draggable={false}
    />
  );
}
