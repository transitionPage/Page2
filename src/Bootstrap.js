require.config({
    paths: {
        art: '../../../../Page2/lib/artdialog/artDialog.source',
        artIframe: '../../../../Page2/lib/artdialog/iframeTools.source',
        my97DatePicker: "../../../../../../Page2/lib/My97DatePicker/WdatePicker",
        zTree: "../../../../../../Page2/lib/zTree_v3/js/jquery.ztree.all-3.5",
        kindeditor: "../../../../../../Page2/lib/kindeditor-4.1.10/kindeditor"
    },
    shim: {
        art: {
            exports: 'art'
        },
        artIframe: {
            deps: ['art'],
            exports: 'artIframe'
        },
        my97DatePicker: {
            exports: "my97DatePicker"
        },
        zTree: {
            exports: "zTree"
        },
        kindeditor: {
            exports: "kindeditor"
        }
    }
});
//, "../lib/mmPromise"
define(["./Factory"], function (factory) {

    var named = "Page";

    if (window[named] == undefined) {
        window[named] = factory;
    }
    return factory;
});