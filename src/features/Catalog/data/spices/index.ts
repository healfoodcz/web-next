import { Category } from '@/features/Category/model'
import bakingPowder from './baking-powder'
import beet from './beet'
import bellPepper from './bell-pepper'
import cabbage from './cabbage'
import carrot from './carrot'
import chilli from './chilli'
import cinnamon from './cinnamon'
import condiment from './condiment'
import coriander from './coriander'
import cumin from './cumin'
import dill from './dill'
import garlic from './garlic'
import ginger from './ginger'
import onion from './onion'
import parsley from './parsley'
import pepper from './pepper'
import sesame from './sesame'
import shreddedCoconut from './shredded-coconut'
import spicesProduct from './spices'
import turmeric from './turmeric'

export const spices: Category = {
  id: 'spices',
  title: {
    en: 'spices',
    ru: 'специи',
    cs: 'koření',
    de: 'Gewürze',
  },
  preview: spicesProduct,
  products: [
    bakingPowder,
    beet,
    bellPepper,
    cabbage,
    carrot,
    chilli,
    cinnamon,
    condiment,
    coriander,
    cumin,
    dill,
    garlic,
    ginger,
    onion,
    parsley,
    pepper,
    sesame,
    shreddedCoconut,
    spicesProduct,
    turmeric,
  ],
}
