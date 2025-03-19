import Link from "next/link";
import Chatbot from "../components/Chatbot";
import TicketList from "../components/TicketList";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Ticketing System</h1>
        <Link href="/tickets/new" className="text-blue-500">New Ticket</Link>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <TicketList />
        </section>
        <section>
          <Chatbot />
        </section>
      </main>
    </div>
  );
}
