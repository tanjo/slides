class: center, middle

# Swift Package Manager と Objective-C

---

## はじめに

CocoaPods のサポートが2026年12月2日に事実上終了することが[発表](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)され、Swift Package Manager を使用してライブラリを管理することが増えてきました。

## Swift Package Manager

Swift Package Manager は、Apple が開発した、Swift のパッケージ管理ツール。
Swift で書かれたコードを簡単に共有・再利用できるようにするためのツールで、Swift 3.0 以降で利用可能。

---

## Objective-C

Objective-C は、Apple が開発した、C 言語を拡張したプログラミング言語。
主に iOS や macOS のアプリケーション開発に使用されてきましたが、Swift の登場により、徐々に使用されなくなっている。

---

## Objective-C でも Swift Package Manager は使える

Swift Package Manager は、Swift で書かれたコードを管理するためのツールですが、Objective-C で書かれたコードも Swift Package Manager を使用して管理することができる。

--- 

## Package.swift ①

```swift
// swift-tools-version: 5.4
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SampleSDK",
    platforms: [
        .iOS(.v12)
    ],
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "SampleSDK",
            targets: ["SampleSDK"]
        ),
    ],
```

---

## Package.swift ②

```swift
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "SampleSDK",
            path: "SampleSDK/SampleSDK",
            sources: [ "Classes" ],
            resources: [
                .process("PrivacyInfo.xcprivacy")
            ],
            publicHeadersPath: "Classes",
            cSettings: [
                .headerSearchPath("Classes"),
            ]
        ),
    ]
)
```

---

## ヘッダーの扱い方

Swift にはないヘッダーファイルの扱いに注意すれば、Objective-C で書かれたコードも Swift Package Manager を使用して管理することができる。

`Classes` には `.h` と `.m` の両方のファイルが存在させていても問題ない。

公開したくないファイルが存在する場合は、ヘッダーファイルを別のディレクトリにシンボリックリンクで配置するなどの工夫が必要。

---

## まとめ
