const {app, BrowserWindow} = require('electron');
const {autoUpdater} = require('electron-updater');
const path = require('path');

async function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    await win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow().then(r => {
        console.log('Window created:', r);
    });

    if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify().then(r => {
            console.log('Update check completed:', r);
        });
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});
