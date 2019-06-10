/**
 * Created by tan on 2017/3/24.
 */
//颜色框
$(function () {
    var ball_team_id=0;
    //打开颜色框
    $(".t-color .t-revise,.tx-address").on('tap',function () {
        ball_team_id=parseInt($(this).attr("data"));
        $(".qyColor").show(0).animate({right:'0'},300);
    });
    //选择颜色框样式
    $(".c-color").on('tap',function () {
        $(this).addClass("colorActive").css({borderColor:"#"+$(this).attr("data-color")}).siblings().removeClass("colorActive")
    });
    //保存颜色值并关闭颜色框
    $(".bc-btn").on('click',function () {
        //console.log(111);return;
        var homeColor = $(".homeColor .colorList .c-color.colorActive").attr("data-color");
        var awayColor = $(".awayColor .colorList .c-color.colorActive").attr("data-color");
        var homeColorId = $(".homeColor .colorList .c-color.colorActive").attr("data-id");
        var awayColorId = $(".awayColor .colorList .c-color.colorActive").attr("data-id");
        jpost("/api/v2/lovefootball/setteamcolor", {team_id:ball_team_id,home_color_id:homeColorId,away_color_id:awayColorId}, function(result){
            if(result.code == 500){
                mui.alert(result.message, "确定", "", function(){

                })
            }else{
                mui.alert(result.message, "确定", "", function(){
                    window.location.reload();
                })
            }
        })
        $(".qyColor").animate({right:'-100%'},300);
        return;
    });
    //填写参赛资料-球员位置
    $(".checkAddress").on('tap',function () {
        $(".qyColor").animate({right:'-100%'},300).hide(0);
        $(this).addClass("checkAddAcitve").siblings().removeClass("checkAddAcitve");
        $(".tx-address").html($(this).html())
    });
    //填写参赛资料打开性别选择
    $(".tx-sex").on('tap',function () {
        $(".selSex").show(0).animate({right:'0'},300);
    });
    //填写参赛资料-选择性别
    $(".checkSex").on('tap',function () {
        $(".selSex").animate({right:'-100%'},300).hide(0);
        $(this).addClass("checkAddAcitve").siblings().removeClass("checkAddAcitve");
        $(".tx-sex").html($(this).html())
    });

});

//球员列表
//选中球员等
$(function () {
    $(".isCheck").on('tap',function () {
        $(this).toggleClass("checkTrue");
        var data = $(this).attr('data');
        var real_name=$(this).parent("div.p-rightcon").find("div.p-usemess").find("p.p-name").html();
        var nick_name=$(this).parent("div.p-rightcon").find("div.p-usemess").find("span.p-nickname").html();
        if($(this).hasClass('checkTrue')){//选中
            var user_name=real_name?real_name:nick_name;
            $(".select_num").before("<p data='"+data+"'>"+user_name+"、</p>");
            $(".select_num").find("a").html(parseInt($(".select_num").find("a").html())+1);
        }else{//反选
            $(".checkAfter").find("p[data='"+data+"']").remove();
            $(".select_num").find("a").html(parseInt($(".select_num").find("a").html())-1);
        }
    });
    //添加用户-打开弹框
    $(".addUse").on('tap',function () {
        event.preventDefault();
        $('.addPlayer').addClass('is-visible');
    });
    //添加用户-关闭弹框
    $('.addPlayer').on('tap', function(event){
        if( $(event.target).is('.cd-popup-close') || $(event.target).is('.addPlayer') ) {
            event.preventDefault();
            $(this).removeClass('is-visible');
        }
    });
    //ESC关闭
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.addPlayer').removeClass('is-visible');
        }
    });
    //填写资料-提示弹框打开
    $(".use-photo").on('tap',function () {
        event.preventDefault();
        $('.firm-popup').addClass('is-visible1');
    });
    //填写资料-提示弹框关闭
    $('.firm-popup').on('tap', function(event){
        if( $(event.target).is('.popup-buttons')) {// || $(event.target).is('.firm-popup')
            event.preventDefault();
            $(this).removeClass('is-visible1');
        }
    });
    //ESC关闭
    $(document).keyup(function(event){
        if(event.which=='27'){
            $('.firm-popup').removeClass('is-visible1');
        }
    });
});

//开始时间
var start_time_picker = new mui.DtPicker({"type":"date","beginYear":1960,"endYear":2020});
$("#useData").on("tap", function(){
    //loseFocus();
    setTimeout(function(){
        start_time_picker.show(function(items){
            $("#useData_id").val(items.text);
            $("#useData").html(items.text).css("color", "#545454");
        });
    },300);
});
//选择居住地
var city_picker = new mui.PopPicker({layer:2});
city_picker.setData(init_city_picker);
$("#city_text").on("tap", function(){
    //loseFocus();
    setTimeout(function(){
        city_picker.show(function(items){
            $("#city_id").val((items[0] || {}).value + "," + (items[1] || {}).value);// + "," + (items[2] || {}).value
            $("#city_text").html((items[0] || {}).text + " " + (items[1] || {}).text).css("color", "#333");// + " " + (items[2] || {}).text
        });
    },300);
});
//选择籍贯
$("#city_text1").on("tap", function(){
    //loseFocus();
    setTimeout(function(){
        city_picker.show(function(items){
            $("#city_id1").val((items[0] || {}).value + "," + (items[1] || {}).value);// + "," + (items[2] || {}).value
            $("#city_text1").html((items[0] || {}).text + " " + (items[1] || {}).text).css("color", "#333");// + " " + (items[2] || {}).text
        });
    },300);
});

//填写参赛资料-字数限制
$(function(){
    //先选出 textarea 和 统计字数 dom 节点
    var wordCount = $(".wordCount"),
        textArea = $(".wordCountTxt"),
        word = $(".word");
    //调用
    //判断防止报错
    if(textArea.length > 0){
    	statInputNum(textArea,word);
    }
});
function statInputNum(textArea,numItem) {
    var max = numItem.text(),
        curLength;
    textArea[0].setAttribute("maxlength", max);
    curLength = textArea.val().length;
    numItem.text(max - curLength);
    textArea.on('input propertychange', function () {
        numItem.text(max - $(this).val().length);
    });
};
