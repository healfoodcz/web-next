type Messages = typeof import('./src/features/Translations/data/en.json')

declare interface IntlMessages extends Messages {}

declare module '*.mp4'
