require("../sass/Navigation/NavBar.css");
var React =require("react");
var LinkButton=require('../Buttons/LinkButton.jsx');
var NavBar=React.createClass({
    propTypes:{
        buttons:React.PropTypes.array.isRequired,
        buttonClick:React.PropTypes.func.isRequired
    },
    getDefaultProps() {
        return {
            buttons: [],
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
    render(){
        var buttonList=this.state.buttons.map((child,index)=>{
                return <LinkButton key={child.name} {...child} onClick={this.buttonClick.bind(this,child.name,child.title)}></LinkButton>
        })
        return(
            <div className="wasabi-toolbar">
                {buttonList}
            </div>
        )
    }
});
module .exports=NavBar;