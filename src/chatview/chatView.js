import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

class ChatViewCompornent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes } = this.props;

    if (this.props.chats === undefined) {
      return <main id="chatview-container" className={classes.content} />;
    } else {
      return (
        <div>
          <div className={classes.chatHeader}>
            <Typography>
              {this.props.chats.users.filter(
                _user => _user !== this.props.user
              )}
            </Typography>
          </div>
          <main id="chatview-container" className={classes.content}>
            {this.props.chats.messages.map((_msg, _index) => {
              return (
                <div
                  key={_index}
                  className={
                    _msg.sender === this.props.user
                      ? classes.userSent
                      : classes.friendSent
                  }
                >
                  {_msg.message}
                </div>
              );
            })}
          </main>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatViewCompornent);
