type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilePage({
  params,
}: Props) {

  const { id } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 max-w-2xl w-full">

        <h1 className="text-4xl font-bold mb-4">
          Shared File
        </h1>

        <p className="text-zinc-400 mb-6">
          Public decentralized file link
        </p>

        <div className="bg-zinc-800 rounded-2xl p-6">

          <p className="text-sm text-zinc-500 mb-2">
            File ID
          </p>

          <p className="break-all text-green-400">
            {id}
          </p>

        </div>

      </div>

    </main>
  );
}
