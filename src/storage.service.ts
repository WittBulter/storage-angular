import { Injectable } from '@angular/core'
import { ConfigService, UserConfig } from './config.service'

export type StorageKeyValue = {
  [key: string]: any,
}

@Injectable()
export class StorageService {
  
  private _currentBase: string
  private local: Storage
  
  constructor(
    private config: ConfigService,
    private userConfig: UserConfig,
  ) {
    this.config.init(userConfig)
    this.local = this.config.makeStorage()
    this._currentBase = this.config.databases[0]
  }
  
  find(key: string): any {
    const storeMap: StorageKeyValue = this.findAll()
    return storeMap[key]
  }
  
  remove(key: string): void {
    const storeMap: StorageKeyValue = this.findAll()
    if (storeMap[key] === undefined) return
    delete storeMap[key]
    this.replaceAll(storeMap)
  }
  
  insert(key: string, value: any): void {
    const storeMap: StorageKeyValue = this.findAll()
    const nextStoreMap: string = JSON.stringify(
      Object.assign({}, storeMap, { [key]: value }),
    )
    this.local.setItem(this._currentBase, nextStoreMap)
  }
  
  findAll(): StorageKeyValue {
    const storeValue: string = this.local.getItem(this._currentBase) || '{}'
    let storeMap: StorageKeyValue = {}
    try {
      storeMap = JSON.parse(storeValue)
    } catch (err) {
      this.config.logger(err)
    }
    return storeMap
  }
  
  replaceAll(store: StorageKeyValue): void {
    const nextStoreMap: string = JSON.stringify(store)
    this.local.setItem(this._currentBase, nextStoreMap)
  }
  
  updateAll(store: StorageKeyValue): void {
    const storeMap: StorageKeyValue = this.findAll()
    const nextStoreMap: string = JSON.stringify(
      Object.assign({}, storeMap, store)
    )
    this.local.setItem(this._currentBase, nextStoreMap)
  }
  
  use(database: string): StorageService {
    const base: string = this.config.databases.find(item => item === database)
    this._currentBase = database
    !base && console.error(`NotFound databse [${database}]`)
    return this
  }
  
  destroy(database?: string): void {
    this.local.removeItem(database || this._currentBase)
  }
  
  implode(): void {
    this.config.databases.forEach(item => this.destroy(item))
  }
  
}
