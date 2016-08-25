//create by wangzhiyong
//date:2016-08-22
//一个单页面
//
let React=require("react");
let Page=React.createClass({
    propsType:{
        active:React.PropTypes.bool,//是否激活
        id :React.PropTypes.string,//关键字

    },
    getDefaultProps:function() {
        return {
            active: false,
        }
    },
    getInitialState:function()
    {
        active:this.props.active
    },
    componentWillReceiveProps(nextProps)
    {
        this.setState({
            active:nextProps.active,
        })
    },
    render :function() {

        return (<section className={"page "+this.state.active?"active":""}>

        </section>)
    }

})
module .exports=Page;