type Props = { label: string };

export function Header({ label }: Props) {
  return (
    <div className="flex justify-center items-center w-full h-16 bg-cyan-900 font-semibold text-2xl text-white">
      {label}
    </div>
  );
}
