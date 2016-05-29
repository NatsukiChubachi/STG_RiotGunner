// CStgUnitBaseFactoryクラス
var CStgUnitBaseFactory = function( _bullet )
{
    // 共有部分
    this._game = _gGame;
    this._scene = _gScene;
    this._common = _gCommon;
    this._bullet = _bullet;
    
    // パラメータ
    this._params = {
        _sizeX: 10,
        _sizeY: 10,
        _speed: 10
    };    
};

/**
 * 作成
 * @param {type} _posX
 * @param {type} _posY
 * @returns {CStgUnitBaseFactory@pro;_common@call;CreateGroup|CStgUnitBaseFactory.prototype.CreateUnit._unitGroup}
 */
CStgUnitBaseFactory.prototype.CreateUnit = function( _posX, _posY )
{
    // 初期位置
    var _sizeX = this._params._sizeX;
    var _sizeY = this._params._sizeY;

    // ユニットの作成
    var _unitGroup = this._common.CreateGroup( _posX, _posY );
    var _unitSurf = this._common.CreateSurface( _sizeX, _sizeY );
    var _unitSprite = this._common.CreateSprite( 0, 0, _sizeX, _sizeY, _unitSurf );
    _unitSprite._parent = _unitGroup;
    _unitGroup.addChild( _unitSprite );
    _unitGroup._sprite = _unitSprite;

    // パラメータ
    _unitGroup._params = [];
    _unitGroup._params._speed = this._params._speed;
    _unitGroup._params._bullet = this._bullet;

    // 移動操作
    _unitGroup.ExecMove = null;
    // 行動操作
    _unitGroup.ExecShoot = null;
    // アニメーション
    _unitGroup.ExecAnim = null;
    // 状態チェック
    _unitGroup.CheckState = null;

    _unitGroup.GetNoUseBullet = this.GetNoUseBullet;

    // enterframeイベントの作成
    _unitGroup.addEventListener( "enterframe", this.AddEventEnterFrame );

    // 作成したユニットを返す
    return _unitGroup;
};

/**
 * イベント処理
 * @returns {undefined}
 */
CStgUnitBaseFactory.prototype.AddEventEnterFrame = function()
{
    // 移動操作
    if ( this.ExecMove !== null )   this.ExecMove( this );
    // 行動操作
    if ( this.ExecShoot !== null )  this.ExecShoot( this );
    // アニメーション
    if ( this.ExecAnim !== null )   this.ExecAnim( this );
    // 状態チェック
    if ( this.CheckState !== null ) this.CheckState( this );
};

/**
 * 未使用の弾を取得する
 * @returns {CStgUnitBaseFactory._params._bullet|CStgUnitBaseFactory.prototype.GetNoUseBullet._tmp}
 */
CStgUnitBaseFactory.prototype.GetNoUseBullet = function()
{
    var _iCount = this._params._bullet.length;

    for ( var i = 0; i < _iCount; i++ )
    {
        var _tmp = this._params._bullet[ i ];
        if ( _tmp._params._use === false )
        {
            return _tmp;
        }
    }

    return null;
};


