/**
 * Created by HAO on 2017/2/8.
 * Brief   : 用户选择游戏模式层
 * Version :
 */


var SelectModelLayer = cc.Layer.extend({

	_board	:	null,

	_bg_model1	:	null,
	_bg_model2	:	null,

	ctor : function () {
		this._super();

		Wsize = cc.director.getWinSize();

		//创建灰色背景框
		draw = new cc.DrawNode();
		draw.drawRect(cc.p(0, Wsize.height), cc.p(Wsize.width, 0), cc.color(0, 0, 0, 80), 0, cc.color(0, 0, 0, 80));
		this.addChild(draw);

		cc.eventManager.addListener({
			event : cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches : true,
			onTouchBegan   : function(touch, event){
				return true;
			}
		}, draw);

		this.init();

		return true;
	},

	init : function () {

		//背景
		this._board = new cc.Sprite(res.mode.board);
		this._board.setPosition(cc.p(Wsize.width/2, Wsize.height + this._board.getContentSize().height));
		this._board.setScale(0.7);
		this.addChild(this._board);
		this._board.runAction(
			cc.sequence(
				cc.moveTo(1, cc.p(Wsize.width/2, Wsize.height/2)).easing(cc.easeElasticOut()),
				cc.callFunc(this.actionFunc, this)
			)
		);

		//模式一背景
		this._bg_model1 = new cc.Sprite("#mode1.png");
		this._bg_model1.setPosition(this._bg_model1.getContentSize().width, this._bg_model1.getContentSize().height + 20);
		this._board.addChild(this._bg_model1);

		//模式二背景
		this._bg_model2 = new cc.Sprite("#mode2.png");
		this._bg_model2.setPosition(this._board.getContentSize().width - this._bg_model2.getContentSize().width, this._bg_model1.getContentSize().height + 20);
		this._board.addChild(this._bg_model2);

		//back按钮
		var btn_back = new cc.MenuItemImage("#back-btn.png",
											"#back-btn-s.png",
											this.clickBackFunc,this);
		btn_back.setScale(1.1);
		btn_back.setPosition(btn_back.getContentSize().width * 2, this._board.getContentSize().height - btn_back.getContentSize().height);
		btn_back.runAction(
			cc.moveTo(1.5, cc.p(btn_back.getContentSize().width, this._board.getContentSize().height - btn_back.getContentSize().height)).easing(cc.easeElasticOut())
		);

		//按钮
		var btn_model1 = new cc.MenuItemImage("#play-btn.png",
											  "#play-btn-s.png",
											  this.selectModelOne,this);
		btn_model1.setPosition(this._board.getContentSize().width*3/10, this._board.getContentSize().height*3/5);
		btn_model1.setScale(0.8);
		btn_model1.runAction(
			cc.sequence(
				cc.delayTime(Math.random()),
				cc.scaleTo(1, 0.9, 0.9).easing(cc.easeBackInOut()),
				cc.scaleTo(0.2, 0.7, 0.7).easing(cc.easeBackInOut())
			).repeatForever()
		);

		var btn_model2 = new cc.MenuItemImage("#play-btn.png",
											  "#play-btn-s.png",
											  this.selectModelTwo,this);
		btn_model2.setPosition(this._board.getContentSize().width*7/10, this._board.getContentSize().height*3/5);
		btn_model2.setScale(0.8);
		btn_model2.runAction(
			cc.sequence(
				cc.delayTime(Math.random()),
				cc.scaleTo(1, 0.9, 0.9).easing(cc.easeBackInOut()),
				cc.scaleTo(0.2, 0.7, 0.7).easing(cc.easeBackInOut())
			).repeatForever()
		);

		var menu = new cc.Menu(btn_back, btn_model1, btn_model2);
		menu.attr({
			anchorX :   0,
			anchorY :   0,
			x       :   0,
			y       :   0
		});
		this._board.addChild(menu);

	},

	clickBackFunc : function(){

		Sound.playEffectBtn();

		this.unscheduleUpdate();

		this._board.runAction(
			cc.sequence(
				cc.moveTo(0.5, cc.p(Wsize.width/2, Wsize.height + this._board.getContentSize().height)).easing(cc.easeElasticOut()),
				cc.callFunc(this.removeFromParentFunc, this)
			)
		);
	},

	selectModelOne : function () {
		cc.log("ModelOne");

		Sound.playEffectBtn();
		this._bg_model1.stopAllActions();
		this._bg_model1.runAction(
			cc.sequence(
				cc.scaleTo(0.1, 1.2, 1.2).easing(cc.easeElasticOut()),
				cc.scaleTo(0.2, 1, 1).easing(cc.easeElasticOut()),
				cc.callFunc(function () {
					var scene = new PlaySingleScene();
					cc.director.runScene(scene);
				})
			)
		);
	},

	selectModelTwo : function () {
		cc.log("ModelTwo");

		Sound.playEffectBtn();
		this._bg_model2.stopAllActions();
		this._bg_model2.runAction(
			cc.sequence(
				cc.scaleTo(0.1, 1.2, 1.2).easing(cc.easeElasticOut()),
				cc.scaleTo(0.2, 1, 1).easing(cc.easeElasticOut()),
				cc.callFunc(function () {
					var scene = new PlaySingleScene();
					cc.director.runScene(scene);
				})
			)
		);
	},

	removeFromParentFunc : function () {
		cc.log("removed");

		this.removeFromParent();
	},

	actionFunc : function () {

		this.scheduleUpdate();
	},

	//实现动画的上下移动
	update : function(){
		var currentDate = new Date();
		this._board.y = Wsize.height/2 + (Math.cos(currentDate.getTime() * 0.003)) * 2;
	}

});