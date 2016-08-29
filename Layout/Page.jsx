//create by wangzhiyong
//date:2016-08-25
//一个单页面
//
let React=require("react");
let Route=require("react-router").Route;
let IndexRoute=require("react-router").IndexRoute;
let Page=React.createClass({
    propsType:{
        active:React.PropTypes.bool,//是否激活
        routers:React.PropTypes.array,//子路由
    },
    getDefaultProps:function() {
        return {
            active: true,
            routers:null,
        }
    },
    getInitialState:function() {
        return{
            active:this.props.active
        }

    },
    componentWillReceiveProps(nextProps)
    {
        this.setState({
            active:nextProps.active,
        })
    },
    render :function() {

        if (this.routers instanceof Array) {
            var routeArr=[<IndexRoute key="subhome" component={this.state.routers[0].compoment}/>];

            this.routers.map((item, index)=> {
                routeArr.push( <Route key={"route"+index.toString()} path={item.url} component={item.component}></Route>);
            })
            return (<section className={"wasabi-page "+this.state.active}>
                {this.props.header}
                {
                  routeArr
                }
                {this.props.footer}
            </section>)
        }
        else {
            return (<section className={"wasabi-page "+this.state.active}>
                {this.props.header}
                {this.props.children}
                {this.props.footer}
            </section>)
        }
    }


})
module .exports=Page;