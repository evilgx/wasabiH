//create by wangzhiyong
//date:2016-08-26
//desc:App容器

let React=require("react");
let ReactDOM=require("react-dom");
let Router=require("react-router").Router;
let hashHistory=require("react-router").hashHistory;
let Route=require("react-router").Route;
let Link=require("react-router").Link;
require("../sass/Layout/App.css");
//
class App {
    constructor(routers=null,Home=null,Menu=null,Welcome=null) {
        if (routers) {
            this.routers = routers;
        }
        else {
            this.routers = [];
        }
        this.Menu=Menu;
        this.Home=Home;
        this.Welcome=Welcome;
        let parent=this;
        this.Root = React.createClass({
            render(){
                if(parent.Welcome==null)
                {
                    if(parent.Home!=null)
                    {
                        return <div className="root">
                            <div className="aside_container">
                                {parent.Menu}
                            </div>
                            <div className="wasabi-section_container">
                                {parent.Home}
                            </div>
                        </div>
                    }
                    else
                    {
                        return <div className="root">
                            <div className="aside_container">
                                {parent.Menu}
                            </div>
                            <div className="wasabi-section_container">
                                {this.props.children}
                            </div>
                        </div>
                    }

                }
                else
                {
                    return <div className="root">
                        <div className="aside_container">{parent.Menu}</div>
                        <div className="wasabi-section_container">
                           <div><Link to="/home">心怡科技欢迎您,进入主页</Link></div>
                        </div>
                    </div>

                }

            }
        })

    }

    addRoute(url, app) {
        this.routers.push({url: url, app: app});
    }

    render() {

        var routeArr=[];
        if(this.Home!=null)
        {
            routeArr.push(<Route key={"routeHome"} path={"/home"} component={this.Home}></Route>);
        }
        if(this.Welcome!=null)
        {
            routeArr.push(<Route key={"routeHome"} path={"/welcome"} component={this.Welcome}></Route>);
        }
        this.routers.map((item, index)=> {
            routeArr.push( <Route key={"route"+index.toString()} path={item.url} component={item.component}></Route>);
        })
        ReactDOM.render(
            (<Router history={hashHistory}>
                <Route path="/" component={this.Root}>
                    {
                 routeArr
                    }
                </Route>
            </Router>),
            document.getElementById("app")
        );

    }
}

module .exports=App;
