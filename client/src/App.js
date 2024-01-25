 
import { useEffect,useState } from 'react';
import './App.css';
import io from "socket.io-client"

const socket=io.connect("http://localhost:3001")
function App() {
//setroom
const [room,Setroom]=useState("")
  ///message
  const [msg,Setmsg]=useState("")
  const [msgrec,setmsgrec]=useState(" ")
  const joinroom=()=>{
   if(room!==""){
    socket.emit("join_room",room)
   }
  }

  const Sendmesage=()=>{
  socket.emit("send_message",{msg,room})
  }
  useEffect(()=>{
  socket.on("receive_message",(data)=>{
     setmsgrec(data.msg)
  })
  },[socket])
  return (
    <div className="App">
      <input placeholder='Room number'onChange={(event)=>{
        Setroom(event.target.value)
      }}/>
       <button onClick={joinroom}> Join Room</button>
     <input placeholder='Message...'onChange={(event)=>{
          Setmsg(event.target.value)
     }}/>
     <button onClick={Sendmesage}>Send Message</button>
     <h1>Message</h1>
     {msgrec}
    </div>
  );
}

export default App;
