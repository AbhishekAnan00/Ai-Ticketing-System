
export default async function TicketDetailPage({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tickets/${id}`);
  if (!res.ok) {
    console.error("Fetch failed with status:", res.status);
    return <div>Ticket not found</div>;
  }
  const ticket = await res.json();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{ticket.title}</h1>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Description:</strong> {ticket.description}</p>
      {ticket.enrichedDescription && (
        <p><strong>Enriched Description:</strong> {ticket.enrichedDescription}</p>
      )}
      {ticket.attachments && ticket.attachments.length > 0 && (
        <div>
          <h3>Attachments:</h3>
          <ul>
            {ticket.attachments.map((att, index) => (
              <li key={index}>
                <a href={att} target="_blank" rel="noopener noreferrer">{att}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
