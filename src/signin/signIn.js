import React from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseLine from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./styles";
const firebase = require("firebase");

class SignInComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loginError: ""
    };
  }
  render() {
    const { classes } = this.props;

    return (
      <div className="body">
        <main className={classes.main}>
          <CssBaseLine />
          <Paper className={classes.paper}>
            <Typography className={classes.title}>- - Sign in - -</Typography>
            <form onSubmit={e => this.submitLogin(e)} className={classes.form}>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signin-email">メールアドレス</InputLabel>
                <Input
                  onChange={e => this.userTyping("email", e)}
                  autoComplete="email"
                  autoFocus
                  id="signin-email"
                />
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signin-password">パスワード</InputLabel>
                <Input
                  onChange={e => this.userTyping("password", e)}
                  type="password"
                  id="signin-password"
                />
              </FormControl>
              <Button type="submit" className={classes.button} fullWidth>
                ログイン
              </Button>
            </form>
            {this.state.loginError ? (
              <Typography className={classes.errorText}>
                ログイン情報が間違っています
              </Typography>
            ) : null}
            <Typography className={classes.noAccountHeader}>
              アカウントをお持ちでない方はこちら
            </Typography>
            <Link className={classes.signupLink} to="./signup">
              ユーザー登録
            </Link>
          </Paper>
          <Paper className={classes.paper}>
            <Typography className={classes.exTitle} fillWidth>
              以下のアカウントを使ってください
              <br />
              もちろん新規作成も可能です
            </Typography>
            <Typography fullWidth>
              <table className={classes.table}>
                <tr>
                  <th className={classes.th}>メールアドレス</th>
                  <th className={classes.th}>パスワード</th>
                </tr>
                <tr>
                  <td className={classes.td}>tachikawa@tokyo.jp</td>
                  <td className={classes.td}>tachikawa</td>
                </tr>
                <tr>
                  <td className={classes.td}>tokorozawa@saitama.jp</td>
                  <td className={classes.td}>tokorozawa</td>
                </tr>
                <tr>
                  <td className={classes.td}>ishigaki@okinawa.jp</td>
                  <td className={classes.td}>ishigaki</td>
                </tr>
              </table>
            </Typography>
          </Paper>
        </main>
      </div>
    );
  }

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;

      case "password":
        this.setState({ password: e.target.value });
        break;

      default:
        break;
    }
  };

  submitLogin = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("./dashbord");
        },
        error => {
          this.setState({ loginError: error });
        }
      );
  };
}

export default withStyles(styles)(SignInComponent);
