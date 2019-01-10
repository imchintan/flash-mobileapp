[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/flash-coin/webwallet/blob/master/LICENSE) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fflash-coin%2Fflash-mobileapp.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fflash-coin%2Fflash-mobileapp?ref=badge_shield) [![DeepScan grade](https://deepscan.io/api/projects/2899/branches/21968/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2899&bid=21968) [![Build Status](https://api.travis-ci.org/flash-coin/flash-mobileapp.svg?branch=master)](https://travis-ci.org/flash-coin/flash-mobileapp)


# FLASH - Mobile App
This is the JavaScript and [React Native](http://facebook.github.io/react-native/) source code for [FLASH](https://www.flashcoin.io) mobile wallet.


## Installation
You will need Node, Watchman, React Native CLI, Xcode, and CocoaPods.

### Node, Watchman

We recommend installing Node, Yarn, and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```sh
$ brew install node
$ brew install watchman
```

If you have already installed Node on your system, make sure it is Node 10.11.0 or newer.

### React Native CLI

Node comes with npm, which lets you install the React Native command line interface. Run the following command in a Terminal:

```sh
$ npm install -g react-native-cli
```

If you get an error like `Cannot find module 'npmlog'`, try installing npm directly: `curl -0 -L https://npmjs.org/install.sh | sudo sh`.


### CocoaPods

CocoaPods is built with Ruby and is installable with the default Ruby available on macOS. We recommend you use the default ruby.

```sh
$ sudo gem install cocoapods
```


### Git Checkout

```base
git clone https://github.com/flash-coin/flash-mobileapp.git FLASHWallet
```

### Dependencies

Run the following commands in a Terminal at root of source directory:

``` bash
cd FLASHWallet
npm install
cd ios
pod install
```

## Configure

1. Rename `.env.sample` to `.env` file for developing at root of source directory.
2. Export push notification config files `google-services.json` and `GoogleService-Info.plist` from firebase console.
 - Android - put `google-services.json` file into android/app directory
 - iOS - put `GoogleService-Info.plist` file into ios/ directory

## Run

Run the following command in a Terminal at root of source directory:

```sh
$ react-native run-ios          // for iOS
        OR
$ react-native run-android      // for Android
```

`react-native run-ios` or `react-native run-android` is just one way to run your app. You can also run it directly from within Xcode and Android Studio respectively or [Nuclide](https://nuclide.io/). You can refer [React Native Get Started](https://facebook.github.io/react-native/docs/getting-started.html) guide for more info.

#### For Xcode 10 issue
- `double-conversion errors` or `config.h` file not found.

    It will fixed by following this steps. [Read more](https://github.com/facebook/react-native/issues/14382#issuecomment-313163119)
    1. Close Xcode.
    2. Run the following commands in a Terminal at root of source directory:
    ```bash
    cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
    ```
    3. Open Xcode and try building the Project.
- error: Build input file cannot be found: 'node_modules/react-native/Libraries/WebSocket/libfishhook.a'

    Remove and add again `libfishhook.a` from Xcode and the path issue will resolve. [Read more](https://github.com/facebook/react-native/issues/19569#issuecomment-422691829)


## Known Issues


## Reporting Issues

[Bugs | New Features](https://github.com/flash-coin/flash-mobileapp/issues)


## Contributing
Check the issues and pull requests to see if the idea or bug you want to share about is already present. If you don't see it, do one of the following:

* If it is a small change, just fork the project and create a pull request.
* If it is major, start by opening an issue.


## Help Wanted!

If you're familiar with React Native, and you'd like to see this project progress, please consider contributing.


## License

Please see [LICENSE](LICENSE) for more info.
