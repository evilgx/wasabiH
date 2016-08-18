require("../sass/Buttons/Button.css");
var React =require("react");
var Button=React.createClass({
    propTypes:{
        name: React.PropTypes.string,//按钮名称
        title: React.PropTypes.string,//按钮标题
        tip: React.PropTypes.string,//按钮提示信息
        theme: React.PropTypes.oneOf([
            "primary",
            "default",
            "warn",
        ]),//主题
        size: React.PropTypes.oneOf([//按钮大小
            "large",
            "default",
            "small"
        ]),
        onClick: React.PropTypes.func,//按钮单击事件
        className: React.PropTypes.string,//按钮自定义样式
        disabled: React.PropTypes.bool,//按钮是否无效
        hide: React.PropTypes.bool,//按钮是否隐藏
    },
    getDefaultProps() {
        return {
            theme:"default",
            size:"default",
        }
    },
    getInitialState(){
        return{
            theme:this.props.theme,
            disabled:this.props.disabled,
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            theme:nextProps.theme,
            disabled:nextProps.disabled,
        });
    },
    clickHandle(){
        if(this.props.onClick){
            this.props.onClick();
        }
    },
    render(){
        var props = {
            className: "wasabiH-button " + this.state.theme + " size-" + this.props.size + " " + this.props.className,
            style: this.props.style,
            disabled: this.state.disabled == true ? "disabled" : null,
            name:this.props.name,
        }
        return(
            <button {...props} onClick={this.clickHandle} type="button">{this.props.title}</button>
        )
    }
});
module .exports=Button;