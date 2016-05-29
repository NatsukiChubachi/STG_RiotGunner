/*
 * STGメイン部分
 */
// グローバル変数
var _gGame;
var _gScene;
var _gCommon;

var _gLayerGroup = [];
for ( var i=0; i<10; i++ ) _gLayerGroup[i] = null;

_gDefLayerIdBg = 1;
_gDefLayerIdStg = 5;

var _gUnitBaseFactory_Player = null;
var _gUnitBaseFactory_Enemy = null;
var _gUnitBaseFactory_Bullet_Player = null;
var _gUnitBaseFactory_Bullet_Enemy = null;
var _gUnitBaseFactory_Effect = null;
var _gUnitBaseFactory_BgEntity = null;

// エフェクト作成用クラス
var _gCreateEnemyUnitBase;
var _gCreateBulletEnemyUnitBase;
var _gCreateEffectUnitBase;

var _gStageScript = null;

// 使用していない敵を取得する
GetNoUseEnemy = function()
{
    var _iCount = _gCreateEnemyUnitBase.length;
    for ( var i = 0; i < _iCount; i++ )
    {
        var _tmp = _gCreateEnemyUnitBase[ i ];
        if ( _tmp._params._use === false )
        {
            _tmp.tl.clear();
            return _tmp;
        }
    }
    
    return null;
};

// 使用していない敵弾を取得する
GetNoUseEnemyBullet = function()
{
    var _iCount = _gCreateEnemyUnitBase.length;
    for ( var i = 0; i < _iCount; i++ )
    {
        var _tmp = _gCreateEnemyUnitBase[ i ];
        if ( _tmp._params._use === false )
        {
            _tmp._script.tl.clear();
            return _tmp;
        }
    }
    
    return null;
};
    
// 使用していないエフェクトを取得する
GetNoUseEffect = function()
{
    var _iCount = _gCreateEffectUnitBase.length;
    for ( var i = 0; i < _iCount; i++ )
    {
        var _tmp = _gCreateEffectUnitBase[ i ];
        if ( _tmp._params._use === false )
        {
            _tmp.tl.clear();
            return _tmp;
        }
    }

    return null;
};

/**
 * STG_MAINクラス
 * @returns {CStgMain}
 */
