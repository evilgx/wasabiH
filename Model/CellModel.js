/**
 * Created by wangzhiyong on 16/8/25.
 * 列表的数据模型
 */
class CellModel {
    constructor(title, content, divider = false) {
        this.title = title;
        this.asideText = asideText;
        this.asideCount = asideCount;
        this.content = content;
        this.iconCls = iconCls;
        this.divider = divider;
    }
}
exports.module=CellModel;