module.exports = {
  expo: {
    name: "Bookstalker",
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
      bundleIdentifier: "com.onepercman.bookstalker",
      config: {
        usesNonExemptEncryption: false,
      },
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    android: {
      package: "com.onepercman.bookstalker",
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
    build: {
      preview: {
        distribution: "internal",
      },
    },
    extra: {
      eas: {
        projectId: "71b37749-f8d6-4b41-ac2c-a13d3b233638",
      },
    },
  },
}
