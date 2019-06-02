const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  title: {
    borderBottom: "1px dotted #c0c0c0",
    fontWeight: "bold",
    paddingTop: theme.spacing.unit * 1
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  noAccountHeader: {
    marginTop: theme.spacing.unit * 2,
    width: "100%",
    textAlign: "center"
  },
  signUpLink: {
    width: "100%",
    textDecoration: "none",
    color: "#303f9f",
    fontWeight: "bolder"
  },
  button: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    marginTop: theme.spacing.unit * 2
  },
  errorText: {
    marginTop: theme.spacing.unit * 1,
    color: "red",
    textAlign: "center"
  }
});

export default styles;
