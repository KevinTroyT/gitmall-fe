/**
 * @Author: troykevin
 * @Date:   2018-11-14T19:22:52+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2018-11-15T16:48:26+08:00
 */
 'use strict';
 const _gm                      = require('util/gitmall.js')
 const templateAddressModal     = require('./address-modal.string');
 const _address                 = require('service/address-service.js');
 const _cities                  = require('util/cities/index.js');
 let addressModal = {
     show : function(option){
         // option的绑定
         this.option = option;
         this.option.data = option.data || {};
         this.$modalWrap = $('.modal-wrap')
         // 渲染页面
         this.loadModal();
         // 绑定事件
         this.bindEvent();
     },
     bindEvent : function(){
         let _this = this
         // 省份和城市二级联动
         this.$modalWrap.find('#receiver-province').change(function(){
             let selectedProvince = $(this).val();
             _this.loadCities(selectedProvince)
         })
         // 提交收货地址
         this.$modalWrap.find('.address-btn').click(function(){
             let receiverInfo = _this.getReceiverInfo();
             let isUpdate     = _this.option.isUpdate;
             // 新地址 验证通过
             if(!isUpdate && receiverInfo.status){
                 _address.save(receiverInfo.data, function(res){
                     _gm.successTips('地址添加成功');
                     _this.hide();
                     typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                 },function(errMsg){
                     _gm.errorTips(errMsg);
                 })
             }else if(isUpdate && receiverInfo.status){
             // 更新收件人，验证通过
                 _address.update(receiverInfo.data, function(res){
                     _gm.successTips('地址修改成功');
                     _this.hide();
                     typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                 },function(errMsg){
                     _gm.errorTips(errMsg);
                 })
             }else {
                 // 验证不通过
                 _gm.errorTips(receiverInfo.errMsg || '哪里不对了');
             }
         })
         // 阻止container的事件冒泡
         this.$modalWrap.find('.modal-container').click(function(event) {
             /* Act on the event */
             event.stopPropagation();
         });
         // 点击叉号或者外部 关闭弹窗
         this.$modalWrap.find('.close').click(function(event) {
             /* Act on the event */
             _this.hide();
         });
     },
     // 关闭弹窗
     hide : function(){
         this.$modalWrap.empty();
     },
     loadModal : function(){
         let addressModalHtml = _gm.renderHtml(templateAddressModal, {
             isUpdate   : this.option.isUpdate,
             data       : this.option.data
         })
         this.$modalWrap.html(addressModalHtml);
         // 加载省份
         this.loadProvince();
         // 加载城市
         if(!this.option.isUpdate){
             this.loadCities();
         }
     },
     // 加载省份
     loadProvince : function(){
         let provinces          =  _cities.getProvinces() || [];
         let $provinceSelect    =  this.$modalWrap.find('#receiver-province');
         $provinceSelect.html(this.getSelectOption(provinces));
         // 如果是更新，做回填
         if(this.option.isUpdate && this.option.data.receiverProvince){
             $provinceSelect.val(this.option.data.receiverProvince)
             this.loadCities(this.option.data.receiverProvince);
         }
     },
     // 加载城市信息
     loadCities : function(provinceName){
         let cities         = _cities.getCities(provinceName) || [];
         let $citySelect    = this.$modalWrap.find('#receiver-city');
         $citySelect.html(this.getSelectOption(cities));
         // 如果是更新，做回填
         if(this.option.isUpdate && this.option.data.receiverCity){
             $citySelect.val(this.option.data.receiverCity)
         }
     },
     // 获取表单收件人信息，并做表单验证
     getReceiverInfo : function(){
        let receiverInfo = {};
        let result       = {
            status : false
        };
        receiverInfo.receiverName       = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince   = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity       = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverPhone      = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverAddress    = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverZip        = $.trim(this.$modalWrap.find('#receiver-zip').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        //表单验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请输入收件人所在省份';
        }else if(!receiverInfo.receiverCity){
            result.errMsg = '请输入收件人所在城市';
        }else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入收件人详细地址';
        }else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入收件人手机';
        }else{
            // 验证通过
            result.status   = true;
            result.data     = receiverInfo;
        }
        return result;
     },
     // 获取select框的选项 input:array,output:HTML
     getSelectOption : function(optionArray){
         let html = '<option value="">请选择</option>';
         for(let i=0,length = optionArray.length;i < length;i++){
             html +=  '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>'
         }
         return html;
     }
 }
module.exports = addressModal;
