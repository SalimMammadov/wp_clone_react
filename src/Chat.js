import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Chat.css";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase";
import {connect} from 'react-redux'
import firebase from 'firebase'

function Chat({user}) {

  const [messages, setMessages] = useState([])
  const [message,setMessage] = useState('')
  const [seed, setSeed] = useState("");
  const {roomId} = useParams()
  const [roomName,setRoomName] = useState("");


  useEffect(()=>{
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot((snapshot)=>
        setRoomName(snapshot.data().name)
      );

    db.collection('rooms')
    .doc(roomId)
    .collection('messages')
    .orderBy('timestamp','asc')
    .onSnapshot((snapshot)=>
      setMessages(snapshot.docs.map((doc)=>
      doc.data()
      ))
    )
  }

  },[roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message : message,
      name : user.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setMessage("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p style={{overflow : "scroll"}}>
            Son görülmə {" "}
          {messages ? new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() : ''}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
          {messages.map((message)=>(
              <p key={message.id} className=
              {`chat__message ${message.name===user.user.displayName && `chat__reciever`}`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">
                {/* {message.timestamp} */}
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={message} onChange={(e)=>{setMessage(e.target.value)}} placeholder="Mesajını yaz" type="text" />
          <button onClick={sendMessage} type="submit">
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
 function mapStateToProps(state){
    return {
      user : state.reducer
    }
}
export default connect(mapStateToProps) (Chat);
