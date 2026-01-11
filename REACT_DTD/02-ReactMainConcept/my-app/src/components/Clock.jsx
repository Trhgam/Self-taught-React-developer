import React from "react";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        created: new Date().toLocaleTimeString(),
      },
      seconds: {
        created: new Date().getSeconds(),
      },
    };
    this.date = "22/8/2022";
  }

  getTime = () => {
    // previousState.time !== newState.time
    // previousState.time.created !== newState.time.created

    const newState = {
      ...this.state,
      time: {
        created: new Date().toLocaleTimeString(),
      },
      seconds: { created: new Date().getSeconds() },
    };
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.time.created}</h2>
        <h2>It is {this.state.seconds.created}</h2>

        <h3>Is is {this.date}</h3>
        <button onClick={this.getTime}>Get Time</button>
      </div>
    );
  }
}

// Khi bạn dùng this.setState, React sẽ thực hiện 2 việc:

// Gộp (merge) dữ liệu mới vào state.

// Tự động gọi lại hàm render() để cập nhật dòng chữ It is {this.state.time} trên giao diện của bạn.

// Vì nếu khi dùng this.state = {
//                time: new Date().toLocaleTimeString()
//              }, trong getTime thì React sẽ không biết được là state đã thay đổi để gọi lại hàm render() cập nhật giao diện.
// phải dùng setState mới thì React mới biết được là state đã thay đổi. séttate giống nhưu thông báo cho react biết
// rằng state đã thay đổi và cần gọi lại hàm render() để cập nhật giao diện.

// 1 state cũng có nhiều cấp Nested Object tức như ví dụ 1 state có nhiều prop á
// thì khi muốn cập nhật lại state thì phải ...state và overide lại thuộc tính muốn cập nhật , thì nó sẽ giữ nguyên
// các thuộc tính khác không bị thay đổi
// this.setState({
//   ...this.state,
//   time: {
//     created: new Date().toLocaleTimeString(),
//   },
// });