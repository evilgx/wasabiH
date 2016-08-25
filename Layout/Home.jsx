let React =require("react");
require("../sass/Layout/Home.css");
let Page=require("./Page.jsx");
let Home=React.createClass({

    getInitialState:function()
    {
       return {
           pages:[],
           activeIndex:0
       }
    },
    addPage:function(page)
    {
        var pages=this.state.pages;
        pages.push(content);
          this.setState({
              pages:pages,
              activeIndex:pages.length-1
          })
    },
    removePage:function(index)
    {
        var pages=this.state.pages;
        pages.splice(index,1);
        this.setState({
            pages:pages,
            activeIndex:0

        })
    },
    showPage:function(index)
    {
      this.setState({
          activeIndex:index,
      })
    },
    render:function()
    {
        return <div className="section_container">
            {
                this.state.pages.map((item, index)=> {
                    return (<Page key={"page"+index.toString()} active={this.state.activeIndex==index}>{item}</Page>)
                })
            }
         </div>
    }
})
