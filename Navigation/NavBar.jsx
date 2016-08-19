require("../sass/Navigation/NavBar.css");
var React =require("react");
var LinkButton=require('../Buttons/LinkButton.jsx');
var NavBar=React.createClass({
    propTypes:{
        buttons:React.PropTypes.array.isRequired,//
        buttonClick:React.PropTypes.func.isRequired,//单击触发事件
        style:React.PropTypes.object,//style 样式
        background:React.PropTypes.string,//背景颜色
    },
    getDefaultProps() {
        return {
            buttons: [],
            background:"#f6f6f6",
        }
    },
    getInitialState(){
        return{
            buttons:this.props.buttons,
        }
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            buttons:nextProps.buttons,
        });
    },
    buttonClick(name,title){
        if(this.props.buttonClick){
            this.props.buttonClick(name,title);
        }
    },

    style(){
        var style=null;
        if(this.props.style){//判断组件是否有 “style”属性
            style=this.props.style;
            if("background" in style){

            }else{
                style.background=this.props.background;
            }
        }else{
            style={};
            style.background=this.props.background;
        };
        return style;
    },
    render(){
        var buttonList=this.state.buttons.map((child,index)=>{
                return <LinkButton key={child.name} {...child} onClick={this.buttonClick.bind(this,child.name,child.title)}></LinkButton>
        })
        return(
            <div className="wasabiH-toolbar" style={this.style()}>
                {buttonList}
            </div>
        )
    }
});
module .exports=NavBar;