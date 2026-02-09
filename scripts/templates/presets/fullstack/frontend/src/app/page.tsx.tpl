export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {{PROJECT_NAME}}
        </h1>
        <p className="text-lg text-foreground/60">
          {{PROJECT_DESCRIPTION}}
        </p>
      </main>
      <footer className="text-sm text-foreground/40">
        Powered by Next.js &amp; Tailwind CSS
      </footer>
    </div>
  );
}
