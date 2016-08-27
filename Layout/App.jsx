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
    constructor(Root=null,routers=null,Welcome=null) {
        if (routers) {
            this.routers = routers;
        }
        else {
            this.routers = [];
        }
        if(Root==null)
        {
            this.Root = React.createClass({
                render(){
                    return <div className="root">
                        <div className="aside_container">
                        </div>
                        <div className="wasabi-section_container">
                            {this.props.children}
                        </div>
                    </div>
                }
            })
        }
        else {
            this.Root=Root;
        }



    }

    addRoute(url, app) {
        this.routers.push({url: url, app: app});
    }

    render() {

        var routeArr=[<Route path="/" component={this.Root}></Route>];

        this.routers.map((item, index)=> {
            routeArr.push( <Route key={"route"+index.toString()} path={item.url} component={item.component}></Route>);
        })
        ReactDOM.render(
            (<Router history={hashHistory}>
                {
                    routeArr
                }
            </Router>),
            document.getElementById("app")
        );

    }
}

module .exports=App;
