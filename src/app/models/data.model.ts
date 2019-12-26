export class CommonDataColumns {

  public id: number;

  static parseJsonToObj<T>(clas: { new(): T; }, jsonObj: any): T {
    const obj: T = new clas();
    for (const param in jsonObj) {
      obj[param] = jsonObj[param];
    }

    return obj;
  }

  clone(only?: string[], exclude?: string[]): this {
    const that = (JSON.parse(JSON.stringify(this))); // there might be child object. so it will ensure to return copy of that too.

    if (only) {
      let copyObj = {};
      for (const param in only) {
        copyObj[param] = that[param];
      }
      return copyObj as this;
    } else if (exclude) {
      for (const param in exclude) {
        delete that[param];
      }
      return that as this;
    } else {
      return that as this;
    }
  }
}

export class User extends CommonDataColumns {
  public username: string;
  public password: string;
  public tenant: string;
  public status: string;
}

export class Customer extends CommonDataColumns {
  public name: string;
  public address: string;
}
