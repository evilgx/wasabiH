require("../sass/Buttons/LinkButton.css");
require("../sass/Buttons/icon.scss");
var React =require("react");
var LinkButton=React.createClass({
    propTypes:{
        name:React.PropTypes.string,//名称
        title:React.PropTypes.string,//标题
        theme: React.PropTypes.oneOf([//主题
            "primary",
            "default",
        ]),//主题
        width:React.PropTypes.string,
        active:React.PropTypes.boolean,
        iconCls:React.PropTypes.string,//图片
        backgroundColor:React.PropTypes.string,//背景颜色
        onClick:React.PropTypes.func,//单击地址
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
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            title:nextProps.title,
            active:nextProps.active,
        })
    },
    clickHandle(){
        //单击事件
        if(this.props.onClick){
            this.props.onClick(this.props.name,this.props.title);
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
            <a className={"wasabiH-linkbutton "+this.props.theme} style={this.style()} name={this.props.name} onClick={this.clickHandle}>
                <i className={"wasabiH-icon "+this.props.iconCls+" "+(this.state.active==true?"active ":"")}></i>
                <div className={"wasabiH-title "+(this.state.active==true?"active ":"")}>{this.state.title}</div>
            </a>
        )
    }
});
module .exports=LinkButton;