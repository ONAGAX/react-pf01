const styles = theme => ({
  content: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "25px",
    marginLeft: "300px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "50px",
    width: "calc(100% - 300px)",
    position: "absolute"
  },

  userSent: {
    float: "left",
    clear: "both",
    padding: "10px 20px 10px 10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "20px",
    backgroundColor: "#cd5c5c",
    color: "white",
    width: "300px",
    borderRadius: "3px"
  },

  friendSent: {
    float: "right",
    clear: "both",
    padding: "10px 20px 10px 20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "20px",
    backgroundColor: "#cd5c5c",
    color: "white",
    width: "300px",
    borderRadius: "3px"
  },

  chatHeader: {
    width: "calc(100% - 301px)",
    height: "36px",
    // backgroundColor: "#344195",
    borderBottom: "1px solid #000",
    position: "fixed",
    marginLeft: "301px",
    fontSize: "14px",
    textAlign: "center",
    fontSizw: "16px",
    fontWeight: "bold",
    color: "white",
    paddingTop: "4px",
    boxSizing: "border-box"
  }
});

export default styles;
