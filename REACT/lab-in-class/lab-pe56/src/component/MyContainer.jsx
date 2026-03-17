import React from "react";

export default function MyContainer({ children }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>{children}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "#f0f2f5", 
    minHeight: "100vh",
    padding: "20px 0",
  },
  container: {
    maxWidth: "1200px", 
    margin: "0 auto", 
    padding: "0 15px", 
    flexWrap: "wrap",
    gap: "20px", 
    justifyContent: "center",
  },
};
