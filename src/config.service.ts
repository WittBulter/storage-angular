import { Injectable } from '@angular/core'

export type StorageConfig = {
  type?: string,           // local, session, memory
  silent?: boolean,        // default: true
  databases?: string[],          // default: 'storage_angular_sync'
}

export class DefaultConfig {
  type: string = 'localStorage'
  silent: boolean = true
  databases: string[] = ['storage_angular_sync']
}

@Injectable()
export class ConfigService extends DefaultConfig {
  
  constructor(
    private win: WindowWrapper,
  ) {
    super()
  }
  
  init(config: StorageConfig = {}): void {
    Object.keys(config).forEach(item => {
      this[item] = config[item]
    })
    this.checkProps()
  }
  
  logger(info: any): void {
    if (this.silent) return
    console.log(`${info}`)
  }
  
  makeStorage(): Storage {
    if (this.type === 'session') return this.win.sessionStorage
    return this.win.localStorage
  }
  
  private checkProps(): void {
    if (!this.type) return console.error('configuration items [type] is required.')
    if (!this.databases || !this.databases.length) {
      return console.error('configuration items [tables] is required.')
    }
  }
  
}

@Injectable()
export class UserConfig {
}

@Injectable()
export class WindowWrapper extends Window {
}

