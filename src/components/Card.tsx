export default function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 w-full max-w-full">
      <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
