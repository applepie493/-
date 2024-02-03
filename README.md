# B（便利なコマンド）

## 1.ファイルの場所
```
locate <ファイル名>
```

## 2.スクリーン
```
screen -S <スクリーン名>
```

## 3.展開
```
sudo tar -C /root/lava -xzf <ファイル名>
export PATH=~/lava/go/bin:$PATH
```

## 4.使用ポートの確認
```
sudo netstat -tulpn | grep 6060
```
