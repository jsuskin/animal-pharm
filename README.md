# AnimalPharm

## Inventory app with barcode scanner for animal pharmacists

Open terminal in `\Downloads\platform-tools-latest-windows\platform-tools>`

```zsh
adb kill-server
adb start-server
```

Open 2 terminals in project root

1:

```zsh
npm run dev
```

2: 

```zsh
cloudflared tunnel --url http://localhost:3000
```

Open generated link in Chrome
Select "Create QR Code For This Page" from context menu
Open on mobile
Install app