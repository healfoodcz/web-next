import { vegetables } from './fruits-and-vegetables'
import { spices } from './spices'
import { nonFerrousMetals } from './non-ferrous-metals'
import { coalBriquettes } from './coal-briquettes'
import { Catalog } from '../model'

export const catalog: Catalog = {
  categories: [vegetables, spices, nonFerrousMetals, coalBriquettes],
}
