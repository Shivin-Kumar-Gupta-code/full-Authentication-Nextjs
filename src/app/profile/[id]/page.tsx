export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 rounded bg-orange-500 text-white">
          {resolvedParams.id}
        </span>
      </p>
    </div>
  );
}
