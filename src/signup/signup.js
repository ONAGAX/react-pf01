import React from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./styles";
const firebase = require("firebase");

class SignUpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      nickname: null,
      password: null,
      passwrodConfirmation: null,
      signupError: ""
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography className={classes.title}>- - S i g n U p - -</Typography>
          <form
            onSubmit={e => {
              this.submitSignUp(e);
            }}
            className={classes.form}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-email">Email</InputLabel>
              <Input
                onChange={e => this.userTyping("email", e)}
                autoComplete="email"
                autoFocus
                id="signup-email"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-nickname">ニックネーム</InputLabel>
              <Input
                onChange={e => this.userTyping("nickname", e)}
                autoComplete="on"
                id="signup-nickname"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password">
                パスワードを入力
              </InputLabel>
              <Input
                onChange={e => this.userTyping("password", e)}
                type="password"
                id="sinup-password"
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="signup-password-confirmation">
                もう一度パスワードを入力
              </InputLabel>
              <Input
                onChange={e => this.userTyping("passwordConfirmation", e)}
                type="password"
                id="signup-password-confirmation"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
            >
              ユーザー登録
            </Button>
          </form>
          {this.state.signupError ? (
            <Typography className={classes.errorText}>
              {this.state.signupError}
            </Typography>
          ) : null}
          <Typography className={classes.hasAccountHeader}>
            すでにアカウントをお持ちですか？
          </Typography>
          <Link className={classes.loginLink} to="/signin">
            サインイン
          </Link>
        </Paper>
      </main>
    );
  }

  formValid = () => this.state.password === this.state.passwrodConfirmation;

  //書くフォームのactionを引っ張ってきて条件分けしてstateにぶちこむ
  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;

      case "nickname":
        this.setState({ nickname: e.target.value });
        break;

      case "password":
        this.setState({ password: e.target.value });
        break;

      case "passwordConfirmation":
        this.setState({ passwrodConfirmation: e.target.value });
        break;

      default:
        break;
    }
  };

  submitSignUp = e => {
    e.preventDefault();
    if (!this.formValid()) {
      this.setState({ signupError: "パスワードが一致していません" });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authRes => {
          // authRes.updateProfile({ displayName: this.state.nickname });
          const userObj = {
            email: authRes.user.email,
            nickname: this.state.nickname
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push("/dashbord");
              },
              dbError => {
                console.log(dbError);
                this.setState({ signupError: "ユーザー登録に失敗しました" });
              }
            );
        },
        authError => {
          console.log(authError);
          this.setState({ signupError: "ユーザー登録に失敗しました" });
        }
      );
  };
}

export default withStyles(styles)(SignUpComponent);
