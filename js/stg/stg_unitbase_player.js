// CStgPlayerUnitBaseFactoryクラス
var CStgPlayerUnitBaseFactory = function( _bullet )
{
    // ユニット部分の生成
    this._unit = new CStgUnitBaseFactory( _bullet );
    
    // プレイヤーパラメータ
    this._unit._params._sizeX = 32;
    this._unit._params._sizeY = 32;
    this._unit._params._speed = 150.0;    
};

/**
 * 初期化
 * @param {type} _posX
 * @param {type} _posY
 * @returns {CStgPlayerUnitBaseFactory@pro;_unit@call;CreateUnit|CStgPlayerUnitBaseFactory.prototype.CreateUnit._unit}
 */
CStgPlayerUnitBaseFactory.prototype.CreateUnit = function( _posX, _posY )
{
    // キャラ作成
    var _unit = this._unit.CreateUnit( _posX, _posY );
    _unit.ExecMove = this.ExecMove;
    _unit.ExecShoot = this.ExecShoot;
    _unit.ExecAnim = this.ExecAnim;
    _unit.CheckState = this.CheckState;

    _unit.ShootNormal = this.ShootNormal;

    _unit._params._sizeX = this._unit._params._sizeX;
    _unit._params._sizeY = this._unit._params._sizeY;
    _unit._params._anim_time = 0.0;
    _unit._params._anim_index = 0;

    _unit._params._hit_circle = 5.0;
    _unit._params._wait_Shoot = 0.0;

    _unit.scaleX = 0.5;
    _unit.scaleY = 0.5;

    return _unit;
};

/**
 * 状態チェック
 * @returns {undefined}
 */
CStgPlayerUnitBaseFactory.prototype.CheckState = function()
{

};

// 移動操作
CStgPlayerUnitBaseFactory.prototype.ExecMove = function()
{
    // 変数の取得
    var _game  = _gGame;
    var _fps   = 1.0 / _game.fps;
    var _input = _game.input;
    var _angle = null;

    var _speed = this._params._speed;

    var _x_min = 5;
    var _x_max = _game._width - 20;
    var _y_min = 5;
    var _y_max = _game._height -20;

    // キー状態の取得
    if ( _input.right && _input.up )        _angle = 45;
    else if ( _input.left && _input.up )    _angle = 135;
    else if ( _input.left && _input.down )  _angle = 225;
    else if ( _input.right && _input.down ) _angle = 315;
    else if ( _input.right ) _angle = 0;
    else if ( _input.up )    _angle = 90;
    else if ( _input.left )  _angle = 180; 
    else if ( _input.down )  _angle = 270;

    // 移動操作
    if ( _angle !== null )
    {
        var vx = Math.cos( _angle * Math.PI / 180) * _speed * _fps;
        var vy = -Math.sin( _angle * Math.PI / 180) * _speed * _fps;

        this.moveBy( vx, vy );
        if ( this.x < _x_min ) this.x = _x_min;
        if ( this.x > _x_max ) this.x = _x_max;
        if ( this.y < _y_min ) this.y = _y_min;
        if ( this.y > _y_max ) this.y = _y_max;
    }
};

/**
 * ショット操作
 * @returns {undefined}
 */
CStgPlayerUnitBaseFactory.prototype.ExecShoot = function()
{
    // 変数の取得
    var _game  = _gGame;
    var _fps   = 1.0 / _game.fps;
    var _input = _game.input;

    // ショットのウェイト時間処理
    this._params._wait_Shoot -= _fps;
    if ( this._params._wait_Shoot < 0.0 )
    {
        this._params._wait_Shoot = 0.0;
    }

    // 通常ショット
    if ( _input.a )
    {
        //self.moveBy( 0, 1 );
        this.ShootNormal();
    }

    // チャージ、システム
    if ( _input.b )
    {
        this.moveBy( 0, -1 );
    }

    // ボム関連
    if ( _input.c )
    {
        this.moveBy( 1, 0 );
    }
};

/**
 * アニメーション
 * @returns {undefined}
 */
CStgPlayerUnitBaseFactory.prototype.ExecAnim = function()
{
    // 変数の取得
    var _game  = _gGame;
    var _fps   = 1.0 / _game.fps;

    this._params._anim_time += _fps;
    if ( this._params._anim_time > 0.05 )
    {
        this._params._anim_time = 0.0;
        this._params._anim_index += 1;
        if ( this._params._anim_index > 1 )
        {
            this._params._anim_index = 0;
        }
    }

    switch( this._params._anim_index )
    {
    case 0:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0000_0000.png" ];
        break;
    case 1:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0000_0001.png" ];
        break;
    default:
        this._sprite.image = _gGame.assets[ "dat/stg/unit_0000_0000.png" ];
        break;
    };
};

/**
 * 通常ショット
 * @returns {undefined}
 */
CStgPlayerUnitBaseFactory.prototype.ShootNormal = function()
{
    // ショットのウェイト待ち状態のときは撃てない
    if ( this._params._wait_Shoot > 0.0 )
    {
        return;
    }

    var _posx = this.x + 4.0;
    var _posy = this.y - 10.0;

    var _tmp = this.GetNoUseBullet();
    if ( _tmp !== null)
    {
        _tmp._params._use = true;
        _tmp.x = _posx;
        _tmp.y = _posy;

        _tmp.ExecMove = function()
        {
            _tmp.y -= 10;
            if ( _tmp.y < -50 )
            {
                _tmp._params._use = false;
            }
        };

        _tmp.ExecAnim();

        //_gScene.addChild( _tmp );
        _gLayerGroup[ _gDefLayerIdStg ].addChild( _tmp );

        this._params._wait_Shoot = 0.10;
    }
};

