//create by wangzhiyong
//date:2016-08-26
//desc:App容器

let React=require("react");
let ReactDOM=require("react-dom");
let Router=require("react-router").Router;
let hashHistory=require("react-router").hashHistory;
let Route=require("react-router").Route;
let Root=React.createClass({
    render(){
        return <div className="root"><div className="aside_container"></div>
        <div className="section_container">
            {this.props.children}
        </div></div>
    }
})

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}></Route>
    </Router>,
    document.getElementById("app")
);

module .exports=App;