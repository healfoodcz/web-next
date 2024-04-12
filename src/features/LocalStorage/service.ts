import { Predicate, AddMode } from './model'

export class LocalStorageService<T> {
  constructor(
    private readonly key: string,
    private readonly removeFilter: (entity: T) => Predicate<typeof entity>,
    private readonly hasSome: (entity: T) => Predicate<typeof entity>,
  ) {}

  setAll(entities: T[]): T[] {
    if (typeof localStorage === 'undefined') {
      return []
    }

    localStorage.setItem(this.key, JSON.stringify(entities))

    return entities
  }

  getAll(): T[] {
    if (typeof localStorage === 'undefined') {
      return []
    }

    const entities = JSON.parse(localStorage.getItem(this.key) ?? '[]')

    if (!Array.isArray(entities)) {
      return []
    }

    return entities
  }

  count(): number {
    return this.getAll().length
  }

  addSingle(entity: T, mode: AddMode = 'APPEND'): T {
    if (mode === 'APPEND') {
      this.setAll([...this.getAll(), entity])
    } else if (mode === 'PREPEND') {
      this.setAll([entity, ...this.getAll()])
    }

    return entity
  }

  remove(entity: T): T {
    this.setAll(this.getAll().filter(this.removeFilter(entity)))

    return entity
  }

  has(entity: T): boolean {
    return this.getAll().some(this.hasSome(entity))
  }

  filter(predicate: Predicate<T>): T[] {
    const entities = this.getAll()

    return this.setAll(entities.filter(predicate))
  }
}
