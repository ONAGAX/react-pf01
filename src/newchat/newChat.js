import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography
} from "@material-ui/core";
import styles from "./styles";
const firebase = require("firebase");

class NewChatComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      useremail: "",
      message: ""
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline>
          <Paper className={classes.paper}>
            <Typography className={classes.title}>
              新規メッセージ送信
            </Typography>
            <form
              className={classes.form}
              onSubmit={e => {
                this.submitNewChat(e);
              }}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor="new-chat-useremail">
                  お友達のEmail
                </InputLabel>
                <Input
                  required
                  className={classes.input}
                  autoFocus
                  onChange={e => this.userTyping("useremail", e)}
                  id="new-chat-useremail"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="new-chat-message">
                  メッセージを入力
                </InputLabel>
                <Input
                  required
                  className={classes.input}
                  onChange={e => this.userTyping("message", e)}
                  id="new-chat-message"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                className={classes.button}
                variant="contained"
              >
                {" "}
                送信
              </Button>
            </form>
          </Paper>
        </CssBaseline>
      </main>
    );
  }

  // いつもの入力された値を取ってきてactionで分岐、stateに代入
  userTyping = (type, e) => {
    switch (type) {
      case "useremail":
        this.setState({ useremail: e.target.value });
        break;
      case "message":
        this.setState({ message: e.target.value });
        break;
      default:
        break;
    }
  };
  // keyで検索し存在すればそのチャットへ飛ぶ、なければ新規作成
  submitNewChat = async e => {
    e.preventDefault();
    const userExist = await this.userExist();
    if (userExist) {
      const chatExists = await this.chatExists();
      chatExists ? this.goToChat() : this.createChat();
    }
  };
  userExist = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();

    const exists = usersSnapshot.docs
      .map(_doc => _doc.data().email)
      .includes(this.state.useremail);
    this.setState({ serverError: !exists });
    return exists;
  };

  createChat = () => {
    this.props.newChatSubmitFn({
      sendTo: this.state.useremail,
      message: this.state.message
    });
  };

  goToChat = () => {
    this.props.goToChatFn(this.buildDicKey(), this.state.message);
  };

  // ドックキーを作成し、docで存在するか比較するようの変数作成
  chatExists = async () => {
    const docKey = this.buildDicKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };

  // いつものドックキー
  buildDicKey = () => {
    return [firebase.auth().currentUser.email, this.state.useremail]
      .sort()
      .join(":");
  };
}

export default withStyles(styles)(NewChatComponent);
