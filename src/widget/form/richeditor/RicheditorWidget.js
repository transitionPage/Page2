define(['../BaseFormWidget','css!./RicheditorWidget.css'], function (BaseFormWidget) {
    var xtype = "richeditor";
    var RicheditorWidget = new Class({
        Extends: BaseFormWidget,
        options: {
            $xtype: xtype,
            $show:true,
            $simple:false,
            $contextPath:"",
            $opts:{
                minWidth : 200,//最小宽度
                minHeight : 100,//最小高度
                width:"100%",
                height:"100%"
            }
        },
        editorObj:{},
        _afterRender:function(){
            var that = this;
            if(!window.contextPath){
                window.contextPath = this.options.$contextPath;
            }
            if(that.options.$simple){
                that.options.$opts.items = [
                    'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                    'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
                    'insertunorderedlist', '|', 'emoticons', 'image', 'link'];
                //关键  同步KindEditor的值到textarea文本框   解决了多个editor的取值问题
                that.options.$opts.afterBlur = function(){
                    this.sync();
                };
            }
            that.editorObj = KindEditor.create("#"+this.getParentElement().attr("id"),that.options.$opts);
            if(that.options.value){
                that.editorObj.html(that.options.value);
            }
        },
        destroy:function(){
            this.editorObj.destroy();
            this.parent();
        },
        show:function(){
            this.editorObj.show();
        },
        hide:function(){
            this.editorObj.hide();
        },
        getValue:function(){
            if(this.editorObj && this.editorObj.html){
                return this.editorObj.html();
            }
            return "";
        },
        setValue:function(htmlCon){
            var value = null;
            if(typeof(htmlCon)=="object"){
                value = htmlCon.value;
            }else{
                value = htmlCon;
            }
            if(this.editorObj && this.editorObj.html && value){
                this.editorObj.html(htmlCon);
            }
        },
        handleDom: function(widgetDom) {
            if(widgetDom) {
                widgetDom.attr("ms-class", "e-richEditor");
            }
        },
        switchStatus:function(status){
            this.parent(status);
            this.setAttr("value",this.getValue());
            if (status == 'edit') {
                this.editorObj && this.editorObj.readonly(false);
                this.getParentElement().siblings(".ke-container").show();
                if(this.getParentElement().siblings(".e-richEditorShowCon").length > 0){
                    this.getParentElement().siblings(".e-richEditorShowCon").remove();
                }
            }else if (status == 'readonly') {
                this.editorObj && this.editorObj.readonly(false);
                this.getParentElement().siblings(".ke-container").hide();
                if(this.getParentElement().siblings(".e-richEditorShowCon").length == 0){
                    var $richEditorShowCon = jQuery("<div></div>").addClass("e-richEditorShowCon").html(this.editorObj.html());
                    jQuery(this.getElement()).append($richEditorShowCon);
                }
            }
            else if (status == 'disabled') {
                this.editorObj && this.editorObj.readonly(true);
                this.getParentElement().siblings(".ke-container").show();
                if(this.getParentElement().siblings(".e-richEditorShowCon").length > 0){
                    this.getParentElement().siblings(".e-richEditorShowCon").remove();
                }
            }
        }
    });
    RicheditorWidget.xtype = xtype;
    return RicheditorWidget;
});