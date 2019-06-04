import React, { useEffect, useState, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Observable } from "rxjs";
import { filter, bufferTime } from "rxjs/operators";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

export interface ChatSummary {
  type: "chat-summary";
  image: string;
  userid: string;
  name: string;
  message: string;
  unread: number;
  time: string;
}

interface IProps {
  classes: any;
  chats: Observable<ChatSummary>;
}

/*
  Merge new updates into the chats array.
  - If a chat (with a certain person/group) already exists, we'll update it.
  - Otherwise add a new entry.
*/
function mergeToChats(
  updates: ChatSummary[],
  chatsRef: { current: ChatSummary[] },
  chatsSetter: (chats: ChatSummary[]) => void
) {
  if (updates.length) {
    const result = updates.reduce((acc, update) => {
      const existing = acc.find(x => x.userid === update.userid);
      return existing
        ? acc.map(x => (x.userid === update.userid ? update : x))
        : acc.concat(update);
    }, chatsRef.current);
    chatsRef.current = result;
    chatsSetter(result);
  }
}

function Chats(props: IProps) {
  const { classes } = props;

  const chatsRef = useRef([] as ChatSummary[]);
  const [chats, chatsSetter] = useState([] as ChatSummary[]);

  useEffect(() => {
    const subscription = props.chats
      .pipe(bufferTime(500))
      .pipe(filter(x => x.length > 0))
      .subscribe(updates => {
        mergeToChats(updates, chatsRef, chatsSetter);
      });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <h3>All your chats</h3>
      <ul>
        {chats.map(s => (
          <li>
            {s.name}
            <br />
            {s.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withStyles(styles)(Chats);
