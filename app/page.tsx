export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center">A simple book library.</h1>
      </div>
      <div className="mt-8 text-center">
        <p className="mt-2">Please create author first and then book</p>
      </div>
    </main>
  );
}
