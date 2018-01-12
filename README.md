## storage-angular
A fast and easy to use Angular storage module.

> whenever i use Angular, i can't find a simple storage module at all, there are a variety of bugs in the popular storage repo,
> they won't solve any problem at all. these shit experiences made me create `storage-angular`, a plain and practical angular storage module.


### Getting Started

1. install: `npm i storage-angular --save`

2. import to `app.module.ts`

3. enjoy it 😄


### Configuration

you can configure more options in `app.module.ts`:

```
@NgModule({
  imports: [
    // ...
    StorageModule.forRoot({
      type?: string,              // 'local' or 'session', default is 'local'
      silent?: boolean,           // error log switch, default is false
      databases?: string[],       // multi databases
    }),
  ]
  // ...
})
export class AppModule {
}
```


### API
| method | description | example |
| :----- |:-----| :-----|
| find(key: string): any | find one key | this.storage.find('name') |
| has(key: string): boolean | whether the key exists | this.storage.has('name') |
| remove(key: string): void | remove a key | this.storage.remove('name') |
| insert(key: string, value: any): void | create a key, overlay the original value | this.storage.insert('name', 'witt') |
| findAll(): {} | return all values (object) | this.storage.findAll() |
| updateAll(store: {}): void | update all values, incremental coverage, value will not be deleted | this.storage.updateAll({}) |
| replaceAll(store: {}): void | like 'updateAll', but the value will be deleted | this.storage.replaceAll({}) |
| use(database: string): StorageService | switch to new database | this.storage.use('foods').find('hot_dog') |
| destroy(database?: string): void | delete all the values of the current database | this.storage.destroy() |
| implode(): void | delete all, includes other databases | this.storage.implode() |



