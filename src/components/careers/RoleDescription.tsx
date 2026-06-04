type RoleDescriptionProps = {
  text: string;
  className?: string;
};

export function RoleDescription({ text, className = "" }: RoleDescriptionProps) {
  return (
    <div
      className={`whitespace-pre-line text-body leading-relaxed ${className}`}
    >
      {text.trim()}
    </div>
  );
}
