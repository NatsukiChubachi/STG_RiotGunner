/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global _gGame */

/**
 * APRILトップクラス
 * @returns {CAprilTop}
 */
var CAprilTop = function() 
{
    // コモンクラス
    _gCommon = new CCommon();
    
    this._value = 0;
    
    // 初期化処理
    this.initialize = function( _game ) 
    {
        // シーン作成
        this._game = _game;
        this._scene = new Scene();
        
        _gScene = this._scene;
        
        // 背景色
        this._scene.backgroundColor = "#000000";
        
        // 作成したシーンを追加する
        this._game.pushScene( this._scene );

        // メインウィンドウ
        
        var _bg = this.CreateBackGround();            // 背景の作成
        
        _gChara0 = null;
        _gChara1 = null;
        _gChara0 = this.CreateChara( 300, 245, _gAssetImage.CharaSsf2xRyu, true );
        _gChara1 = this.CreateChara( 150, 245, _gAssetImage.CharaSsf2xRyu, false );
        
        // ゲームマネージャの作成
        var _manager = _gCommon.CreateGroup( 0, 0 );
        _manager._parent = this;
        _manager.addEventListener( "enterframe", this.ManagerEnterFrame );
        this._scene.addChild( _manager );
        
        // ラベル作成
        var lblMsg = _gCommon.CreateLabel( 10, 10, "APRIL Top Page." );
        this._scene.addChild( lblMsg );
        
        _manager._bg = _bg;
    };
    
    // マネージャ処理 (EnterFrame)
    this.ManagerEnterFrame = function()
    {
    };
    
    // 背景の作成
    this.CreateBackGround = function()
    {
        // 変数
        var _itemGroup = null;
        var _itemSurf = null;
        var _itemSprite = null;

        // 背景グループの作成
        var _bggroup = _gCommon.CreateGroup( 0, 0 );
        this._scene.addChild( _bggroup );
        
        _itemGroup = _gCommon.CreateGroup( 10, 10 );
        _itemSurf = _gCommon.CreateSurface( 230, 50 );
        _itemSprite = _gCommon.CreateSprite( 0, 0, 230, 50, _itemSurf );
        _itemGroup.addChild( _itemSprite );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = _gCommon.CreateGroup( 0, 0 );
        _itemSurf = _gCommon.CreateSurface( 720, 309 );
        _itemSprite = _gCommon.CreateSprite( 0, 0, 720, 309, _itemSurf );
        _itemSprite.image = _gGame.assets[ _gAssetImage.BackGround1 ];
        _itemSprite.moveTo( -100, 0 );
        _itemSprite.scale( 1.5, 1.1 );
        _itemGroup.addChild( _itemSprite );
        _bggroup.addChild( _itemGroup );
        
        _itemGroup = _gCommon.CreateGroup( 0, 190 );
        _itemSurf = _gCommon.CreateSurface( 1285, 127 );
        _itemSprite = _gCommon.CreateSprite( 0, 0, 1285, 127, _itemSurf );
        _itemSprite.image = _gGame.assets[ _gAssetImage.BackGround0 ];
        _itemSprite.moveTo( -387, 5 );
        _itemSprite.scale( 1.0, 1.2 );
        _itemGroup.addChild( _itemSprite );
        _bggroup.addChild( _itemGroup );
        
        return _bggroup;
    };
    
    
    // キャラの作成
    this.CreateChara = function( x, y, images, bReverseFlag )
    {
        // 変数
        var _itemGroup = null;
        var _itemSurf = null;
        var _itemSprite = null;
        var _itemLbl = null;
        
        // エンティティの作成
        _itemGroup = _gCommon.CreateGroup( x, y );
        _itemSurf = _gCommon.CreateSurface( 100, 100 );
        _itemSprite = _gCommon.CreateSprite( 0, 0, 100, 100, _itemSurf );
        _itemSprite.image = _gGame.assets[ images[ 0 ] ];
        _itemSprite.width = 59;
        _itemSprite.height = 90;
        _itemSprite.x = -_itemSprite.width + 35;
        _itemSprite.y = -_itemSprite.height + 13;
        _itemGroup.addChild( _itemSprite );
        _itemGroup._sprite = _itemSprite;
        
        _itemLbl = _gCommon.CreateLabel( -8, 0, "-----+-----" );
        _itemGroup.addChild( _itemLbl );
        this._scene.addChild( _itemGroup );
        
        // パラメータのセット
        _itemSprite._params = [];
        _itemSprite._params._group = _itemGroup;
        
        _itemSprite._params._bReverseFlag = bReverseFlag;   // 反転フラグ
        _itemSprite._params._bAirFlag = false;              // 空中判定
        _itemSprite._params._bDamageState = false;          // 喰らいステート
        _itemSprite._params._iAnimNumber = 0;               // アニメーションナンバー
        
        _itemSprite._params._HomePos_X = x;             // ホームポジション
        _itemSprite._params._HomePos_Y = y;
        _itemSprite._params._TargetChara = _gChara0;    // ターゲット
        _itemSprite._params._TargetPos_X = 0;           // ターゲットポジション
        _itemSprite._params._TargetPos_Y = 0;
        _itemSprite._params._iActAnimNumber = 0;        // 行動アニメーションナンバー
        
        _itemSprite._params._iHp_Now = 100;             // HP
        _itemSprite._params._iHp_Max = 100;
        _itemSprite._params._iSp_Now = 0;               // SP
        _itemSprite._params._iSp_Max = 100;
        _itemSprite._params._iLevel = 1;                // LEVEL
        _itemSprite._params._iAtk = 100;                // ATK（攻撃力）
        _itemSprite._params._iDef = 100;                // DEF（防御力）
        _itemSprite._params._iWeight = 100;             // WEIGHT（重さ）
        _itemSprite._params._iExtraSkill = [];          // EXTRASKILL（アクション系のスキル）
        
        _itemLbl = _gCommon.CreateLabel( 0, 30, "HP : " + _itemSprite._params._iHp_Now + "/" + _itemSprite._params._iHp_Max );
        _itemGroup.addChild( _itemLbl );
        this._scene.addChild( _itemGroup );
        
        _itemLbl = _gCommon.CreateLabel( 0, 45, "SP : " + _itemSprite._params._iSp_Now + "/" + _itemSprite._params._iSp_Max );
        _itemGroup.addChild( _itemLbl );
        this._scene.addChild( _itemGroup );
        
        _itemLbl = _gCommon.CreateLabel( 0, 60, "Lv : " + _itemSprite._params._iLevel );
        _itemGroup.addChild( _itemLbl );
        this._scene.addChild( _itemGroup );
        
        // 反転フラグ処理のセット
        _itemSprite.CheckReverseFlag = function()
        {
            if ( this._params._bReverseFlag )
            {
                if ( this._scaleX > 0 ) this.scale( -1.0, 1.0 );
                this.x = -this.x;
            }
            else
            {
                this.scale( 1.0, 1.0 );
            }
        };

        // にメーションデータ
        _itemSprite.AnimFunc = [];
        _itemSprite.AnimFunc._parent = _itemSprite;
        _itemSprite.AnimFunc[ 0 ] = function()
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            
            _sprite._params._iAnimNumber = 0;
            
            _group.tl.clear();
            
            // ニュートラルアニメーション（立ち状態）
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 0 ] ];
                _sprite.width = 59;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 1 ] ];
                _sprite.width = 60;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 2 ] ];
                _sprite.width = 59;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 3 ] ];
                _sprite.width = 58;
                _sprite.height = 92;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4 ] ];
                _sprite.width = 55;
                _sprite.height = 93;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 5 ] ];
                _sprite.width = 58;
                _sprite.height = 92;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            //.delay(10).then(function(){ this.AnimFunc[ 4600000 ](); });
            .loop();
        };
        _itemSprite.AnimFunc[ 200000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            // 移動処理
            _group.tl.clear();
            _group.tl
            .delay( 10 )
            //.moveBy( 20.0 * _moveReverse, 0.0, 40 );
            .moveTo( _sprite._params._TargetPos_X, _sprite._params._TargetPos_Y, 40 );
    
            // 前進
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200000 ] ];
                _sprite.width = 53;
                _sprite.height = 83;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200001 ] ];
                _sprite.width = 60;
                _sprite.height = 88;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200002 ] ];
                _sprite.width = 64;
                _sprite.height = 92;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200003 ] ];
                _sprite.width = 63;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200004 ] ];
                _sprite.width = 54;
                _sprite.height = 91;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 200005 ] ];
                _sprite.width = 50;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            //.delay(10).then(function(){ this.AnimFunc[ 0 ](); });
            //.loop();
            .delay(10).then(function(){ this.AnimFunc[ _sprite._params._ActAnimNumber ](); });
        };
        _itemSprite.AnimFunc[ 210000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            // 移動処理
            _group.tl.clear();
            _group.tl
            .delay( 10 )
            //.moveBy( -50.0 * _moveReverse, 0.0, 40 );
            .moveTo( _sprite._params._HomePos_X, _sprite._params._HomePos_Y, 40 );
    
            // 後退
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210000 ] ];
                _sprite.width = 61;
                _sprite.height = 87;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210001 ] ];
                _sprite.width = 59;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210002 ] ];
                _sprite.width = 57;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210003 ] ];
                _sprite.width = 58;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210004 ] ];
                _sprite.width = 58;
                _sprite.height = 91;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 210005 ] ];
                _sprite.width = 57;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 35;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            //.delay(10).then(function(){ this.AnimFunc[ 200000 ](); });
            //.loop();
            .delay(10).then(function(){ this.AnimFunc[ 0 ](); });
        };
        _itemSprite.AnimFunc[ 4600000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            // 移動処理
            _group.tl.clear();
            _group.tl
            .delay( 20 )
            .moveBy( 10.0 * _moveReverse, 0.0, 5 )
            .moveBy( 20.0 * _moveReverse, 0.0, 15 );
            
            // 大ゴス
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600000 ] ];
                _sprite.width = 94;
                _sprite.height = 91;
                _sprite.x = -_itemSprite.width + 50;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600001 ] ];
                _sprite.width = 80;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 60;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600002 ] ];
                _sprite.width = 89;
                _sprite.height = 92;
                _sprite.x = -_itemSprite.width + 70;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600003 ] ];
                _sprite.width = 101;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600004 ] ];
                _sprite.width = 101;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600005 ] ];
                _sprite.width = 101;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
                
                if ( _sprite._params._TargetChara )
                {
                    var _tmp = _sprite._params._TargetChara;
                    _tmp._sprite.AnimFunc[ 50300000 ]();
                    _tmp._sprite._params._iHp_Now -= 50;
                    if ( _tmp._sprite._params._iHp_Now < 0 )
                    {
                        _gScene.removeChild( _tmp );
                    }
                }
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600006 ] ];
                _sprite.width = 101;
                _sprite.height = 90;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600007 ] ];
                _sprite.width = 89;
                _sprite.height = 88;
                _sprite.x = -_itemSprite.width + 60;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 4600008 ] ];
                _sprite.width = 81;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 50;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay(10).then(function(){ this.AnimFunc[ 210000 ](); });
        };
        _itemSprite.AnimFunc[ 50300000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            // 移動処理
            _group.tl.clear();
            _group.tl
            .delay( 20 )
            .moveBy( -50.0 * _moveReverse, -10.0, 20 )
            .moveBy( -25.0 * _moveReverse, +10.0, 10 );

            // 横ダメージダウン
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300000 ] ];
                _sprite.width = 68;
                _sprite.height = 89;
                _sprite.x = -_itemSprite.width + 50;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300010 ] ];
                _sprite.width = 74;
                _sprite.height = 66;
                _sprite.x = -_itemSprite.width + 60;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300020 ] ];
                _sprite.width = 124;
                _sprite.height = 48;
                _sprite.x = -_itemSprite.width + 70;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300030 ] ];
                _sprite.width = 124;
                _sprite.height = 48;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300040 ] ];
                _sprite.width = 78;
                _sprite.height = 80;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50300050 ] ];
                _sprite.width = 78;
                _sprite.height = 80;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay(10).then(function(){ this.AnimFunc[ 50400000 ](); });
        };
        _itemSprite.AnimFunc[ 50400000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            _group.tl.clear();
            
            // ダウン
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50400021 ] ];
                _sprite.width = 119;
                _sprite.height = 44;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50400020 ] ];
                _sprite.width = 123;
                _sprite.height = 41;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50400010 ] ];
                _sprite.width = 128;
                _sprite.height = 31;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay(10).then(function(){ this.AnimFunc[ 51200000 ](); });
        };
        _itemSprite.AnimFunc[ 50700000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            // 移動処理
            _group.tl.clear();
            _group.tl
            .delay( 10 )
            .moveBy( 0.0 * _moveReverse, -20.0, 5 )
            .moveBy( 0.0 * _moveReverse, -30.0, 15 )
            .moveBy( 0.0 * _moveReverse, +10.0, 5 )
            .moveBy( 0.0 * _moveReverse, +40.0, 15 );
    
            // 縦ダウン
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50700001 ] ];
                _sprite.width = 82;
                _sprite.height = 77;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50700002 ] ];
                _sprite.width = 102;
                _sprite.height = 45;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50700003 ] ];
                _sprite.width = 78;
                _sprite.height = 80;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 50700004 ] ];
                _sprite.width = 120;
                _sprite.height = 53;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay(10).then(function(){ this.AnimFunc[ 51200000 ](); });
        };
        _itemSprite.AnimFunc[ 51200000 ] = function() 
        {
            var _sprite = this._parent;
            var _group = _sprite._params._group;
            var _moveReverse = 1.0;
            
            if ( _sprite._params._bReverseFlag ) _moveReverse = -1.0;
            
            _group.tl.clear();
            
            // 縦ダウン
            _sprite.tl.clear();
            _sprite.tl
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 51200000 ] ];
                _sprite.width = 93;
                _sprite.height = 34;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 51200001 ] ];
                _sprite.width = 57;
                _sprite.height = 71;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 51200002 ] ];
                _sprite.width = 47;
                _sprite.height = 115;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 51200003 ] ];
                _sprite.width = 80;
                _sprite.height = 69;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay( 10 ).then(function(){
                _sprite.image = _gGame.assets[ images[ 51200004 ] ];
                _sprite.width = 54;
                _sprite.height = 77;
                _sprite.x = -_itemSprite.width + 80;
                _sprite.y = -_itemSprite.height + 13;
                _sprite.CheckReverseFlag();
            })
            .delay(10).then(function(){ this.AnimFunc[ 210000 ](); });
        };
        
        _itemSprite.CheckReverseFlag();
        
        _itemSprite._params._iAnimNumber = 0;
        _itemSprite.AnimFunc[ 0 ]();
        
        //_itemSprite.AnimFunc[ 50700000 ]();
        
        _itemSprite.addEventListener( "touchstart", 
        function()
        {
            var _iAnimNum = 0;
            
            if ( this._params._iAnimNumber === 0 )
            {
                this._params._ActAnimNumber = 4600000;
                this._params._TargetPos_X = this._params._group.x + 75;
                this._params._TargetPos_Y = this._params._group.y + 0;
                
                _iAnimNum = 200000;
                this.tl.clear();
                this._params._iAnimNumber = _iAnimNum;
                this.AnimFunc[ _iAnimNum ]();
            }
        });
        
        return _itemGroup;
    };
    
    return this;
};


