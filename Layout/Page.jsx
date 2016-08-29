//create by wangzhiyong
//date:2016-08-25
//一个单页面
//
let React=require("react");
let Page=React.createClass({
    propsType:{
        active:React.PropTypes.bool,//是否激活

    },
    getDefaultProps:function() {
        return {
            active: false,
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

        return (<section className={"wasabi-page active"}>
            {this.props.children}
        </section>)
    }

})
module .exports=Page;