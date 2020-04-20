const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray { 
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  };

  onClick(event, bounds) {
    const { x, y } = bounds; //Click event bounds
    const { height, width } = this.mainWindow.getBounds(); // Window height and width

    if (this.mainWindow.isVisible()){
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform ==='darwin' ? y : y - height;
      this.mainWindow.setBounds({
        x: Math.floor(x - width / 2),
        y: Math.floor(yPosition),
        height,
        width //ES6 Syntax = if Key:Value pair is the same value it can be condensed i.e. "height: height" can be just "height"
      });
      this.mainWindow.show();
    };
  };

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);

    this.popUpContextMenu(menuConfig);
  };
};

module.exports = TimerTray;