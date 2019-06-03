import React from "react";
import ChatListComponent from "../chatlist/chatList";
import { Button, withStyles } from "@material-ui/core";
import styles from "./styles";
import NewChatComponent from "../newchat/newChat";
import ChatViewComponent from "../chatview/chatView";
import ChatTextBoxComponent from "../chattextbox/chatTextBox";
const firebase = require("firebase");

class DashbordComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChat: "",
      newChatFormVisible: false,
      email: "",
      nickname: "",
      chats: []
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="dashbord">
        <ChatListComponent
          newChatBtnFn={this.newChatBtnClicked}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          userEmail={this.state.email}
          userNickname={this.state.nickname}
          history={this.props.history}
          selectedChatIndex={this.state.selectedChat}
        />
        {this.state.newChatFormVisible ? null : (
          <ChatViewComponent
            user={this.state.email}
            chats={this.state.chats[this.state.selectedChat]}
          />
        )}
        {this.state.selectedChat !== "" && !this.state.newChatFormVisible ? (
          <ChatTextBoxComponent
            messageReadFn={this.messageRead}
            submitMessageFn={this.submitMessage}
          />
        ) : null}
        {this.state.newChatFormVisible ? (
          <NewChatComponent
            goToChatFn={this.goToChat}
            newChatSubmitFn={this.newChatSubmit}
          />
        ) : null}
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          サインアウト
        </Button>
      </div>
    );
  }

  // 送信者と現在のユーザーの真偽値
  clickedChatWhereNotSender = chatIndex =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  selectChat = async Index => {
    await this.setState({ selectedChat: Index, newChatFormVisible: false });
    this.messageRead();
  };

  // クリックした場合のベルマーク消去
  messageRead = () => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _user => _user !== this.state.email
      )[0]
    );
    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
    }
  };

  // 新規作成ですでにdocが存在する場合、セレクトの値も変えて強制遷移
  goToChat = async (docKey, message) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find(_chat =>
      usersInChat.every(_user => _chat.users.includes(_user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(message);
  };

  // 新規作成でdocKyeを作成しつつ、メッセージもいれて強制遷移
  newChatSubmit = async chatObj => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [this.state.email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email
          }
        ]
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  submitMessage = message => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        _user => _user !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: message,
          timestamp: Date.now()
        }),
        receiverHasRead: false
      });
  };

  buildDocKey = friend => [this.state.email, friend].sort().join(":");

  newChatBtnClicked = () => {
    this.setState({ newChatFormVisible: true, selectedChat: null });
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _user => {
      if (!_user) this.props.history.push("./signin");
      else {
        await firebase
          .firestore()
          .collection("chats")
          .where("users", "array-contains", _user.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _user.email,
              chats: chats
            });
          });
      }
    });
  };

  signOut = () => firebase.auth().signOut();
}

export default withStyles(styles)(DashbordComponent);
