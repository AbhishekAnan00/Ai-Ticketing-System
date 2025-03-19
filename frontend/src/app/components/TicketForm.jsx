"use client"

import { useState } from "react"

export default function TicketForm(){

  const [title,setTitle] = useState(""
  );
  const [desc,setDisc] = useState(""
  );

 const handleSubmit = (e) => {
      e.preventDefault();
      //i ll use logic to send ticket data for backend api
      console.log("ticket submit:",{title,desc})
      setTitle(""
      );
      setDisc("");
 }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                   Title:
                   <input 
                   type="text"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   placeholder="enter ticket title"
                   style={{marginLeft:"0.5 rem"}}
                   />
                </label>
            </div>
            <div style={{marginTop:"0.5 rem"}}>
                <label>
                    Description:
                    <textarea
                    value={desc}
                    onChange={(e) => setDisc(e.target.value)}
                    placeholder="describe your issue"
                    style={{marginLeft:"0.5 rem",verticalAlign:"top"}}
                    />
                </label>
            </div>
            <button type="submit" style={{marginTop:"0.5 rem"}}>
                submit ticket
            </button>
        </form>
        
    )
}