var CStgMain = function() 
{
    // コモンクラス
    this._common = new CCommon();
    this._value = 0;
    
    // 初期化処理
    this.initialize = function( _game ) 
    {
        // シーン作成
        this._game = _game;
        this._scene = new Scene();

        // グローバル変数関連
        _gGame = this._game;
        _gScene = this._scene;
        _gCommon = this._common;
        
        // レイヤーグループ初期化
        for ( var i=0; i<10; i++ )
        {
            _gLayerGroup[i] = _gCommon.CreateGroup( 0, 0 );
            this._scene.addChild( _gLayerGroup[i] );
        }
            
        // 初期化
        this._scene.backgroundColor = "#000000";    // 背景色
        this.InitializeAsignKey();                  // キーバインド
        this.InitializeEntity();                    // エンティティの初期化
        // this.InitializeMobileKey();              // モバイル操作

        // ゲームマネージャの作成
        var _manager = this._common.CreateGroup( 0, 0 );
        _manager._parent = this;
        _manager._params = [];
        _manager._params._timer = 0;
        _manager.addEventListener( "enterframe", this.ManagerEnterFrame );
        this._scene.addChild( _manager );
        
        // 画面上部フレーム
        var _surface = this._common.CreateSurface( 250, 250 );
        var _frame = this._common.CreateSprite( 0, 0, 250, 250, _surface );
        _frame.image = _gGame.assets[ "dat/stg/frame_top.png" ];
        this._scene.addChild( _frame );
        
        // ラベル作成
        var lblMsg = this._common.CreateLabel( 10, 10, "STG Main Page." );
        this._scene.addChild( lblMsg );

        // ラベル作成
        this._score = this._common.CreateLabel( 10, 30, "" );
        this._scene.addChild( this._score );
        
        // 作成したシーンを追加する
        this._game.pushScene( _gScene );
        
        // JSONファイルを読み込み、パラメータをゲームに適用する
        var strJsonPath = "./dat/stage00_parts00.json";
        httpObj = new XMLHttpRequest();
        httpObj.open("get", strJsonPath, true);
        httpObj.onload = function()
        {
            var parser = function(k,v){return v.toString().indexOf('function') === 0 ? eval('('+v+')') : v; };
            var myData = JSON.parse(this.responseText, parser);

            _gStageScript = myData.StageScript;
        };
        httpObj.send(null);
    };

    // マネージャ処理 (EnterFrame)
    this.ManagerEnterFrame = function()
    {
        this._parent._value = this._parent._value + 1;
        this._parent._score.text = "score : " + this._parent._value;
        
        this._params._timer++;
        
        // TODO:
        // プレイヤーと敵のあたり判定
        // プレイヤーと敵弾のあたり判定
        // 敵とプレイヤー弾のあたり判定
        // 背景となにかのあたり判定？
        
        var _group = _gLayerGroup[ _gDefLayerIdStg ];
        
        var _player = this._parent._player;
        var _enemy = this._parent._enemy;
        var _bullet_player = this._parent._bullet_player;
        var _bullet_enemy = this._parent._bullet_enemy;
        var _effect = this._parent._effect;
        
        // プレイヤーと敵とのあたり判定
        for ( i = 0; i < this._parent._defCountEnemy; i++ )
        {
            // 敵が使用されていない場合は判定しない
            if ( _enemy[ i ]._params._use === false )
            {
                continue;
            }
            
            // スプライト位置と範囲であたり判定を行う
            if ( _enemy[ i ]._sprite.within( _player._sprite, _player._params._hit_circle ) )
            {
                // 敵の消失
                _enemy[ i ]._params._use = false;
                _group.removeChild( _enemy[ i ] );
                
                // プレイヤーの消失
               _group.removeChild( _player );
                // alert("AAAA");
            }
        }
        
        // プレイヤーと敵弾とのあたり判定
        for ( i = 0; i < this._parent._defCountBullet; i++ )
        {
            if ( _bullet_enemy[ i ]._params._use === false ) continue;
            
            if ( _player._sprite.within( _bullet_enemy[ i ]._sprite, _bullet_enemy[ i ]._params._hit_circle ) )
            {
                // 敵の消失
                _bullet_enemy[ i ]._params._use = false;
                _group.removeChild( _bullet_enemy[ i ] );
                
                // プレイヤーの消失
                _group.removeChild( _player );
            }
        }
        
        // プレイヤー弾と敵とのあたり判定
        for ( i = 0; i < this._parent._defCountBullet; i++ )
        {
            if ( _bullet_player[ i ]._params._use === false ) continue;
            
            for ( j = 0; j < this._parent._defCountEnemy; j++ )
            {
                if ( _enemy[ j ]._params._use === false ) continue;
                
                if ( _enemy[ j ]._sprite.within( _bullet_player[ i ]._sprite, _bullet_player[ i ]._params._hit_circle + _enemy[ j ]._params._hit_circle ) )
                {
                    // プレイヤー弾の消失
                    _bullet_player[ i ]._params._use = false;
                    _group.removeChild( _bullet_player[ i ] );
                    
                    // 敵の消失
                    _enemy[ j ]._params._use = false;
                    _group.removeChild( _enemy[ j ] );
                    
                    // エフェクトの作成
                    for ( k = 0; k < 6; k++ )
                    {
                        var _tmp = GetNoUseEffect();
                        if ( _tmp !== null )
                        {
                            var _sprite = _tmp._sprite;
                            
                            _tmp.x = _enemy[ j ].x;
                            _tmp.y = _enemy[ j ].y;
                           
                            _sprite.scale( 3.0, 3.0 );
                            _sprite.opacity = 0.75;
                            _sprite.compositeOperation = "lighter";
                            _tmp._params._use = true;
                            var _randAngle = Math.random() * 360.0;
                            
                            _sprite.tl.clear();
                            _sprite.tl.scaleTo( 0.0, 0.0, 20 ).and().moveBy( 100*Math.cos(_randAngle), 100*Math.sin(_randAngle), 20 );
                            
                            _gUnitBaseFactory_Effect.SetEffect_0000(_tmp);
                            _group.addChild( _tmp );
                        }
                    }
                }
            }
        }
        
        // ステージ構成
        if ( _gStageScript !== null )
        {
            var _group = _gLayerGroup[ _gDefLayerIdStg ];
            
            for ( var key in _gStageScript )
            {
                var _script = _gStageScript[ key ];
                if ( 
                    _script._use === true &&
                    _script._time === this._params._timer
                    )
                {
                    _script._func( _group, _script );
                }
            }
        }
    };

    return this;
};

// 初期化：キーアサイン
CStgMain.prototype.InitializeAsignKey = function()
{
    // キーバインド
    _gGame.keybind( 90, 'a' ); // z
    _gGame.keybind( 88, 'b' ); // x
    _gGame.keybind( 67, 'c' ); // c
};

