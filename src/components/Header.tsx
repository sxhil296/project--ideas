import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <header className="sticky z-50 top-0 h-16 w-full bg-transparent dark:bg-black border border-b p-4">
      <div className="flex w-full h-8 py-2 px-6 justify-between items-center max-w-5xl mx-auto">
        <div className="flex flex-col items-start">
          <h2 className="text-xl font-medium font-sans leading-[20px]">Project Ideas</h2>
          <p className="text-xs font-mono text-zinc-400">Find your next project effortlessly.</p>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
