"use client"

export default function TicketList(){
     //for static now
     const ticket = [
        {is : 1,
            title:"login issue",
            status:"open",
        },
        {
            id:2,
            title:"payemnt not proceed",
            status:"pending"
        }
     ];
     return (
         <div>
            <h2>
                your ticket
            </h2>
            <ul>
                {ticket.map((ticket) => {
                    <li key={ticket.id}>
                       <strong>
                        {ticket.title}
                       </strong> - {ticket.status}
                    </li>
                })}
            </ul>
         </div>
     )
}