/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// compositeOperation : 描画方法
// null : 通常
// copy : B
// destination-atop : BinA
// destination-in : AonB
// destination-out : AoutB
// destination-over : AorB
// lighter : A+B
// source-atop : AinB
// source-in : AinB
// source-out : BoutA
// source-over : BorA
// xor : AxorB
// 

var CCharaBrahms = function( _game, _scene, _common )
{
    // メンバ
    this._scene = _scene;
    this._common = _common;
    
    this._helper = [];
    
    // 次のアニメーションへ移行する（共通メソッド）
    this.NextAnimation = function( self )
    {
        var _common = self._aryAnimData[ "common" ];
        var _tmp = self._aryAnimData[ self._iAnimIndex ];

        self.image = _game.assets[ _common._imagePath + _tmp.image ];
        self._time = 0.0;
        self._width = self.image.width;
        self._height = self.image.height;
        self.moveTo( _common._baseX + _tmp.offsetX, _common._baseY + _tmp.offsetY );
    };
    
    // TouchStartイベント
    this.AddEventTouchStart = function()
    {
        // this._iAnimIndex = 01000000;            // ダッシュ
        // this._iAnimIndex = 01200000;            // ガード
        this._iAnimIndex = 01800000;            // 勝利ポーズ
        // this._iAnimIndex = 11000000;            // 攻撃1：拳振り下ろし
        // this._iAnimIndex = 12000000;            // 攻撃2：昇竜
        // this._iAnimIndex = 13000000;            // 落下
        // this._iAnimIndex = 50000000;            // ダウン
        // this._iAnimIndex = 50000100;            // 喰らい（足基準位置）
        // this._iAnimIndex = 50000200;            // 喰らい（胴基準位置）
        // this._iAnimIndex = 50000300;            // 喰らい（頭基準位置）
        // this._iAnimIndex = 90000000;            // 顔アイコン
        // this._iAnimIndex = 90000001;            // キャラグラフィック

        // ヘルパー予定
        var _posX = this._top._x;
        var _posY = this._top._y;
        var _scaleX = this._scaleX;
        var _scaleY = this._scaleY;
        var _helper = null;

        _helper = this._parent.CreateHelper( 01800007, _posX + 5, _posY - 5, _scaleX, _scaleY );
        _helper._sprite.compositeOperation = "lighter";
        _helper._sprite.opacity = 1.0;
        
        _helper = this._parent.CreateHelper( 01800007, _posX + 5, _posY - 5, _scaleX, _scaleY );
        _helper._sprite.compositeOperation = "lighter";
        _helper._sprite.opacity = 1.0;
        
        this._parent.NextAnimation( this );
    };
    
    // TouchEndイベント
    this.AddEventTouchEnd = function()
    {
        if ( this._iAnimIndex >= 01000000 && this._iAnimIndex <= 01000002 ) this._iAnimIndex = 01050000;
        if ( this._iAnimIndex === 01200000 ) this._iAnimIndex = 01200001;
        // if ( this._iAnimIndex === 01300000 )
        
        this._parent.NextAnimation( this );
    };
    
    // EnterFrameイベント
    this.AddEventEnterFrame = function()
    {
        // 次のアニメーションフレームに移動する場合
        this._time = this._time + 0.01666;
        if ( this._time > this._aryAnimData[ this._iAnimIndex ].time )
        {
            this._iAnimIndex = this._aryAnimData[ this._iAnimIndex ].next;
           
            // ニュートラルアニメーションにセットされた場合
            if ( this._iAnimIndex < 0 ) this._iAnimIndex = 0;
            this._parent.NextAnimation( this );
        }
    };
    
    // EnterFrameイベント（Helper）
    this.AddEventEnterFrame_Helper = function()
    {
        // 次のアニメーションフレームに移動する場合
        this._time = this._time + 0.01666;
        if ( this._time > this._aryAnimData[ this._iAnimIndex ].time )
        {
            this._iAnimIndex = this._aryAnimData[ this._iAnimIndex ].next;
           
            // ニュートラルアニメーションにセットされた場合
            if ( this._iAnimIndex < 0 )
            {
                this._iAnimIndex = 0;
                this._top._use = false;
                this._parent._scene.removeChild( this._top );
            }
            else
            {
                this._parent.NextAnimation( this );
            }
        }
    };
    
    // ヘルパーの生成
    this.CreateHelper = function( iAnimIndex, posX, posY, scaleX, scaleY )
    {
        var _iCount = this._helper.length;
        var _iIndex = 0;
        
        for ( _iIndex = 0; _iIndex < _iCount; _iIndex++ )
        {
            var _tmp = this._helper[ _iIndex ];
            var _tmpSprite = _tmp._sprite;
            if ( _tmp._use === false )
            {
                _tmp._use = true;
                
                _tmp.x = posX;
                _tmp.y = posY;
                
                _tmpSprite._scaleX = scaleX;
                _tmpSprite._scaleY = scaleY;
                _tmpSprite._iAnimState  = 0;
                _tmpSprite._iAnimIndex  = iAnimIndex;
                _tmpSprite._time        = 0.0;
                _tmpSprite._aryAnimData = this._aryAnimData;
                _tmpSprite._parent      = this;
                
                this._scene.addChild( _tmp );
                
                // _tmpSprite.addEventListener( "touchstart", this.AddEventTouchStart );
                // _tmpSprite.addEventListener( "touchend",   this.AddEventTouchEnd );
                _tmpSprite.addEventListener( "enterframe", this.AddEventEnterFrame_Helper );
                
                break;
            }
        }
        
        return _tmp;
    };
    
    // 初期化
    this.Initialize = function()
    {
        // テストサンプル
        var _itemGroup = null;
        var _itemSurf = null;
        var _itemSprite = null;
        
        _itemGroup = this._common.CreateGroup( 95, 40 );
        _itemSurf = this._common.CreateSurface( 100, 100 );
        _itemSprite = this._common.CreateSprite( 0, 0, 100, 100, _itemSurf );
        _itemSprite.image = null;
        _itemGroup.addChild( _itemSprite );
        this._scene.addChild( _itemGroup );
        
        _itemSprite.scale( -1, 1 );
        _itemSprite._iAnimState  = 0;
        _itemSprite._iAnimIndex  = 0;
        _itemSprite._time        = 0.0;
        _itemSprite._aryAnimData = this._aryAnimData;
        _itemSprite._parent      = this;
        _itemSprite._top         = _itemGroup;
        _itemGroup._sprite       = _itemSprite;
        
        _itemSprite.addEventListener( "touchstart", this.AddEventTouchStart );
        _itemSprite.addEventListener( "touchend",   this.AddEventTouchEnd );
        _itemSprite.addEventListener( "enterframe", this.AddEventEnterFrame );

        // ヘルパーの初期化
        var _iIndex = 0;
        for ( _iIndex = 0; _iIndex < 100; _iIndex++ )
        {
            _itemGroup = this._common.CreateGroup( 0, 0 );
            _itemSurf = this._common.CreateSurface( 100, 100 );
            _itemSprite = this._common.CreateSprite( 0, 0, 100, 100, _itemSurf );
            _itemSprite.image = null;
            _itemGroup.addChild( _itemSprite );
            // this._scene.addChild( _itemGroup );

            _itemSprite.scale( -1, 1 );
            _itemSprite._iAnimState  = 0;
            _itemSprite._iAnimIndex  = 0;
            _itemSprite._time        = 0.0;
            _itemSprite._aryAnimData = this._aryAnimData;
            _itemSprite._parent      = this;
            _itemSprite._top         = _itemGroup;
            _itemGroup._sprite       = _itemSprite;
            
            _itemGroup._use          = false;
            
            this._helper[ _iIndex ] = _itemGroup;
        }
        
    };
    
    // アニメーションデータ
    this._aryAnimData = {
        common:{
            _imagePath: "dat/test/",
            _baseX: 50,
            _baseY: 60
        },

        // ニュートラル
        0000000:{
            image: "00000000.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.05,
            next: 1
        },
        00000001:{
            image: "00000001.png",
            offsetX: 0,
            offsetY: 2,
            time: 0.05,
            next: 2
        },
        00000002:{
            image: "00000002.png",
            offsetX: 3,
            offsetY: 3,
            time: 0.05,
            next: 3
        },
        00000003:{
            image: "00000003.png",
            offsetX: 4,
            offsetY: 4,
            time: 0.05,
            next: 4
        },
        00000004:{
            image: "00000004.png",
            offsetX: 3,
            offsetY: 3,
            time: 0.05,
            next: 5
        },
        00000005:{
            image: "00000005.png",
            offsetX: 1,
            offsetY: 2,
            time: 0.05,
            next: 6
        },
        00000006:{
            image: "00000006.png",
            offsetX: -2,
            offsetY: 1,
            time: 0.05,
            next: 7
        },
        00000007:{
            image: "00000007.png",
            offsetX: -3,
            offsetY: -2,
            time: 0.05,
            next: -1
        },

        // ダッシュ
        01000000:{
            image: "01000000.png",
            offsetX: -10,
            offsetY: 10,
            time: 0.05,
            next: 01000001
        },
        01000001:{
            image: "01000001.png",
            offsetX: -25,
            offsetY: 10,
            time: 0.05,
            next: 01000002
        },
        01000002:{
            image: "01000002.png",
            offsetX: -25,
            offsetY: 10,
            time: 0.05,
            next: 01000001
        },

        // ダッシュブレーキ
        01050000:{
            image: "01050000.png",
            offsetX: 5,
            offsetY: 1,
            time: 0.10,
            next: -1
        },

        // ガード
        01200000:{
            image: "01200000.png",
            offsetX: 10,
            offsetY: 0,
            time: 0.05,
            next: 01200000
        },

        // ガード終了
        01200001:{
            image: "01200000.png",
            offsetX: 10,
            offsetY: 0,
            time: 0.01,
            next: -1
        },

        // 勝利ポーズ
        01800000:{
            image: "01800000.png",
            offsetX: 0,
            offsetY: -5,
            time: 0.05,
            next: 01800001
        },
        01800001:{
            image: "01800001.png",
            offsetX: 0,
            offsetY: -7,
            time: 0.05,
            next: 01800002
        },
        01800002:{
            image: "01800002.png",
            offsetX: -5,
            offsetY: -7,
            time: 0.05,
            next: 01800003
        },
        01800003:{
            image: "01800003.png",
            offsetX: 1,
            offsetY: -8,
            time: 0.05,
            next: 01800004
        },
        01800004:{
            image: "01800004.png",
            offsetX: 5,
            offsetY: -8,
            time: 0.05,
            next: 01800005
        },
        01800005:{
            image: "01800005.png",
            offsetX: 5,
            offsetY: -8,
            time: 0.05,
            next: 01800006
        },
        01800006:{
            image: "01800006.png",
            offsetX: 5,
            offsetY: -8,
            time: 1.05,
            next: 01800006
        },

        // 勝利ポーズ、拳振り下ろし残像
        01800007:{
            image: "01800007.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.1,
            next: 01800008
        },
        01800008:{
            image: "01800008.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.1,
            next: 01800009
        },
        01800009:{
            image: "01800009.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.075,
            next: 01800010
        },
        01800010:{
            image: "01800010.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.05,
            next: 01800011
        },
        01800011:{
            image: "01800011.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.05,
            next: 01800012
        },
        01800012:{
            image: "01800012.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.05,
            next: 01800013
        },
        01800013:{
            image: "01800013.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.05,
            next: -1
        },

        // 攻撃1：拳振り下ろし
        11000000:{
            image: "11000000.png",
            offsetX: 7,
            offsetY: 10,
            time: 0.040,
            next: 11000001
        },
        11000001:{
            image: "11000001.png",
            offsetX: 5,
            offsetY: 5,
            time: 0.040,
            next: 11000002
        },
        11000002:{
            image: "11000002.png",
            offsetX: 4,
            offsetY: 5,
            time: 0.040,
            next: 11000003
        },
        11000003:{
            image: "11000003.png",
            offsetX: 3,
            offsetY: 2,
            time: 0.025,
            next: 11000004
        },
        11000004:{
            image: "11000004.png",
            offsetX: -2,
            offsetY: 1,
            time: 0.025,
            next: 11000005
        },
        11000005:{
            image: "11000005.png",
            offsetX: -12,
            offsetY: -2,
            time: 0.025,
            next: 11000006
        },
        11000006:{
            image: "11000006.png",
            offsetX: -2,
            offsetY: 4,
            time: 0.025,
            next: 11000007
        },
        11000007:{
            image: "11000007.png",
            offsetX: -2,
            offsetY: 3,
            time: 0.025,
            next: 11000008
        },
        11000008:{
            image: "11000008.png",
            offsetX: -2,
            offsetY: 2,
            time: 0.025,
            next: 11000009
        },
        11000009:{
            image: "11000009.png",
            offsetX: -3,
            offsetY: 2,
            time: 0.025,
            next: 11000010
        },
        11000010:{
            image: "11000010.png",
            offsetX: -2,
            offsetY: 7,
            time: 0.025,
            next: -1
        },

        // 攻撃2：昇竜
        12000000:{
            image: "12000000.png",
            offsetX: 0,
            offsetY: 11,
            time: 0.040,
            next: 12000001
        },
        12000001:{
            image: "12000001.png",
            offsetX: 2,
            offsetY: 13,
            time: 0.040,
            next: 12000002
        },
        12000002:{
            image: "12000002.png",
            offsetX: -17,
            offsetY: -11,
            time: 0.025,
            next: 12000003
        },
        12000003:{
            image: "12000003.png",
            offsetX: -25,
            offsetY: -5,
            time: 0.025,
            next: 12000004
        },
        12000004:{
            image: "12000004.png",
            offsetX: -12,
            offsetY: -20,
            time: 0.025,
            next: 12000005
        },
        12000005:{
            image: "12000005.png",
            offsetX: -24,
            offsetY: -10,
            time: 0.025,
            next: 12000006
        },
        12000006:{
            image: "12000006.png",
            offsetX: -27,
            offsetY: -10,
            time: 0.040,
            next: 12000007
        },
        12000007:{
            image: "12000007.png",
            offsetX: -6,
            offsetY: -10,
            time: 0.075,
            next: 12000008
        },
        12000008:{
            image: "12000008.png",
            offsetX: -10,
            offsetY: -7,
            time: 0.075,
            next: 12000009
        },
        12000009:{
            image: "12000009.png",
            offsetX: -10,
            offsetY: 20,
            time: 0.05,
            next: 12000010
        },
        12000010:{
            image: "12000010.png",
            offsetX: -11,
            offsetY: 16,
            time: 0.075,
            next: -1
        },

        // 落下
        13000000:{
            image: "13000000.png",
            offsetX: -12,
            offsetY: -7,
            time: 0.050,
            next: 13000000
        },
        
        // ダウン
        50000000:{
            image: "50000000.png",
            offsetX: 5,
            offsetY: 0,
            time: 0.1,
            next: 50000001
        },
        50000001:{
            image: "50000001.png",
            offsetX: 15,
            offsetY: 20,
            time: 0.1,
            next: 50000002
        },
        50000002:{
            image: "50000002.png",
            offsetX: 10,
            offsetY: 43,
            time: 0.1,
            next: -1
        },
        
        // 喰らい（足基準位置）
        50000100:{
            image: "50000000.png",
            offsetX: 5,
            offsetY: 0,
            time: 0.01,
            next: 50000100
        },
        50000101:{
            image: "50000001.png",
            offsetX: 15,
            offsetY: 20,
            time: 0.01,
            next: 50000101
        },
        50000102:{
            image: "50000002.png",
            offsetX: 10,
            offsetY: 43,
            time: 0.01,
            next: 50000102
        },
        
        // 喰らい（胴基準位置）
        50000200:{
            image: "50000000.png",
            offsetX: -15,
            offsetY: 35,
            time: 0.01,
            next: 50000200
        },
        50000201:{
            image: "50000001.png",
            offsetX: -5,
            offsetY: 55,
            time: 0.01,
            next: 50000201
        },
        50000202:{
            image: "50000002.png",
            offsetX: -30,
            offsetY: 50,
            time: 0.01,
            next: 50000202
        },
        
        // 喰らい（頭基準位置）
        50000300:{
            image: "50000000.png",
            offsetX: -25,
            offsetY: 55,
            time: 0.01,
            next: 50000300
        },
        50000301:{
            image: "50000001.png",
            offsetX: -45,
            offsetY: 25,
            time: 0.01,
            next: 50000301
        },
        50000302:{
            image: "50000002.png",
            offsetX: -55,
            offsetY: 50,
            time: 0.01,
            next: 50000302
        },
        
        // 顔アイコン
        90000000:{
            image: "90000000.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.01,
            next: 90000000
        },
        
        // キャラグラフィック
        90000001:{
            image: "90000001.png",
            offsetX: 0,
            offsetY: 0,
            time: 0.01,
            next: 90000001
        },
        
    };

};

