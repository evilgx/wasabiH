require("../sass/Buttons/LinkButton.css");
require("../sass/Buttons/icon.css");
var React =require("react");
let Link=require("react-router").Link;
var LinkButton=React.createClass({
    propTypes:{
        name:React.PropTypes.string,//名称
        title:React.PropTypes.string,//标题
        theme: React.PropTypes.oneOf([//主题
            "primary",
            "default",
        ]),
        width:React.PropTypes.string,//宽度
        active:React.PropTypes.bool,//是否选中
        iconCls:React.PropTypes.string,//图片
        backgroundColor:React.PropTypes.string,//背景颜色
        onClick:React.PropTypes.func,//单击事件
        to:React.PropTypes.string,//链接
    },
    getDefaultProps() {
        return {
            theme:"default",
            width:"25%",
            backgroundColor:"#f6f6f6",
        }
    },
    getInitialState(){
        return{
            title:this.props.title,
            active:this.props.active,
            to:this.props.to,
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            title:nextProps.title,
            active:nextProps.active,
            to:nextProps.to,
        })
    },
    clickHandle(){
        //单击事件
        if(this.props.onClick){
            this.props.onClick(this.props.name,this.state.title);
        };
    },
    style(){
        var style={};
        if(this.props.width){
            style.width=this.props.width;
        }
        if(this.props.backgroundColor){
            style.backgroundColor=this.props.backgroundColor;
        };
        return style;
    },
    render(){
        return(
                <div className={"wasabiH-linkbutton "+this.props.theme} style={this.style()} name={this.props.name} onClick={this.clickHandle}>
                    <i className={"wasabiH-icon "+this.props.iconCls+" "+(this.state.active==true?"active ":"")}></i>
                    <div className={"wasabiH-title "+(this.state.active==true?"active ":"")}>{this.state.title}</div>
                    <Link to={this.state.to} className="Link"></Link>
                </div>
        )
    }
});
module .exports=LinkButton;