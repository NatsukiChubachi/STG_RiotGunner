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
    
    // 定義
    this._defValue = {
        _iChipSize_Width: 80,
        _iChipSize_Height: 80,
        _iMap_Width: 6,
        _iMap_Height: 6
    };

    this._params = [];
    this._params._manager = null;               // マネージャ
    this._params._aryMap = null;                // マップ
    this._params._aryChara = null;              // キャラ

    // キャラの作成
    this.CreateChara = function( _x, _y, _params, _team )
    {
        var _width = this._defValue._iChipSize_Width;
        var _height = this._defValue._iChipSize_Height;
        
        var _tmpGroup;
        var _tmp;
        
        _tmpGroup = _gCommon.CreateGroup((_width*_x), (_height*_y));
        
        _tmp = _gCommon.CreateSprite( 0, 0, (_width-2), (_height-2), null );
        _tmp.image = _gCommon.CreateSurface( _width, _height );
        
        // パラメータと所属
        _tmp._group = _tmpGroup;
        _tmpGroup._params = _params;
        _tmpGroup._manager = this._params._manager;
        _tmpGroup._team = _team;

        // イベント
        _tmp.addEventListener("touchstart",
        function()
        {
            alert("touch me?");
            this._group._manager._params._state = 3;
        });
        
        _tmpGroup.addChild( _tmp );
        
        // ラベル
        _tmp = _gCommon.CreateLabel( 0, 0, "Chara" );
        _tmpGroup.addChild( _tmp );
        
        return _tmpGroup;
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
        var _tmpGroup;
        var _tmp;
        
        var _width = this._defValue._iChipSize_Width;
        var _height = this._defValue._iChipSize_Height;
        
        // マップ
        this._params._aryMap = [];
        
        for ( var i=0; i<this._defValue._iMap_Width; i++ )
        {
            for ( var j=0; j<this._defValue._iMap_Height; j++ )
            {
                _tmp = _gCommon.CreateSprite( (_width*i), (_height*j), (_width-2), (_height-2), null );
                _tmp.image = _gCommon.CreateSurface( _width, _height );
                _group.addChild( _tmp );

                this._scene.addChild( _group );
                
                this._params._aryMap[ (i*this._defValue._iMap_Height) + j ] = _tmp;
            }
        }
        
        // キャラオブジェクト
        this._params._aryChara = [];
        
        _tmpGroup = this.CreateChara( 1, 3, null, 0 );
        _group.addChild( _tmpGroup );
        this._params._aryChara[ 0 ] = _tmpGroup;
        
        _tmpGroup = this.CreateChara( 2, 3, null, 0 );
        _group.addChild( _tmpGroup );
        this._params._aryChara[ 1 ] = _tmpGroup;

        _tmpGroup = this.CreateChara( 3, 3, null, 0 );
        _group.addChild( _tmpGroup );
        this._params._aryChara[ 2 ] = _tmpGroup;
        
        // ラベル作成
        _tmp = _gCommon.CreateLabel( 10, 10, "SRPG Main Page." );
        _group.addChild( _tmp );


        /*
        // 乱数
        _giResultNumber = parseInt( Math.random() * 200 );
        
        // 入力領域のデザイン変更
        var input_back = new Sprite();
        input_back.x = 10;
        input_back.y = 200;
        input_back.width = 150;
        input_back.height = 50;

        // 入力ボックス
        var input = new Entity();
        input.x = 12 + 10;
        input.y = 12 + 200;
        input.width = 140;
        input.height = 25;
        input._element = document.createElement('input');
        input._element.setAttribute("id", "input_box");
        input.backgroundColor = 'rgba(0,0,0,0)';
                
        var button = new Sprite( 16, 16);
        button.image = this._game.assets[ "http://jsrun.it/assets/3/o/3/1/3o319.png" ];
        button.x = 12 + 10 + 150;
        button.y = 200 + 15;
        button.font = "24px cursive";
        button.toucheEnabled = true;
        button.addEventListener( Event.TOUCH_START, function(){
            //console.log("button touch!");
            //console.log( input._element.value );
            // output.text = input._element.value;
            
            var iValue = Number( input._element.value );
            _gAryInputNum.push( iValue );
            _gRefreshInputNum();
            
            if ( _giResultNumber === iValue )
            {
                //console.log( "Goal!" );
                _glblResult.text = iValue + " is Hit!";
                alert( "GOAL!!" );
            }
            else if ( _giResultNumber > iValue )
            {
                //console.log( "Low!" );
                //alert( "Low!" );
                _glblResult.text = iValue + " is Low!";
            }
            else if ( _giResultNumber < iValue )
            {
                //console.log( "High!" );
                _glblResult.text = iValue + " is High!";
            }
        });
        
        this._scene.addChild( input_back );
        this._scene.addChild( input );
        this._scene.addChild( button );
        */
        this._game.pushScene( this._scene );
    };
    
    this.ManagerEnterFrame = function()
    {
        var _scene = this._params._scene;
        
        if ( this._params._state === -1 )
        {
            this._params._state = 0;
        }
        else if ( this._params._state === 0 )
        {
            var _tmp = _gCommon.CreateLabel( 0, 200, "Player Turn" );
            _tmp.font = "24px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            _tmp.color = "#0000FF";
            _scene.addChild( _tmp );

            _tmp._params = [];
            _tmp._params._manager = this;
            _tmp.tl.moveTo( 200, 200, 15 )
                    .scaleTo( 2.0, 2.0, 15 ).delay( 30 )
                    .fadeOut( 30 )
                    .then(
                        function(){ 
                            _gScene.removeChild( this );
                            
                            var _manager = this._params._manager;
                            _manager._params._state = 2;
                        }
                        );
            
            this._params._state = 1;
        }
        else if ( this._params._state === 1 )
        {
            
        }
        else if ( this._params._state === 2 )
        {
            // alert("AAAA");
            // this._params._state = 3;
            // プレイヤー操作
        }
        else if ( this._params._state === 3 )
        {
            var _tmp = _gCommon.CreateLabel( 0, 200, "Enemy Turn" );
            _tmp.font = "24px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
            _tmp.color = "#FF0000";
            _scene.addChild( _tmp );

            _tmp._params = [];
            _tmp._params._manager = this;
            _tmp.tl.moveTo( 200, 200, 15 )
                    .scaleTo( 2.0, 2.0, 15 ).delay( 30 )
                    .fadeOut( 30 )
                    .then(
                        function(){ 
                            _gScene.removeChild( this );
                            
                            var _manager = this._params._manager;
                            _manager._params._state = 5;
                        }
                        );
            
            this._params._state = 4;
        
        }
        else if ( this._params._state === 4 )
        {
            
        }
        else if ( this._params._state === 5 )
        {
            // alert("AAAA");
            // this._params._state = 0;            
            // エネミー操作
        }
    };
   
    return this;
};


