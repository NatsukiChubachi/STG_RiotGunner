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
    
    // ゲームマネージャー処理
    this.ManagerEnterFrame = function()
    {
        var _scene = this._params._scene;
        var _iState = this._params._iState;
        var _iCursor = this._params._iCursor;
        
        if ( _iState < 0 )
        {
            this._params._iState = 0;
        }
        else if ( _iState === 0 )
        {
            this._params._iState = 98;
            this._params._iCursor = 0;
        }
        else if ( _iState === 98 )
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
                            _manager._params._iState = 100;
                        }
                        );
            
            // 次のステートに進む
            this._params._iState = 99;
        }
        else if ( _iState === 99 ){}
        else if ( _iState === 100 )         // プレイヤー行動選択
        {
            // 選択対象ユニットが一歩前に出る
            var _unit = this._params._players[ _iCursor ];
            _unit.tl.moveBy( -16, 0, 5 );
            
            // コマンド生成
            var _commands = ["ロングソード", "切り払い", "十文字斬り", "五月雨撃ち", "マルチウェイ"];
            
            if ( _iCursor === 1 )
            {
                _commands = ["ブロンズスピア", "二段突き", "双竜打ち"];
            }
            
            var _tmpGroup = _gCommon.CreateGroup( 25, 25 );
            var _tmp;
            
            _tmp = _gCommon.CreateLabel( 0, 0, _unit._params._name );
            _tmpGroup.addChild( _tmp );
            
            for ( var i=0; i<_commands.length; i++)
            {
                _tmp = _gCommon.CreateLabel( 0, 50+(25*i), _commands[i] );
                _tmp._manager = this;
                _tmp.addEventListener("touchstart", function(){ this._manager._params._iState = 102; });
                _tmpGroup.addChild( _tmp );
            }

            _scene.addChild( _tmpGroup );
            
            this._params._command = _tmpGroup;
            
            // 次のステートに進む
            this._params._iState = 101;
        }
        else if ( _iState === 101 )         // プレイヤー行動選択
        {
            /*
            // 行動選択
            this._params._iState = 102;
            */
        }
        else if ( _iState === 102 )         // プレイヤー行動選択
        {
            // コマンドの消去
            _scene.removeChild( this._params._command );
            this._params._command = null;
            
            // 選択対象ユニットが一歩戻る
            var _unit = this._params._players[ _iCursor ];
            _unit.tl.moveBy( 16, 0, 5 );
            
            this._params._iCursor = this._params._iCursor + 1;
            if ( this._params._iCursor < 5 )
            {
                this._params._iState = 100;
            }
            else
            {
                this._params._iState = 198;
            }
        }
        else if ( _iState === 198 )
        {
            // ※全体行動開始
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
                            _manager._params._iState = 200;
                        }
                        );
            
            // 次のステートに進む
            this._params._iState = 199;
        }
        else if ( _iState === 199 ){}
        else if ( _iState === 200 )
        {
            // 次のステートに進む
            this._params._iState = 0;
        }
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
        _manager._params = [];
        _manager._params._iState = -1;
        _manager._params._iCursor = 0;
        _manager._params._scene = this._scene;
        _manager.addEventListener( "enterframe", this.ManagerEnterFrame );
        this._scene.addChild( _manager );
        this._params._manager = _manager;

        // オブジェクト
        var _group = _gCommon.CreateGroup( 0, 0 );
        
        _manager._params._players = [];
        _manager._params._enemys = [];
        _manager._params._command = null;

        _tmpGroup = _gCommon.CreateGroup( 300, 50 );
        _tmp = _gCommon.CreateSprite( 0, 0, 32, 32, null );
        _tmp.image = _gCommon.CreateSurface( 32, 32 );
        _tmpGroup.addChild( _tmp );
        _lbl = _gCommon.CreateLabel( 5, 5, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._hp_now + " / " + this._unit._params._hp_max; } );
        _tmpGroup.addChild( _lbl );
        _lbl = _gCommon.CreateLabel( 20, 20, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._lp_now + " / " + this._unit._params._lp_max; } );
        _tmpGroup.addChild( _lbl );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット00";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._players[0] = _tmp;
        
        _tmpGroup = _gCommon.CreateGroup( 300, 100 );
        _tmp = _gCommon.CreateSprite( 0, 0, 32, 32, null );
        _tmp.image = _gCommon.CreateSurface( 32, 32 );
        _tmpGroup.addChild( _tmp );
        _lbl = _gCommon.CreateLabel( 5, 5, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._hp_now + " / " + this._unit._params._hp_max; } );
        _tmpGroup.addChild( _lbl );
        _lbl = _gCommon.CreateLabel( 20, 20, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._lp_now + " / " + this._unit._params._lp_max; } );
        _tmpGroup.addChild( _lbl );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット01";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._players[1] = _tmp;
        
        _tmpGroup = _gCommon.CreateGroup( 300, 150 );
        _tmp = _gCommon.CreateSprite( 0, 0, 32, 32, null );
        _tmp.image = _gCommon.CreateSurface( 32, 32 );
        _tmpGroup.addChild( _tmp );
        _lbl = _gCommon.CreateLabel( 5, 5, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._hp_now + " / " + this._unit._params._hp_max; } );
        _tmpGroup.addChild( _lbl );
        _lbl = _gCommon.CreateLabel( 20, 20, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._lp_now + " / " + this._unit._params._lp_max; } );
        _tmpGroup.addChild( _lbl );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット02";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._players[2] = _tmp;
        
        _tmpGroup = _gCommon.CreateGroup( 300, 200 );
        _tmp = _gCommon.CreateSprite( 0, 0, 32, 32, null );
        _tmp.image = _gCommon.CreateSurface( 32, 32 );
        _tmpGroup.addChild( _tmp );
        _lbl = _gCommon.CreateLabel( 5, 5, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._hp_now + " / " + this._unit._params._hp_max; } );
        _tmpGroup.addChild( _lbl );
        _lbl = _gCommon.CreateLabel( 20, 20, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._lp_now + " / " + this._unit._params._lp_max; } );
        _tmpGroup.addChild( _lbl );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット03";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._players[3] = _tmp;
        
        _tmpGroup = _gCommon.CreateGroup( 300, 250 );
        _tmp = _gCommon.CreateSprite( 0, 0, 32, 32, null );
        _tmp.image = _gCommon.CreateSurface( 32, 32 );
        _tmpGroup.addChild( _tmp );
        _lbl = _gCommon.CreateLabel( 5, 5, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._hp_now + " / " + this._unit._params._hp_max; } );
        _tmpGroup.addChild( _lbl );
        _lbl = _gCommon.CreateLabel( 20, 20, "???? / ????" );
        _lbl._unit = _tmp;
        _lbl.addEventListener( "enterframe", function(){ this.text = this._unit._params._lp_now + " / " + this._unit._params._lp_max; } );
        _tmpGroup.addChild( _lbl );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット04";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._players[4] = _tmp;
        
        _tmpGroup = _gCommon.CreateGroup( 50, 50 );
        _tmp = _gCommon.CreateSprite( 0, 0, 128, 128, null );
        _tmp.image = _gCommon.CreateSurface( 128, 128 );
        _tmpGroup.addChild( _tmp );
        _group.addChild( _tmpGroup );
        _tmp._params = [];
        _tmp._params._name = "ユニット00";
        _tmp._params._hp_now = 100;
        _tmp._params._hp_max = 100;
        _tmp._params._lp_now = 10;
        _tmp._params._lp_max = 10;
        _manager._params._enemys[0] = _tmp;
        
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


