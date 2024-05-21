module.exports = {
  expo: {
    name: "bookstalker.app - book-stalker",
    experiments: {
      typedRoutes: true,
      tsconfigPaths: true,
    },
    slug: "book-stalker",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./public/favicon-32x32.png",
    scheme: "acme",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./public/flash.png",
      resizeMode: "cover",
      backgroundColor: "#000000",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    mode: "production",
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.your.bundle.identifier",
      config: {
        usesNonExemptEncryption: false,
      },
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    android: {
      package: "com.your.bundle.identifier",
      adaptiveIcon: {
        foregroundImage: "./public/android-chrome-192x192.png",
        backgroundColor: "#ffffff",
      },
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "https",
              host: "*.myapp.io",
              pathPrefix: "/records",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      bundler: "metro",
      favicon: "./public/favicon-32x32.png",
    },
    plugins: [
      ["expo-font"],
      ["expo-router"],
      ["expo-secure-store"],
      ["expo-document-picker"],
      ["expo-file-system"],
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./public/favicon.png",
          color: "#ffffff",
          sounds: ["./public/noti.mp3"],
        },
      ],
    ],

    extra: {
      eas: {
        projectId: "1f0c1dbf-8c00-449d-9e8f-4b87d2fd5f44",
      },
    },
  },
}
