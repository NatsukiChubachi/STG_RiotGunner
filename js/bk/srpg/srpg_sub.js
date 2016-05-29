/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var _gGame;
var _gScene;
var _gCommon;

var SrpgMain = function() 
{
    this._params = [];
    this._params._unit = [];
    
    /*
    // JSONファイルを読み込み、パラメータをゲームに適用する
    var strJsonPath = "./data/data_common.txt";
    httpObj = new XMLHttpRequest();
    httpObj.open("get", strJsonPath, true);
    httpObj.onload = function()
    {
        var parser = function(k,v){return v.toString().indexOf('function') === 0 ? eval('('+v+')') : v; };
        var myData = JSON.parse(this.responseText, parser);
        
        // alert( myData.item[0].TotalStage );
        _gTotalStage = myData.TotalStage;
        _gLogicData = myData.LogicData;
        _gStageContents = myData.StageContents;
    };
    httpObj.send(null);
    */
    
    // オブジェクトの作成（試作）
    this.CreateObject_Test = function()
    {
        var _tmpGroup;
        
        _tmpGroup = _gCommon.CreateGroup( 0, 0 );
        
        // 周辺オブジェクト
        _tmp = _gCommon.CreateSprite( 0, 400, 500, 100, null );
        _tmp.image = _gCommon.CreateSurface( 100, 100 );
        _tmpGroup.addChild( _tmp );
        
        _tmp = _gCommon.CreateSprite( 10, 10, 50, 20, null );
        _tmp.image = _gCommon.CreateSurface( 50, 20 );
        _tmpGroup.addChild( _tmp );
        
        _tmp = _gCommon.CreateSprite( 80, 10, 300, 20, null );
        _tmp.image = _gCommon.CreateSurface( 300, 20 );
        _tmpGroup.addChild( _tmp );
        
        _tmp = _gCommon.CreateSprite( 10, 50, 50, 20, null );
        _tmp.image = _gCommon.CreateSurface( 50, 20 );
        _tmpGroup.addChild( _tmp );
        
        _tmp = _gCommon.CreateSprite( 80, 50, 200, 20, null );
        _tmp.image = _gCommon.CreateSurface( 200, 20 );
        _tmpGroup.addChild( _tmp );
        
        _tmp = _gCommon.CreateSprite( 0, 250, 500, 130, null );
        _tmp.image = _gCommon.CreateSurface( 500, 130 );
        _tmpGroup.addChild( _tmp );
        
        return _tmpGroup;
    };
    
    // ユニットの作成（試作）
    this.CreateUnit_Test = function()
    {
        // ユニット
        var _tmpChildGroup;
        
        var _iCenterX = 200;
        var _iCenterY = 200;
        
        // Rootポジション（中心位置）
        var _tmpGroup = _gCommon.CreateGroup( _iCenterX, _iCenterY );
        this._params._unit["center"] = _tmpGroup;

        // Childポジション（腰）
        _tmp = _gCommon.CreateSprite( 0+(-30/2), 20+(-30/2), 30, 30, null );
        _tmp.image = _gCommon.CreateSurface( 30, 30 );
        this._params._unit["west"] = _tmp;

        // Childポジション（胴体）
        _tmp = _gCommon.CreateSprite( 0+(-64/2), 0+(-64/2), 64, 64, null );
        _tmp.image = _gGame.assets[ _gAssetImage.UnitBody ];//_gCommon.CreateSurface( 40, 40 );
        this._params._unit["body"] = _tmp;
        
        // Childポジション（頭）
        _tmpChildGroup = _gCommon.CreateGroup( 0, -30 );
        _tmpGroup.addChild( _tmpChildGroup );
        
        _tmp = _gCommon.CreateSprite( 0+(-32/2), -30+(-32/2), 32, 32, null );
        _tmp.image = _gGame.assets[ _gAssetImage.UnitHead ];//_gCommon.CreateSurface( 30, 30 );
        this._params._unit["head"] = _tmp;
        
        // Childポジション（右肩）
        _tmp = _gCommon.CreateSprite( -25+(-32/2), -15+(-32/2), 32, 32, null );
        _tmp.image = _gGame.assets[_gAssetImage.UnitRightSholder ];//_gCommon.CreateSurface( 20, 20 );
        this._params._unit["right_sholder"] = _tmp;

        // Childポジション（右腕0）
        _tmp = _gCommon.CreateSprite( -30+(-16/2), 5+(-16/2), 16, 16, null );
        _tmp.image = _gGame.assets[ _gAssetImage.UnitRightArm0 ];//_gCommon.CreateSurface( 15, 15 );
        this._params._unit["right_arm0"] = _tmp;
        
        // Childポジション（左肩）
        _tmp = _gCommon.CreateSprite( 25+(-32/2), -5+(-32/2), 32, 32, null );
        _tmp.image = _gGame.assets[_gAssetImage.UnitLeftSholder]; //_gCommon.CreateSurface( 25, 25 );
        this._params._unit["left_sholder"] = _tmp;
        
        // Childポジション（右足0）
        _tmp = _gCommon.CreateSprite( -20+(-20/2), 30+(-15/2), 20, 15, null );
        _tmp.image = _gCommon.CreateSurface( 20, 15 );
        this._params._unit["right_leg0"] = _tmp;
        
        // Childポジション（右足1）
        _tmp = _gCommon.CreateSprite( -30+(-20/2), 40+(-30/2), 20, 30, null );
        _tmp.image = _gCommon.CreateSurface( 20, 30 );
        this._params._unit["right_leg1"] = _tmp;
        
        // Childポジション（左足0）
        _tmp = _gCommon.CreateSprite( 20+(-20/2), 35+(-20/2), 20, 20, null );
        _tmp.image = _gCommon.CreateSurface( 20, 20 );
        this._params._unit["left_leg0"] = _tmp;
        
        // Childポジション（左足1）
        _tmp = _gCommon.CreateSprite( 25+(-20/2), 50+(-30/2), 20, 30, null );
        _tmp.image = _gCommon.CreateSurface( 20, 30 );
        this._params._unit["left_leg1"] = _tmp;
        
        // Childポジション（右腕1）
        _tmp = _gCommon.CreateSprite( -40+(-15/2), 10+(-15/2), 15, 15, null );
        _tmp.image = _gCommon.CreateSurface( 15, 15 );
        this._params._unit["right_arm1"] = _tmp;
        
        // Childポジション（左腕0）
        _tmp = _gCommon.CreateSprite( 35+(-15/2), 10+(-15/2), 15, 15, null );
        _tmp.image = _gCommon.CreateSurface( 15, 15 );
        this._params._unit["left_arm0"] = _tmp;
        
        // Childポジション（左腕1）
        _tmp = _gCommon.CreateSprite( 45+(-20/2), 20+(-20/2), 20, 20, null );
        _tmp.image = _gCommon.CreateSurface( 20, 20 );
        this._params._unit["left_arm1"] = _tmp;

        _tmpGroup.addChild( this._params._unit["right_arm0"] );
        _tmpGroup.addChild( this._params._unit["right_arm1"] );
        _tmpGroup.addChild( this._params._unit["right_sholder"] );
        _tmpGroup.addChild( this._params._unit["right_leg0"] );
        _tmpGroup.addChild( this._params._unit["right_leg1"] );
        _tmpGroup.addChild( this._params._unit["west"] );
        _tmpGroup.addChild( this._params._unit["left_leg0"] );
        _tmpGroup.addChild( this._params._unit["left_leg1"] );
        _tmpGroup.addChild( this._params._unit["body"] );
        _tmpGroup.addChild( this._params._unit["head"] );
        _tmpGroup.addChild( this._params._unit["left_arm0"] );
        _tmpGroup.addChild( this._params._unit["left_arm1"] );
        _tmpGroup.addChild( this._params._unit["left_sholder"] );
        
        //_group.addChild( _tmpGroup );
/*     
        var _body = this._params._unit["body"];
        var _head = this._params._unit["head"];
        
        var _tmp;
        _tmp = this._params._unit["left_sholder"];
        _tmp.tl.rotateBy( -30, 180 );
        _tmp = this._params._unit["left_arm0"];
        _tmp.tl.rotateBy( -30, 180 );
        _tmp = this._params._unit["left_arm1"];
        _tmp.tl.rotateBy( 30, 180 );

        _tmpGroup.tl.moveBy( 100, 0, 60 );
        _tmpGroup.tl.rotateBy( 100, 60 );
        _tmpGroup.tl.scaleBy( 1.5, 60 );
*/
        return _tmpGroup;
    };
    
    // ゲームマネージャー処理
    this.ManagerEnterFrame = function()
    {
        // var _scene = this._params._scene;
    };
    
    // 初期化
    this.initialize = function( _game ) 
    {
        // シーン作成
        this._game = _game;
        this._scene = new Scene();
        
        _gGame = _game;
        _gScene = this._scene;
        _gCommon = new CCommon();
        
        // 背景色
        this._scene.backgroundColor = "#99FF99";
        
        // ゲームマネージャの作成
        var _manager;
        _manager = _gCommon.CreateGroup( 0, 0 );
        _manager._parent = this;
        _manager._params = this._params;
        _manager._params._timer = 0;
        _manager._params._state = -1;
        _manager._params._scene = this._scene;
        _manager.addEventListener( "enterframe", this.ManagerEnterFrame );
        this._scene.addChild( _manager );
        this._params._manager = _manager;

        // オブジェクト
        var _group = _gCommon.CreateGroup( 0, 0 );
/*
        // 周辺オブジェクトの作成（試作）
        var _object = this.CreateObject_Test();
        _group.addChild( _object );
        
        // キャラクタの作成（試作）
        var _unit = this.CreateUnit_Test();
        _group.addChild( _unit );
*/        
        // ラベル作成
        _tmp = _gCommon.CreateLabel( 10, 10, "SRPG Main Page." );
        _group.addChild( _tmp );
        
        // シーンへ追加する
        this._scene.addChild( _group );

        // シーンへ追加する
        this._game.pushScene( this._scene );
    };

    return this;
};


