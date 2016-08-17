require("../sass/Navigation/Tabs.css");
var React =require("react");
var Tabs=React.createClass({
    propTypes:{
        tabs:React.PropTypes.array.isRequired,
        theme: React.PropTypes.oneOf([
            "primary",
            "default",
            "green"
        ])
    },
    getDefaultProps() {
        return {
            tabs: [],
            theme:"default",
        }
    },
    getInitialState(){
        return{
            tabs:this.props.tabs,
        }
    },
    componentWillReceiveProps(nextprops){
        this.setState({
            tabs:nextprops.tabs,
        });
    },
    tabClickHandler:function(index) {
        //页签单击事件
        var newTabs = this.state.tabs;
        for (var i = 0; i < newTabs.length; i++) {
            if (i == index) {
                newTabs[index].active = true;
            }
            else {
                newTabs[i].active = false;
            }
        }
        this.setState({tabs: newTabs});
    },
    render(){
        return(
            <div className="wasabiH-tabs" style={this.props.style}>
                <ul className="header">
                    {
                        this.state.tabs.map((child,index)=>{
                            return <li key={index} className={"wasabiH-tabs  "+this.props.theme+" "+(child.active==true?"active ":"")} onClick={this.tabClickHandler.bind(this,index)}><span>{child.title}</span></li>
                        })
                    }
                </ul>
                <div className={"section "+this.props.theme} >
                    {this.state.tabs.map((child, index)=> {
                        return (<div key={index} className={(child.active==true?"active":"")}>{child.content}</div>);
                    })
                    }
                </div>
            </div>
        )
    },
});
module .exports=Tabs;