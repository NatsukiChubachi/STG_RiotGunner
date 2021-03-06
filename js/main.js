// EnchantJs初期化処理
enchant();

_gGame = null;

// ウィンドウのOnLoad処理
window.onload = function(){
    
    // ゲームウィンドウのコア設定
    var game = new Core(250, 250);              // 画面の横幅、縦幅
    game.fps = 60;                              // フレーム数
    
    _gGame = game;                              // ゲームクラスの実体
    
    // データのプリロード
    _gAssetImage = [];
    _gAssetImage.BackGround0 = "dat/stg/bg0000.jpg";
    _gAssetImage.FrameTop = "dat/stg/frame_top.png";
    _gAssetImage.Bullet0000 = "dat/stg/bullet_0000.png";
    _gAssetImage.Effect0000 = "dat/stg/effect_0000.png";
    _gAssetImage.Unit0000_00 = "dat/stg/unit_0000_0000.png";
    _gAssetImage.Unit0000_01 = "dat/stg/unit_0000_0001.png";
    _gAssetImage.Unit0010_00 = "dat/stg/unit_0010_0000.png";
    _gAssetImage.Unit0010_01 = "dat/stg/unit_0010_0001.png";
    _gAssetImage.Square000 = "dat/stg/square000.png";
        
    game.preload(                           // ファイルのプリロード
        _gAssetImage.BackGround0,
        _gAssetImage.FrameTop,
        _gAssetImage.Bullet0000,
        _gAssetImage.Effect0000,
        _gAssetImage.Unit0000_00,
        _gAssetImage.Unit0000_01,
        _gAssetImage.Unit0010_00,
        _gAssetImage.Unit0010_01,
        _gAssetImage.Square000
        ); 
    
    // ゲームのOnLoad時の処理
    game.onload = function()
    {
        var _newScene = new CStgMain();
        _newScene.initialize( game );
    };
    
    // ゲーム処理のスタート
    game.start();
};



