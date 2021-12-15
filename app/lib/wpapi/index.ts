import { QueryOptions } from "./types";

class WPAPI {
  static instances = new Map();
  endpoint: string;

  constructor(url: string) {
    this.endpoint = `${url}/wp-json`;
  }

  async get<T extends keyof QueryOptions, R extends QueryOptions[T]>(
    postType: T,
    options: R,
    route: string = "wp/v2"
  ): Promise<any> {
    const queryParameters = Object.entries(options).reduce(
      (acc: string, [key, value], index, arr) => {
        if (typeof value === "string" || typeof value === "number") {
          acc += `${key}=${value}`;
        } else if (typeof value === "boolean") {
          if (value) {
            acc += `${key}`;
          }
        } else if (Array.isArray(value)) {
          acc += `${key}=${value.join()}`;
        } else if (value instanceof Date) {
          acc += `${key}=${value.toISOString()}`;
        }
        if (index < arr.length - 1) {
          acc += "&";
        }
        return acc;
      },
      ""
    );
    try {
      return await fetch(
        `${this.endpoint}/${route}/${postType}?${queryParameters}`
      ).then((result) => result.json());
    } catch (e) {
      console.error(e);
    }
  }

  static getInstance(url: string): WPAPI {
    if (!this.instances.get(url)) {
      const client = new WPAPI(url);
      this.instances.set(url, client);
      return client;
    } else {
      return this.instances.get(url);
    }
  }
}

export default WPAPI;
