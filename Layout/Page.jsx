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
            active: true,
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


        return (<section className={"wasabi-page "+this.state.active}>
            {this.props.header}
            {this.props.children}
            {this.props.footer}
        </section>)
    }

})
module .exports=Page;