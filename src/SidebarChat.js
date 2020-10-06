import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  let history = useHistory();

  const createChat = () => {
    const roomName = prompt("Ad daxil edin");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  const removeChat = (chat) => {
    db.collection('rooms').doc(chat).delete();
  }

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  },[id]);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
        <div className="sidebarChat__remove">
          <IconButton>
            <span onClick={()=>{removeChat(id)}}>x</span>
          </IconButton>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2> Yeni yarat</h2>
    </div>
  );
}

export default SidebarChat;
