const styles = theme => ({
  sendBtn: {
    float: "right",
    display: "inline-box",
    fontSize: "25px",
    color: "#000",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.7"
    }
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "3px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)"
  },
  chatTextBox: {
    width: "calc(100% - 25px)",
    color: "white"
  }
});

export default styles;
