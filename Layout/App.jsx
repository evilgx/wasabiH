//create by wangzhiyong
//date:2016-08-26
//desc:App容器

let React=require("react");
let ReactDOM=require("react-dom");
let Router=require("react-router").Router;
let hashHistory=require("react-router").hashHistory;
let Route=require("react-router").Route;
let Link=require("react-router").Link;
//
class App {
    constructor(routers=null) {
        if (routers) {
            this.routers = routers;
        }
        else {
            this.routers = [];
        }
        this.Root = React.createClass({
            render(){
                if(this.props.children)
                {
                    return <div className="root">
                        <div className="aside_container"></div>
                        <div className="section_container">
                            {this.props.children}
                        </div>
                    </div>
                }
                else
                {
                    return <div className="root">
                        <div className="aside_container"></div>
                        <div className="section_container">
                           <div><Link to="/Home">心怡科技欢迎您</Link></div>
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
        ReactDOM.render(
            (<Router history={hashHistory}>
                <Route path="/" component={this.Root}>
                    {
                        this.routers.map((item, index)=> {
                            return <Route key={"route"+index.toString()} path={item.url} component={item.component}></Route>
                        })
                    }
                </Route>
            </Router>),
            document.getElementById("app")
        );

    }
}

module .exports=App;
