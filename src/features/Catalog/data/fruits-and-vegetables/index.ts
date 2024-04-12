import { Category } from '@/features/Category/model'
import apple from './apple'
import cherry from './cherry'
import cucumber from './cucumber'
import eggplant from './eggplant'
import garlic from './garlic'
import pomegranate from './garnet'
import scallion from './scallion'
import greenPepper from './green-pepper'
import melon from './melon'
import onion from './onion'
import parsley from './parsley'
import radish from './radish'
import redPepper from './red-pepper'
import tomato from './tomato'
import waterMelon from './water-melon'
import yellowPepper from './yellow-pepper'

export const vegetables: Category = {
  id: 'fruits-and-vegetables',
  title: {
    en: 'fruits and vegetables',
    ru: 'фрукты и овощи',
    cs: 'ovoce a zelenina',
    de: 'Früchte und Gemüse',
  },
  preview: tomato,
  products: [
    apple,
    cherry,
    cucumber,
    eggplant,
    garlic,
    pomegranate,
    scallion,
    greenPepper,
    melon,
    onion,
    parsley,
    radish,
    redPepper,
    tomato,
    waterMelon,
    yellowPepper,
  ],
}
