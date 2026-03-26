{
  "name": "win12",
  "version": "1.0.0",
  "description": "Windows 12 HTML instance with real .exe support",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder"
  },
  "devDependencies": {
    "electron": "^34.0.0",
    "electron-builder": "^25.0.0"
  },
  "author": "",
  "license": "MIT",
  "build": {
    "appId": "com.win12.instance",
    "win": {
      "target": "nsis"
    }
  }
}