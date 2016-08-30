class ButtonModel
{
    constructor(name,title,iconCls=null,active=false,theme="default",onClick=null,backgroundColor=null,disabled=false,size="default",iconAlign="left",hide=false,href="javascript:void(0);")
    {
        this.name=name;
        this.title=title;
        this.active=active,
            this.disabled=disabled;
        this.iconCls=iconCls;
        this.iconAlign=iconAlign;
        this.href=href;
        this.onClick=onClick;
        this.backgroundColor=backgroundColor;
        this.tip=null;
        this.theme=theme;
        this.size=size;
        this.color=null;
        this.hide=hide;
        this.className=null;
        this.style=null;
        this.draggable=false;
        this.to=null;
    }
}
module .exports=ButtonModel;