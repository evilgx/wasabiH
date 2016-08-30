require("../sass/Navigation/Tabs.css");
var React =require("react");
var Tabs=React.createClass({
    propTypes:{
        tabs:React.PropTypes.array.isRequired,
        theme: React.PropTypes.oneOf([
            "primary",
            "default",
        ]),
        height:React.PropTypes.string,
    },
    getDefaultProps() {
        return {
            tabs: [],
            theme:"default",
            height:"1.16rem",
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
                <div className="header">
                    {
                        this.state.tabs.map((child,index)=>{
                            return <a key={child.title+index}
                                      style={{height:this.props.height,lineHeight:this.props.height}}
                                      className={"wasabiH-tabs  "+this.props.theme+" "+(child.active==true?"active ":"")}
                                      onClick={this.tabClickHandler.bind(this,index)}>
                                        {child.title}
                                        <div style={{width:"1.33rem",height:1,background:"#3aaeff",margin:"auto",display:child.active==true?"block ":"none"}}></div>
                                    </a>
                        })
                    }
                </div>
                <div className={"section "+this.props.theme} style={{position:"absolute",top:this.props.height}}>
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