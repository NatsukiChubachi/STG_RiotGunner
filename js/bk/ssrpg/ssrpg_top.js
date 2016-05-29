/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global _gGame */

/**
 * SSRPGトップクラス
 * @returns {CSsrpgTop}
 */
var CSsrpgTop = function() 
{
    // コモンクラス
    this.common = new CCommon();
    
    this._value = 0;
    
    // 初期化処理
    this.initialize = function( _game ) 
    {
        // シーン作成
        this._game = _game;
        this._scene = new Scene();
        
        // 背景色
        this._scene.backgroundColor = "#999999";
        
        // 作成したシーンを追加する
        this._game.pushScene( this._scene );

        // メインウィンドウ
        var _bggroup = this.common.CreateGroup( 0, 0 );
        this._scene.addChild( _bggroup );
        
        var _itemGroup = null;
        var _itemSurf = null;
        var _itemSprite = null;
        var _itemLbl = null;
        
        _itemGroup = this.common.CreateGroup( 10, 10 );
        _itemSurf = this.common.CreateSurface( 230, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 230, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 260, 10 );
        _itemSurf = this.common.CreateSurface( 230, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 230, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "プレイヤー情報１" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 70 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "クエスト" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );

        _itemGroup = this.common.CreateGroup( 440, 130 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "編成" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 190 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "項目１" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 250 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "項目２" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 310 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "項目３" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 370 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "項目４" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = this.common.CreateGroup( 440, 430 );
        _itemSurf = this.common.CreateSurface( 50, 50 );
        _itemSprite = this.common.CreateSprite( 0, 0, 50, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "項目５" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup.addEventListener( "touchstart", function(){
            var _newScene = new CSsrpgBattleField();
            _newScene.initialize( _gGame );
        });
        
        _itemGroup = this.common.CreateGroup( 10, 70 );
        _itemSurf = this.common.CreateSurface( 420, 410 );
        _itemSprite = this.common.CreateSprite( 0, 0, 420, 410, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _itemLbl = this.common.CreateLabel( 0, 0, "メインウィンドウ" );
        _itemGroup.addChild( _itemLbl );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup.addEventListener( "touchstart", function(){
            alert("push window!"); 
        });
        
        /*
        // テストコード
        this._chara = new CCharaBrahms( this._game, this._scene, this.common );
        this._chara.Initialize();
       
        _itemGroup = this.common.CreateGroup( 150, 150 );
        _itemLbl = this.common.CreateLabel( 0, 0, "+" );
        _itemGroup.addChild( _itemLbl );
        this._scene.addChild( _itemGroup );
        */
       
        // ゲームマネージャの作成
        var _manager = this.common.CreateGroup( 0, 0 );
        _manager._parent = this;
        _manager.addEventListener( "enterframe", this.ManagerEnterFrame );
        this._scene.addChild( _manager );
        
        // ラベル作成
        var lblMsg = this.common.CreateLabel( 10, 10, "SSRPG Top Page." );
        this._scene.addChild( lblMsg );

        // ラベル作成
        this._score = this.common.CreateLabel( 10, 30, "" );
        this._scene.addChild( this._score );
        
    };
    
    // マネージャ処理 (EnterFrame)
    this.ManagerEnterFrame = function()
    {
        this._parent._value = this._parent._value + 1;
        this._parent._score.text = "score : " + this._parent._value;
    };
    
    return this;
};


