const styles = theme => ({
  root: {
    backgroundColor: "rgba(99,99,99,0.6)",
    height: "calc(100% - 35px)",
    position: "absolute",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black"
  },
  listItem: {
    cursor: "pointer",
    color: "white"
  },
  newChatBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  unreadMessage: {
    color: "#ff6347",
    position: "absolute",
    top: "18px",
    right: "15px"
  },
  ListItemText: {
    color: "white",
    fontSize: "13px"
  }
});

export default styles;