// 初期化：エンティティ
CStgMain.prototype.InitializeEntity = function()
{
    // 定義
    this._defCountBullet = 50;          // 弾の数
    this._defCountEnemy = 50;           // 敵の数
    this._defCountEffect = 200;         // エフェクト数

    // エンティティ
    this._bgentity = null;                                      // 背景
    this._player = null;                                        // プレイヤー
    this._enemy = new Array( this._defCountEnemy );             // 敵
    this._bullet_player = new Array( this._defCountBullet );    // プレイヤー弾
    this._bullet_enemy = new Array( this._defCountBullet );     // 敵弾
    this._effect = new Array( this._defCountEffect );           // エフェクト

    // 作成用クラス生成
    _gUnitBaseFactory_BgEntity = new CStgBgEntityUnitBaseFactory();
    _gUnitBaseFactory_Player = new CStgPlayerUnitBaseFactory( this._bullet_player );
    _gUnitBaseFactory_Bullet_Player = new CStgBulletUnitBaseFactory( this._bullet_player );
    _gUnitBaseFactory_Bullet_Enemy = new CStgBulletUnitBaseFactory( this._bullet_enemy );
    _gUnitBaseFactory_Enemy = new CStgEnemyUnitBaseFactory( this._bullet_enemy );
    _gUnitBaseFactory_Effect = new CStgEffectUnitBaseFactory();

    // 背景作成
    var _unitTable = _gUnitBaseFactory_BgEntity.CreateUnit();
    this._bgentity = _unit;
    for ( i = 0; i < _unitTable.length; i++ ) _gLayerGroup[ _gDefLayerIdBg ].addChild( _unitTable[i] );

    // プレイヤー作成
    var _unit = _gUnitBaseFactory_Player.CreateUnit( 115, 210 );
    this._player = _unit;
    _gLayerGroup[ _gDefLayerIdStg ].addChild( _unit );

    // 弾の初期化
    for ( i = 0; i < this._defCountBullet; i++ )
    {
        this._bullet_player[ i ] = _gUnitBaseFactory_Bullet_Player.CreateUnit( 0, 0 );
        this._bullet_player[ i ]._params._use = false;
    }

    // 弾の初期化
    for ( i = 0; i<this._defCountBullet; i++ )
    {
        this._bullet_enemy[ i ] = _gUnitBaseFactory_Bullet_Enemy.CreateUnit( 0, 0 );
        this._bullet_enemy[ i ]._params._use = false;
    }

    // 敵の初期化
    for ( i = 0; i < this._defCountEnemy; i++ )
    {
        this._enemy[ i ] = _gUnitBaseFactory_Enemy.CreateUnit( 0, 0 );
        this._enemy[ i ]._params._use = false; 
    }

    // エフェクトの初期化
    for ( i = 0; i < this._defCountEffect; i++ )
    {
        this._effect[ i ] = _gUnitBaseFactory_Effect.CreateUnit( 0, 0 );
        this._effect[ i ]._params._use = false; 
    }
    
    _gCreateEnemyUnitBase = this._enemy;
    _gCreateBulletEnemyUnitBase = this._bullet_enemy;
    _gCreateEffectUnitBase = this._effect;
};

// 初期化：モバイル対応（仮タッチ動作）
CStgMain.prototype.InitializeMobileKey = function()
{
    // モバイル用
    _gPosX = 0;
    _gPosY = 0;

    _gScene.addEventListener( Event.TOUCH_MOVE, 
    function(e){
        var _game  = _gGame;
        var _input = _game.input;

        _input.left = false;
        _input.right = false;
        _input.up = false;
        _input.down = false;

        if ( _gPosX < e.x ) _input.right = true;
        if ( _gPosX > e.x ) _input.left = true;
        if ( _gPosY < e.y ) _input.down = true;
        if ( _gPosY > e.y ) _input.up = true;

        _input.a = true;

        _gPosX = e.x;
        _gPosY = e.y;
    });

    _gScene.addEventListener( Event.TOUCH_START, 
    function(e){
        var _game  = _gGame;
        var _input = _game.input;

        _input.left = false;
        _input.right = false;
        _input.up = false;
        _input.down = false;
        _input.a = true;

        _gPosX = e.x;
        _gPosY = e.y;
    });

    _gScene.addEventListener( Event.TOUCH_END, 
    function(e){
        var _game  = _gGame;
        var _input = _game.input;

        _input.left = false;
        _input.right = false;
        _input.up = false;
        _input.down = false;
        _input.a = true;

        _gPosX = e.x;
        _gPosY = e.y;
    });
};
