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
//
class App {
   constructor(routers)
   {
       if(routers)
       {
           this.routers=routers;
       }
       else {
           this.routers=[];
       }

   }
    addRoute(url,app)
    {
        this.routers.push({url:url,app:app});
    }
    render() {
        ReactDOM.render(
            <Router history={hashHistory}>
                <Route path="/" component={Root}>
                    {
                        this.routers.map((item,index)=>{
                          return<Route path={item.url} component={item.app}></Route>
                        })
                    }
                </Route>
            </Router>,
            document.getElementById("app")
        );

    }
}
exports.module=App;

